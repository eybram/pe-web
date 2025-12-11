<?php
/**
 * Simple PDO database connection helper.
 *
 * Usage:
 *  - Set environment variables: DB_DRIVER (sqlsrv|mysql), DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
 *  - In your PHP script: require __DIR__ . '/backend/db.php';
 *    $pdo = getPDO();
 *
 * This file intentionally uses getenv() so you can provide credentials via
 * server environment, Docker, or a process manager. Do NOT commit real
 * credentials into source control.
 */

declare(strict_types=1);

function getPDO(): PDO
{
    $driver = strtolower(getenv('DB_DRIVER') ?: 'sqlsrv');
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: ($driver === 'mysql' ? '3306' : '1433');
    $db   = getenv('DB_NAME') ?: 'BrokenPocket';
    $user = getenv('DB_USER') ?: 'sa';
    $pass = getenv('DB_PASS') ?: 'password';
    $charset = 'utf8';

    if ($driver === 'sqlsrv') {
        // SQL Server PDO DSN supports Server=host,port;Database=name
        $dsn = sprintf('sqlsrv:Server=%s,%s;Database=%s', $host, $port, $db);
    } elseif ($driver === 'mysql') {
        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', $host, $port, $db, $charset);
    } else {
        throw new RuntimeException("Unsupported DB_DRIVER: $driver");
    }

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        // Log and return a generic error to the client
        error_log('Database connection failed: ' . $e->getMessage());
        if (php_sapi_name() !== 'cli') {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['error' => 'Database connection failed']);
        }
        exit(1);
    }
}

/**
 * Helper: run a prepared statement and return all rows.
 * Example: fetchAll('SELECT * FROM users WHERE active = ?', [1]);
 */
function fetchAll(string $sql, array $params = []): array
{
    $pdo = getPDO();
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

/**
 * Helper: run a prepared statement and return single row or null.
 */
function fetchOne(string $sql, array $params = []): ?array
{
    $pdo = getPDO();
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $row = $stmt->fetch();
    return $row === false ? null : $row;
}

// --- Schema-specific helpers (based on caparazon.sql) ---

function getClientes(): array
{
    return fetchAll('SELECT id_cliente, nombre, apellido, cedula, correo, telefono, provincia, fecha_registro FROM Cliente ORDER BY fecha_registro DESC');
}

function getProveedores(): array
{
    return fetchAll('SELECT id_proveedor, nombre_proveedor, contacto, telefono, pais, correo FROM Proveedor');
}

function getProductos(): array
{
    return fetchAll('SELECT id_producto, nombre_producto, categoria, franquicia, precio, stock, id_proveedor FROM Producto');
}

function getProductoById(string $id_producto): ?array
{
    return fetchOne('SELECT id_producto, nombre_producto, categoria, franquicia, precio, stock, id_proveedor FROM Producto WHERE id_producto = ?', [$id_producto]);
}

function getOrdenesByCliente(string $id_cliente): array
{
    return fetchAll('SELECT id_orden, id_cliente, fecha_orden, total, metodo_pago FROM Orden WHERE id_cliente = ? ORDER BY fecha_orden DESC', [$id_cliente]);
}

function getOrdenDetalles(string $id_orden): array
{
    return fetchAll('SELECT id_detalle, id_orden, id_producto, cantidad, precio_unitario, subtotal FROM Detalle_Orden WHERE id_orden = ?', [$id_orden]);
}

function generateId(string $prefix = ''): string
{
    // uniqid with more entropy is fine for simple IDs; in production use UUIDs
    return $prefix . str_replace('.', '', uniqid('', true));
}

/**
 * Create an order with details and update stock, wrapped in a transaction.
 * - $id_orden: optional, will be generated if empty
 * - $items: array of ['id_producto' => string, 'cantidad' => int, 'precio_unitario' => float]
 */
function createOrden(string $id_cliente, array $items, string $metodo_pago = 'unknown', ?string $id_orden = null): string
{
    $pdo = getPDO();
    if (empty($id_orden)) {
        $id_orden = generateId('ORD-');
    }

    $total = 0.0;
    foreach ($items as $it) {
        $subtotal = floatval($it['precio_unitario']) * intval($it['cantidad']);
        $total += $subtotal;
    }

    try {
        $pdo->beginTransaction();

        $fecha = date('Y-m-d');
        $stmt = $pdo->prepare('INSERT INTO Orden (id_orden, id_cliente, fecha_orden, total, metodo_pago) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$id_orden, $id_cliente, $fecha, $total, $metodo_pago]);

        foreach ($items as $it) {
            $id_detalle = generateId('DET-');
            $id_producto = $it['id_producto'];
            $cantidad = intval($it['cantidad']);
            $precio_unitario = floatval($it['precio_unitario']);
            $subtotal = $precio_unitario * $cantidad;

            $stmtDet = $pdo->prepare('INSERT INTO Detalle_Orden (id_detalle, id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?, ?)');
            $stmtDet->execute([$id_detalle, $id_orden, $id_producto, $cantidad, $precio_unitario, $subtotal]);

            // Update stock
            $stmtUpd = $pdo->prepare('UPDATE Producto SET stock = stock - ? WHERE id_producto = ? AND stock >= ?');
            $stmtUpd->execute([$cantidad, $id_producto, $cantidad]);
            if ($stmtUpd->rowCount() === 0) {
                throw new RuntimeException('Insufficient stock for product ' . $id_producto);
            }

            // Inventory movement
            $id_mov = generateId('MOV-');
            $stmtMov = $pdo->prepare('INSERT INTO Inventario_Movimientos (id_mov, id_producto, tipo_movimiento, cantidad, fecha_movimiento, descripcion) VALUES (?, ?, ?, ?, ?, ?)');
            $stmtMov->execute([$id_mov, $id_producto, 'OUT', $cantidad, $fecha, 'Venta - orden ' . $id_orden]);
        }

        $pdo->commit();
        return $id_orden;
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function getEmpleadoById(string $id_empleado): ?array
{
    return fetchOne('SELECT id_empleado, nombre, apellido, cargo, correo, salario FROM Empleado WHERE id_empleado = ?', [$id_empleado]);
}

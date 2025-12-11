<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// =============================
// CONFIGURACIÓN DE CONEXIÓN
// =============================
$server = "localhost";     // o localhost\SQLEXPRESS
$database = "Broken Pocket";
$user = "eybram";
$pass = "L'bel";

try {
    $conn = new PDO("sqlsrv:Server=$server;Database=$database", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// =============================
// LEER JSON DEL FRONTEND
// =============================
$data = json_decode(file_get_contents("php://input"), true);

$nombre    = trim($data["nombre"] ?? "");
$apellido  = trim($data["apellido"] ?? "");
$cedula    = trim($data["cedula"] ?? "");
$correo    = trim($data["correo"] ?? "");
$telefono  = trim($data["telefono"] ?? "");
$provincia = trim($data["provincia"] ?? "");
$pass1     = trim($data["contraseña"] ?? "");
$confirm   = trim($data["confirm"] ?? "");

// =============================
// VALIDACIONES BÁSICAS
// =============================
if (!$nombre || !$apellido || !$cedula || !$correo || !$provincia || !$pass1) {
    echo json_encode(["error" => "Faltan datos obligatorios"]);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Correo inválido"]);
    exit;
}

if (strlen($cedula) < 5) {
    echo json_encode(["error" => "La cédula debe tener mínimo 5 caracteres"]);
    exit;
}

if ($pass1 !== $confirm) {
    echo json_encode(["error" => "Las contraseñas no coinciden"]);
    exit;
}

if (strlen($pass1) < 6) {
    echo json_encode(["error" => "La contraseña debe tener mínimo 6 caracteres"]);
    exit;
}

// =============================
// VALIDAR CORREO Y CEDULA ÚNICOS
// =============================
$sqlCheck = "SELECT correo, cedula FROM Cliente WHERE correo = ? OR cedula = ?";
$stmt = $conn->prepare($sqlCheck);
$stmt->execute([$correo, $cedula]);

if ($stmt->fetch()) {
    echo json_encode(["error" => "Correo o cédula ya registrados"]);
    exit;
}

// =============================
// GENERAR ID_CLIENTE (CL001...)
// =============================
$sqlLast = "SELECT TOP 1 id_cliente FROM Cliente ORDER BY id_cliente DESC";
$stmt = $conn->query($sqlLast);
$last = $stmt->fetch(PDO::FETCH_ASSOC);

if ($last) {
    $num = intval(substr($last["id_cliente"], 2)) + 1;
    $id_cliente = "CL" . str_pad($num, 3, "0", STR_PAD_LEFT);
} else {
    $id_cliente = "CL001";
}

// =============================
// INSERTAR CLIENTE
// =============================
$sqlInsert = "
    INSERT INTO Cliente (id_cliente, nombre, apellido, cedula, correo, telefono, provincia, contraseña)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sqlInsert);

$hashed = password_hash($pass1, PASSWORD_DEFAULT);

try {
    $stmt->execute([
        $id_cliente,
        $nombre,
        $apellido,
        $cedula,
        $correo,
        $telefono,
        $provincia,
        $hashed
    ]);

    echo json_encode([
        "success" => true,
        "id_cliente" => $id_cliente,
        "nombre" => $nombre
    ]);

} catch (Exception $e) {
    echo json_encode(["error" => "Error al registrar: " . $e->getMessage()]);
}

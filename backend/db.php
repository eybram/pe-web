<?php
/**
 * Simple PDO database connection helper.
 *
 * Usage:
 *  - Set environment variables: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
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
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $db   = getenv('DB_NAME') ?: 'database';
    $user = getenv('DB_USER') ?: 'user';
    $pass = getenv('DB_PASS') ?: 'password';
    $charset = 'utf8mb4';

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', $host, $port, $db, $charset);

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
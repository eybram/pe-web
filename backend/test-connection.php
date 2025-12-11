<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    $pdo = getPDO();
    // simple query to verify everything's working
    $row = $pdo->query('SELECT 1 AS ok')->fetch();
    echo json_encode(['status' => 'ok', 'test' => $row]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

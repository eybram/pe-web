<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$id_cliente = $_GET['id_cliente'] ?? null;
if (!$id_cliente) {
    http_response_code(400);
    echo json_encode(['error' => 'id_cliente is required']);
    exit;
}

$ordenes = getOrdenesByCliente($id_cliente);

echo json_encode($ordenes);

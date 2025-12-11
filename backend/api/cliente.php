<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'id is required']);
    exit;
}

$clientes = getClientes();
$client = null;
foreach ($clientes as $c) {
    if ($c['id_cliente'] === $id) {
        $client = $c;
        break;
    }
}

if (!$client) {
    http_response_code(404);
    echo json_encode(['error' => 'Cliente not found']);
    exit;
}

echo json_encode($client);

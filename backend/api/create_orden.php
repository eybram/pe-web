<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!$payload) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$id_cliente = $payload['id_cliente'] ?? null;
$items = $payload['items'] ?? [];
$metodo_pago = $payload['metodo_pago'] ?? 'unknown';

if (!$id_cliente || !is_array($items) || count($items) === 0) {
    http_response_code(400);
    echo json_encode(['error' => 'id_cliente and items are required']);
    exit;
}

try {
    $id_orden = createOrden($id_cliente, $items, $metodo_pago);
    echo json_encode(['id_orden' => $id_orden]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}

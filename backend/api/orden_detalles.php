<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$id_orden = $_GET['id_orden'] ?? null;
if (!$id_orden) {
    http_response_code(400);
    echo json_encode(['error' => 'id_orden is required']);
    exit;
}

$detalles = getOrdenDetalles($id_orden);

echo json_encode($detalles);

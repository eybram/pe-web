<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Accept POST JSON { q: 'email|cedula|id' }
$payload = json_decode(file_get_contents('php://input'), true);
$q = $payload['q'] ?? null;

if (!$q) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing query parameter `q`']);
    exit;
}

$cliente = findClienteByEmailOrCedulaOrId($q);
if (!$cliente) {
    http_response_code(404);
    echo json_encode(['error' => 'Cliente not found']);
    exit;
}

// Return safe fields only
echo json_encode([
    'id_cliente' => $cliente['id_cliente'],
    'nombre' => $cliente['nombre'],
    'apellido' => $cliente['apellido'],
    'correo' => $cliente['correo'] ?? null,
]);

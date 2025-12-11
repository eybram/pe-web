<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$payload = json_decode(file_get_contents('php://input'), true);
$name = $payload['name'] ?? null;
$apellido = $payload['lastname'] ?? null;
$email = $payload['email'] ?? null;
$password = $payload['password'] ?? null;
$confirm = $payload['confirm'] ?? null;
$cedula = $payload['cedula'] ?? null;
$telefono = $payload['telefono'] ?? null;
$provincia = $payload['provincia'] ?? null;

if (!$name || !$email || !$password || !$confirm) {
    http_response_code(400);
    echo json_encode(['error' => 'name, email, password and confirm are required']);
    exit;
}
if ($password !== $confirm) {
    http_response_code(400);
    echo json_encode(['error' => 'password and confirm do not match']);
    exit;
}

// Check if a client with this email or cedula already exists
$existing = findClienteByEmailOrCedulaOrId($email);
if ($existing) {
    http_response_code(409);
    echo json_encode(['error' => 'A client with that email already exists']);
    exit;
}
if ($cedula) {
    $existing2 = findClienteByEmailOrCedulaOrId($cedula);
    if ($existing2) {
        http_response_code(409);
        echo json_encode(['error' => 'A client with that cedula already exists']);
        exit;
    }
}

try {
    // Create client
    $id_cliente = createCliente([ 'nombre' => $name, 'apellido' => $apellido, 'cedula' => $cedula, 'correo' => $email, 'telefono' => $telefono, 'provincia' => $provincia ]);
    // Hash password
    $hash = password_hash($password, PASSWORD_DEFAULT);
    createAuth($id_cliente, $hash);
    echo json_encode(['id_cliente' => $id_cliente, 'nombre' => $name, 'apellido' => $apellido]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not create client', 'detail' => $e->getMessage()]);
}

<?php

header('Content-Type: application/json; charset=utf-8');

if($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'error' => 'Method not allowed'
    ]);
    exit;
}

$id = $_GET['id'] ?? null;

echo json_encode([
    'ok' => true,
    'id' => $id,
    'message' => 'Ahoj z PHP',
]);
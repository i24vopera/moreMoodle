<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . "/items.json";
$items = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

function save($file, $items) {
    file_put_contents($file, json_encode(array_values($items), JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
$body = json_decode(file_get_contents('php://input'), true) ?? [];

function findIndex($items, $id) {
    foreach ($items as $i => $item) {
        if ($item['id'] === $id) return $i;
    }
    return null;
}

switch ($method) {
    case "GET": // READ
        if ($id) {
            $i = findIndex($items, $id);
            if ($i === null) {
                http_response_code(404);
                echo json_encode([
                    'error' => 'Nenalezeno'
                ]);
                break;
            }
            echo json_encode($items[$i]);
        } else {
            echo json_encode($items);
        }
        break;

    case "POST": // CREATE
        $newId = $items ? max(array_column($items, 'id')) + 1 : 1;
        $items[] = ['id' => $newId, 'name' => $body['name'] ?? ''];
        save($file, $items);
        http_response_code(201);
        echo json_encode(['id' => $newId]);
        break;

    case "PUT": // UPDATE
        $i = findIndex($items, $id);
        if ($i === null) {
            http_response_code(404);
            echo json_encode([
                'error' => 'Nenalezeno'
            ]);
            break;
        }
        // DODĚLAT MRDKO!!!!
}
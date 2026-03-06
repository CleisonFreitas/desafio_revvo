<?php
// simple PHP API for courses
// supports GET /api/courses[?q=], GET /api/courses/{id},
// POST /api/courses, DELETE /api/courses/{id}

header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../lib/Course.php';

$method = $_SERVER['REQUEST_METHOD'];
// determine id from PATH_INFO if present
$id = null;
if (!empty($_SERVER['PATH_INFO'])) {
    $parts = explode('/', trim($_SERVER['PATH_INFO'], '/'));
    if (is_numeric($parts[0])) {
        $id = (int)$parts[0];
    }
}

// instantiate Course model
$courseModel = new Course($pdo);

switch ($method) {
    case 'GET':
        if ($id !== null) {
            $c = $courseModel->find($id);
            if ($c) {
                echo json_encode($c);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
            }
            exit;
        }

        // list with optional search term
        $q = isset($_GET['q']) ? trim($_GET['q']) : '';
        $list = $courseModel->all($q);
        echo json_encode($list);
        exit;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        if (!is_array($body)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }
        $created = $courseModel->create($body);
        echo json_encode($created);
        exit;

    case 'DELETE':
        if ($id === null) {
            http_response_code(400);
            echo json_encode(['error' => 'ID required']);
            exit;
        }
        $ok = $courseModel->delete($id);
        if ($ok) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        exit;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
}

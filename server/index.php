<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'DbConnect.php';
$objDb = new DbConnect;
$connection = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'];

if ($type == 'users') {
    switch ($method) {
        case 'POST':
            postUser($connection);
            break;
        case 'PUT':
            putUser($connection);
            break;
        case 'GET':
            getUser($connection);
            break;
        case 'DELETE':
            deleteUser($connection);
            break;
        default:
            break;
    }
} elseif ($type == 'games') {
    switch ($method) {
        case 'POST':
            $_GET['table'] == 'games' ? postGame($connection) : postPairs($connection);
            break;
        case 'GET':
            if ($_GET['amount'] == 'one') {
                $_GET['table'] == 'games' ? getGame($connection) : getPairs($connection);
                return;
            } else {
                getGames($connection);
                return;
            }
            break;
        case 'PUT':
            putGame($connection);
            break;
        case 'DELETE':
            $_GET['table'] == 'games' ? deleteGame($connection) : deletePairs($connection);
            break;
        default:
            break;
    }
} else {
    echo 'Onbekend type';
}

// CRUD users table
function postUser($connection)
{
    try {
        $user = json_decode(file_get_contents('php://input'));
    
        $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
    
        $result = $stmt->execute();
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function putUser($connection)
{
    try {
        $user = json_decode(file_get_contents('php://input'));
    
        $sql = "UPDATE users SET name = :name, email = :email, password = :password WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $_GET['id']);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
    
        $result = $stmt->execute();
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function getUser($connection) {
    try {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $sql = "SELECT * FROM users WHERE email = :email AND password = :password";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function deleteUser($connection) {
    try {
        $id = $_GET['id'];

        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $result = $stmt->execute();

        echo json_encode(array($result));
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

// CRUD games table
function postGame($connection)
{
    try {
        $game = json_decode(file_get_contents('php://input'));
    
        $sql = "INSERT INTO games (user_id, title) VALUES (:user_id, :title)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':user_id', $game->user_id);
        $stmt->bindParam(':title', $game->title);

        $stmt->execute();
        
        echo json_encode(['status' => 200, 'message' => 'Game successfully posted', 'id' => $connection->lastInsertId()]);
    } catch (Exception $e) {
        echo json_encode(['status' => 500, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

function getGames($connection)
{
    try {
        $user_id = $_GET['user_id'];

        $sql = "SELECT * FROM games WHERE user_id = :user_id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function getGame($connection)
{
    try {
        $id = $_GET['id'];
        $title = $_GET['title'];

        $sql = "SELECT * FROM games WHERE user_id = :user_id AND title = :title";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':user_id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function putGame($connection)
{
    try {
        $game = json_decode(file_get_contents('php://input'));

        $sql = "UPDATE games SET title = :title WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $game->id);
        $stmt->bindParam(':title', $game->title);
        $result = $stmt->execute();

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function deleteGame($connection)
{
    try {
        $id = $_GET['id'];

        $sql = "DELETE FROM games WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $result = $stmt->execute();

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

// CRUD game_pairs table
function postPairs($connection)
{
    try {
        $pairs = json_decode(file_get_contents('php://input'));

        $sql = "INSERT INTO game_pairs (game_id, value_one, value_two) VALUES (:game_id, :value_one, :value_two)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':game_id', $pairs->game_id);
        $stmt->bindParam(':value_one', $pairs->value_one);
        $stmt->bindParam(':value_two', $pairs->value_two);

        $stmt->execute();

        echo json_encode(['status' => 200, 'message' => 'Pairs successfully posted']);
    } catch (Exception $e) {
        echo json_encode(['status' => 500, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

function getPairs($connection)
{
    try {
        $game_id = $_GET['game_id'];

        $sql = "SELECT * FROM game_pairs WHERE game_id = :game_id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':game_id', $game_id);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}

function deletePairs($connection)
{
    try {
        $game_id = $_GET['game_id'];

        $sql = "DELETE FROM game_pairs where game_id = :game_id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':game_id', $game_id);
        $result = $stmt->execute();

        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(array('status' => 500, 'message' => 'Error: ' . $e->getMessage()));
    }
}
?>
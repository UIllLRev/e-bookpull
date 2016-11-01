<?php

require 'sentry.php';
include 'config.php';

function db_connect($connection_string, $user, $pass) {
    try {
        return new PDO($connection_string, $user, $pass, array(
            PDO::ATTR_PERSISTENT => true
        ));
    } catch (PDOException $e) {
        throw new Exception('Could not connect to database', 500, $e);
    }
}

function get_dbh() {
    global $config;
    $dbh = db_connect($config['db_connection_string'], $config['db_username'],
        $config['db_password']);
    $dbh->query("SET sql_mode='TRADITIONAL'");
    return $dbh;
}

function import_file($id, $file) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'INSERT INTO `sources` (`author_code`, `type`, `citation`) VALUES (?, ?, ?)'
    );

    $sources = json_decode(file_get_contents($file['tmp_name']), true);
    foreach ($sources as $source) {
        $stmt->bindValue(1, $id);
        $stmt->bindValue(2, $source['type']);
        $stmt->bindValue(3, $source['citation']);
        if (!$stmt->execute()) {
            $err = $stmt->errorInfo();
            throw new Exception("Could not insert work:" . $err[2], 500);
        }
    }

    return true;
}

function parse_request_uri($uri) {
    global $config;
    if (substr($uri, 0, strlen($config['path_prefix'])) == $config['path_prefix']) {
        $uri = substr($uri, strlen($config['path_prefix']));
    }

    $matches = array();
    if (preg_match('/^import\/([0-9]+)$/', $uri, $matches)) {
        return array(
            resource_id     => $matches[1],
        );
    } else {
        throw new Exception('Invalid request', 400);
    }
}

function handle_request($params, $data) {
    if ($params['resource_id'] != null) {
        switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $res = import_file($params['resource_id'], $data);
            break;
        default:
            throw new Exception('Invalid method', 400);
        }
    } else {
        throw new Exception('Invalid work', 400);
    }

    if (is_bool($res) && $res) {
        header('HTTP/1.1 204 No Content');
    } else {
        header('HTTP/1.1 200 OK');
        header('Content-type: text/json; charset=utf-8');
        print json_encode($res);
    }
}

try {
    if (isset($_FILES['file'])) {
        handle_request(parse_request_uri($_SERVER['REQUEST_URI']), $_FILES['file']);
    } else {
        throw new Exception('No file uploaded', 400);
    }
} catch (Exception $e) {
    if ($e->getCode == 400) {
        header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request');
    } else {
        header($_SERVER['SERVER_PROTOCOL'].' 500 Internal Server Error');
    }
}
?>

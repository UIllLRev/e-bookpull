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

function work_list() {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `author_code`, `author_name`, `article_name`, `volume`, `issue`, `comments`, `bookpuller` FROM `works`');
    $stmt->execute();

    $stmt2 = $dbh->prepare('SELECT `id`, `author_code` FROM `sources`');
    $stmt2->execute();

    $sources = array();
    foreach ($stmt2->fetchAll() as $source) {
        if (!isset($sources[$source['author_code']])) {
            $sources[$source['author_code']] = array();
        }

        $sources[$source['author_code']][] = array(
            id      => $source['id'],
            type    => 'source'
        );
    }

    $result = array();
    foreach($stmt->fetchAll() as $row) {
        $result[] = array(
            id          => $row['author_code'],
            type        => 'work',
            attributes  => array(
                author      => $row['author_name'],
                title       => $row['article_name'],
                volume      => $row['volume'],
                issue       => $row['issue'],
                comments    => $row['comments'],
                bookpuller  => $row['bookpuller']
            ),
            relationships   => array(
                sources     => array(
                    data        => $sources[$row['author_code']]
                )
            )
        );
    }

    return array(
        data => $result
    );
}

function work_get($id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `author_code`, `author_name`, `article_name`, `volume`, `issue`, `comments`, `bookpuller`'
       .' FROM `works` WHERE `author_code` = ?');
    $stmt->bindValue(1, $id);
    $stmt->execute();
    $sources = source_list_by_work($id);
    if ($row = $stmt->fetch()) {
        $rels = array();
        foreach ($sources['data'] as $source) {
            $rels[] = array(
                type    => 'source',
                id      => $source['id']
            );
        }
        return array(
            data    =>  array(
                id          => $row['author_code'],
                type        => 'work',
                attributes  => array(
                    author      => $row['author_name'],
                    title       => $row['article_name'],
                    volume      => $row['volume'],
                    issue       => $row['issue'],
                    comments    => $row['comments'],
                    bookpuller  => $row['bookpuller']
                ),
                relationships   => array(
                    sources     => array(
                        data    => $rels
                    )
                )
            ),
            included    => $sources['data']
        );
    } else {
        throw new Exception('Invalid work', 404);
    }
}

function work_insert($data) {
    if ($data['type'] != 'work') {
        throw new Exception('Invalid work', 400);
    }

    $params = array();
    $vals = array();
    if (array_key_exists('author', $data['attributes'])) {
        $params[] = ' `author_name` ';
        $vals[] = $data['attributes']['author'];
    }
    if (array_key_exists('title', $data['attributes'])) {
        $params[] = ' `article_name` ';
        $vals[] = $data['attributes']['title'];
    }
    if (array_key_exists('volume', $data['attributes'])) {
        $params[] = ' `volume` ';
        $vals[] = $data['attributes']['volume'];
    }
    if (array_key_exists('issue', $data['attributes'])) {
        $params[] = ' `issue` ';
        $vals[] = $data['attributes']['issue'];
    }
    if (array_key_exists('comments', $data['attributes'])) {
        $params[] = ' `comments` ';
        $vals[] = $data['attributes']['comments'];
    }
    if (array_key_exists('bookpuller', $data['attributes'])) {
        $params[] = ' `bookpuller` ';
        $vals[] = $data['attributes']['bookpuller'];
    }

    $dbh = get_dbh();
    $stmt = $dbh->prepare(
    'INSERT INTO `works` ('
        . join(',', $params)
        .') VALUES ('
        . join(',', array_slice(array('?', '?', '?', '?', '?', '?'), 0, count($vals)))
        . ')');

    $value_no = 1;
    foreach ($vals as $val) {
        $stmt->bindValue($value_no++, $val);
    }

    if (!$stmt->execute()) {
        throw new Exception('Could not insert work', 500);
    }

    return work_get($dbh->lastInsertId());
}

function work_modify($id, $data) {
    if ($data['type'] != 'work' || !isset($data['id'])) {
        throw new Exception('Invalid work', 400);
    }

    if (isset($data['attributes'])) {
        $params = array();
        $vals = array();
        if (array_key_exists('author', $data['attributes'])) {
            $params[] = ' `author_name` = ?';
            $vals[] = $data['attributes']['author'];
        }
        if (array_key_exists('title', $data['attributes'])) {
            $params[] = ' `article_name` = ?';
            $vals[] = $data['attributes']['title'];
        }
        if (array_key_exists('volume', $data['attributes'])) {
            $params[] = ' `volume` = ?';
            $vals[] = $data['attributes']['volume'];
        }
        if (array_key_exists('issue', $data['attributes'])) {
            $params[] = ' `issue` = ?';
            $vals[] = $data['attributes']['issue'];
        }
        if (array_key_exists('comments', $data['attributes'])) {
            $params[] = ' `comments` = ?';
            $vals[] = $data['attributes']['comments'];
        }
        if (array_key_exists('bookpuller', $data['attributes'])) {
            $params[] = ' `bookpuller` = ?';
            $vals[] = $data['attributes']['bookpuller'];
        }

        $dbh = get_dbh();
        $stmt = $dbh->prepare(
            'UPDATE `works` SET'
            . join(',', $params)
            .' WHERE `author_code` = ?');

        $value_no = 1;
        foreach ($vals as $val) {
            $stmt->bindValue($value_no++, $val);
        }
        $stmt->bindValue($value_no, $id);

        if (!$stmt->execute()) {
            throw new Exception('Could not update work', 500);
        }
    }
    return work_get($id);
}

function work_delete($id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare('DELETE FROM `works` WHERE `author_code` = ?');
    $stmt->bindValue(1, $id, PDO::PARAM_INT);
    $stmt->execute();
    return true;
}

function source_list() {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `id`, `author_code`, `type`, `citation`, `url`, `comments`, `ordered`, `status_code`'
       .' FROM `sources`');
    $stmt->execute();

    $result = array();
    foreach($stmt->fetchAll() as $row) {
        $result[] = array(
            id          => $row['id'],
            type        => 'source',
            attributes  => array(
                type        => $row['type'],
                citation    => $row['citation'],
                url         => $row['url'],
                comments    => $row['comments'],
                ordered     => $row['ordered'],
                status      => $row['status_code']
            ),
            relationships   => array(
                work        => array(
                    data        => array(
                        type    => 'work',
                        id      => $row['author_code']
                    )
                )
            )
        );
    }

    return array(
        data    =>  $result
    );
}

function source_list_by_work($work_id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `id`, `type`, `citation`, `url`, `comments`, `ordered`, `status_code`'
       .' FROM `sources` WHERE `author_code` = ?');
    $stmt->bindValue(1, $work_id, PDO::PARAM_INT);
    $stmt->execute();

    $result = array();
    foreach($stmt->fetchAll() as $row) {
        $result[] = array(
            id          => $row['id'],
            type        => 'source',
            attributes  => array(
                type        => $row['type'],
                citation    => $row['citation'],
                url         => $row['url'],
                comments    => $row['comments'],
                ordered     => $row['ordered'],
                status      => $row['status_code']
            ),
            relationships   => array(
                work        => array(
                    data        => array(
                        type    => 'work',
                        id      => $work_id
                    )
                )
            )
        );
    }

    return array(
        data    =>  $result
    );
}

function source_get($id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `author_code`, `type`, `citation`, `url`, `comments`, `ordered`, `status_code`'
       .' FROM `sources` WHERE `id` = ?');
    $stmt->bindValue(1, $id);
    $stmt->execute();
    if ($row = $stmt->fetch()) {
        return array(
            data     => array(
                id              => $id,
                type            => 'source',
                attributes      => array(
                    type            => $row['type'],
                    citation        => $row['citation'],
                    url             => $row['url'],
                    comments        => $row['comments'],
                    ordered         => $row['ordered'],
                    status          => $row['status_code']
                ),
                relationships   => array(
                    work        => array(
                        data        => array(
                            type    => 'work',
                            id      => $row['author_code']
                        )
                    )
                )
            )
        );
    } else {
        throw new Exception('Invalid source', 404);
    }
}

function source_insert($author_id, $type, $citation, $url, $comments, $ordered, $status) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare('INSERT INTO `sources`'
        .'(`author_code`, `type`, `citation`, `url`,`comments`, `ordered`,`status_code`)'
        .' VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->bindValue(1, $author_id, PDO::PARAM_INT);
    $stmt->bindValue(2, $type, PDO::PARAM_STR);
    $stmt->bindValue(3, $citation, PDO::PARAM_STR);
    $stmt->bindValue(4, $url, PDO::PARAM_STR);
    $stmt->bindValue(5, $comments, PDO::PARAM_STR);
    $stmt->bindValue(6, $ordered, PDO::PARAM_STR);
    $stmt->bindValue(7, $status, PDO::PARAM_STR);
    $stmt->execute();
    return array(
        data    =>  array(
            id          => $dbh->lastInsertId(),
            type        => 'source'
        )
    );
}

function source_modify($id, $data) {
    if ($data['type'] != 'source' || !isset($data['id'])) {
        throw new Exception('Invalid source', 400);
    }

    if (isset($data['attributes'])) {
        $params = array();
        $vals = array();
        if (array_key_exists('type', $data['attributes'])) {
            $params[] = ' `type` = ?';
            $vals[] = $data['attributes']['type'];
        }
        if (array_key_exists('citation', $data['attributes'])) {
            $params[] = ' `citation` = ?';
            $vals[] = $data['attributes']['citation'];
        }
        if (array_key_exists('url', $data['attributes'])) {
            $params[] = ' `url` = ?';
            $vals[] = $data['attributes']['url'];
        }
        if (array_key_exists('comments', $data['attributes'])) {
            $params[] = ' `comments` = ?';
            $vals[] = $data['attributes']['comments'];
        }
        if (array_key_exists('ordered', $data['attributes'])) {
            $params[] = ' `ordered` = ?';
            if (is_null($data['attributes']['ordered'])) {
                $vals[] = null;
            } else {
                $vals[] = date('Y-m-d', strtotime($data['attributes']['ordered']));
            }
        }
        if (array_key_exists('status', $data['attributes'])) {
            $params[] = ' `status_code` = ?';
            $vals[] = $data['attributes']['status'];
        }
        $dbh = get_dbh();
        $stmt = $dbh->prepare(
            'UPDATE `sources` SET'
            . join(',', $params)
            .' WHERE `id` = ?');

        $value_no = 1;
        foreach ($vals as $val) {
            $stmt->bindValue($value_no++, $val);
        }
        $stmt->bindValue($value_no, $id);

        if (!$stmt->execute()) {
            $err = $stmt->errorInfo();
            throw new Exception('Could not update source:' . $err[2], 500);
        }
    }
    return source_get($id);
}

function source_delete($id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare('DELETE FROM `sources` WHERE `id` = ?');
    $stmt->bindValue(1, $id, PDO::PARAM_INT);
    $stmt->execute();
    return true;
}

function parse_request_uri($uri) {
    global $config;
    if (substr($uri, 0, strlen($config['path_prefix'])) == $config['path_prefix']) {
        $uri = substr($uri, strlen($config['path_prefix']));
    }

    $matches = array();
    if (preg_match('/^(works|sources)(\/([0-9]+))?$/', $uri, $matches)) {
        return array(
            resource_type   => $matches[1],
            resource_id     => $matches[3],
        );
    } else {
        throw new Exception('Invalid request', 400);
    }
}

function handle_request($params, $data) {
    switch($params['resource_type']) {
    case 'works':
        if ($params['resource_id'] != null) {
            switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $res = work_get($params['resource_id']);
                break;
            case 'POST':
                $res = work_modify($params['resource_id'], $data);
                break;
            case 'DELETE':
                $res = work_delete($params['resource_id']);
                break;
            default:
                throw new Exception('Invalid method', 400);
            }
        } else {
            switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $res = work_list();
                break;
            case 'POST':
                switch ($params['resource_type']) {
                case 'works':
                    $res = work_insert($data);
                    break;
                }
                break;
                default:
                    throw new Exception('Invalid method', 400);
            }
        }
        break;
            case 'sources':
                if ($params['resource_id'] != null) {
                    switch ($_SERVER['REQUEST_METHOD']) {
                    case 'GET':
                        $res = source_get($params['resource_id']);
                        break;
                    case 'POST':
                        $res = source_modify($params['resource_id'], $data);
                        break;
                    case 'DELETE':
                        $res = source_delete($params['resource_id']);
                        break;
                    default:
                        throw new Exception('Invalid method', 400);
                    }
                } else {
                    switch ($_SERVER['REQUEST_METHOD']) {
                    case 'GET':
                        $res = source_list();
                        break;
                    case 'POST':
                        $res = source_insert($params['resource_id'], $_REQUEST['type'], $_REQUEST['citation'],
                            $_REQUEST['url'], $_REQUEST['comments'], $_REQUEST['ordered'], $_REQUEST['status']);
                        break;
                    default:
                        throw new Exception('Invalid method', 400);
                    }
                }
                break;
                    default:
                        throw new Exception('Invalid resource type', 400);
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
    // For anything other than POST, PHP only allows access to request body through php://input.
    // But php://input is not available if allow_url_fopen is disabled in php.ini.
    // That's PHP Quality(tm).
    // So instead we break with the jsonapi.org spec and use POST for updates.
    if (isset($HTTP_RAW_POST_DATA)) {
        $input = json_decode($HTTP_RAW_POST_DATA, true);
    }

    handle_request(parse_request_uri($_SERVER['REQUEST_URI']), isset($input) ? $input['data']: null);
} catch (Exception $e) {
    if ($e->getCode == 400) {
        header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request');
    } else {
        header($_SERVER['SERVER_PROTOCOL'].' 500 Internal Server Error');
    }
}
?>

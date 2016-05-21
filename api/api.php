<?php

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
        'SELECT `author_code`, `author_name`, `article_name`, `volume`, `issue`,`comments` FROM `article_author`');
    $stmt->execute();

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
                comments    => $row['comments']
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
        'SELECT `author_code`, `author_name`, `article_name`, `volume`, `issue`,`comments`'
       .' FROM `article_author` WHERE `author_code` = ?');
    $stmt->bindValue(1, $id);
    $stmt->execute();
    if ($row = $stmt->fetch()) {
        return array(
            data    =>  array(
                id          => $row['author_code'],
                type        => 'work',
                attributes  => array(
                    author      => $row['author_name'],
                    title       => $row['article_name'],
                    volume      => $row['volume'],
                    issue       => $row['issue'],
                    comments    => $row['comments']
                )
            )
        );
    } else {
        throw new Exception('Invalid work', 404);
    }
}

function work_insert($author, $title, $volume, $issue, $comments) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'INSERT INTO `article_author` (`author_name`, `article_name`, `volume`, `issue`,`comments`)'
       .' VALUES (?, ?, ?, ?, ?)');
    $stmt->bindValue(1, $author, PDO::PARAM_STR);
    $stmt->bindValue(2, $title, PDO::PARAM_STR);
    $stmt->bindValue(3, $volume, PDO::PARAM_INT);
    $stmt->bindValue(4, $issue, PDO::PARAM_INT);
    $stmt->bindValue(5, $comments, PDO::PARAM_STR);
    $stmt->execute();
    return array(
        data    =>  array(
            id          => $dbh->lastInsertId(),
            type        => 'work'
        )
    );
}

function work_modify($id, $author, $title, $volume, $issue, $comments) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'UPDATE `article_author` SET `author_name` = ?, `article_name` = ?, `volume` = ?, `issue` = ?, `comments` = ?'
       .' WHERE `author_code` = ?');
    $stmt->bindValue(1, $author, PDO::PARAM_STR);
    $stmt->bindValue(2, $title, PDO::PARAM_STR);
    $stmt->bindValue(3, $volume, PDO::PARAM_INT);
    $stmt->bindValue(4, $issue, PDO::PARAM_INT);
    $stmt->bindValue(5, $comments, PDO::PARAM_STR);
    $stmt->bindValue(6, $id, PDO::PARAM_INT);
    $stmt->execute();
    return true;
}

function work_delete($id) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare('DELETE FROM `article_author` WHERE `author_code` = ?');
    $stmt->bindValue(1, $id, PDO::PARAM_INT);
    $stmt->execute();
    return true;
}

function source_list() {
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `id`, `type`, `citation`, `url`, `comments`, `ordered`, `status_code`'
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
                data        => array(
                    type    => 'work',
                    id      => $author_id
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
                    data        => array(
                        type    => 'work',
                        id      => $row['author_code']
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

function source_modify($id, $author_id, $type, $citation, $url, $comments, $ordered, $status) {
    $dbh = get_dbh();
    $stmt = $dbh->prepare('UPDATE `sources`'
        .'SET `author_code` = ?, `type` = ?, `citation` = ?,'
        .' `url` = ?, `comments` = ?, `ordered` = ?, `status_code` = ?'
        .' WHERE `id` = ?');
    $stmt->bindValue(1, $author_id, PDO::PARAM_INT);
    $stmt->bindValue(2, $type, PDO::PARAM_STR);
    $stmt->bindValue(3, $citation, PDO::PARAM_STR);
    $stmt->bindValue(4, $url, PDO::PARAM_STR);
    $stmt->bindValue(5, $comments, PDO::PARAM_STR);
    $stmt->bindValue(6, $ordered, PDO::PARAM_STR);
    $stmt->bindValue(7, $status, PDO::PARAM_STR);
    $stmt->bindValue(8, $id, PDO::PARAM_INT);
    $stmt->execute();
    return true;
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

function handle_request($params) {
    switch($params['resource_type']) {
    case 'works':
        if ($params['resource_id'] != null) {
            switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $res = work_get($params['resource_id']);
                break;
            case 'PATCH':
                $res = work_modify($params['resource_id'], $_REQUEST['name'],
                    $_REQUEST['title'], $_REQUEST['year'], $_REQUEST['issue'],
                    $_REQUEST['comment']);
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
                case 'work':
                    $res = work_insert($_REQUEST['name'], $_REQUEST['title'],
                        $_REQUEST['year'], $_REQUEST['issue'], $_REQUEST['comment']);
                    break;
                }
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
                    case 'PATCH':
                        $res = source_modify($params['resource_id'], $_REQUEST['name'],
                            $_REQUEST['title'], $_REQUEST['year'], $_REQUEST['issue'],
                            $_REQUEST['comment']);
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

    header('HTTP/1.1 200 OK');
    header('Content-type: text/json; charset=utf-8');
    print json_encode($res);
}

try {
    handle_request(parse_request_uri($_SERVER['REQUEST_URI']));
} catch (Exception $e) {
    if ($e->getCode == 400) {
        header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request');
    } else {
        header($_SERVER['SERVER_PROTOCOL'].' 500 Internal Server Error');
        // Only enable this line for debugging!
        // It's bad practice to leak exception information to a potential attacker.
        // TODO: better exception logging
        print var_dump($e);
    }
}
?>

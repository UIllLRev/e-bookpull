<?php

require 'sentry.php';
include 'config.php';

function db_connect($connection_string, $user, $pass)
{
    try {
        return new PDO($connection_string, $user, $pass, array(
            PDO::ATTR_PERSISTENT => true
        ));
    } catch (PDOException $e) {
        throw new Exception('Could not connect to database', 500, $e);
    }
}

function get_dbh()
{
    global $config;
    $dbh = db_connect(
        $config['db_connection_string'],
        $config['db_username'],
        $config['db_password']
    );
    $dbh->query("SET sql_mode='TRADITIONAL'");
    return $dbh;
}

function find_exts($filename)
{
    $filename = strtolower($filename) ;
    $exts = split("[/\\.]", $filename) ;
    $n = count($exts)-1;
    $exts = $exts[$n];
    return $exts;
}

function remove_accent($str)
{
    $a = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ');
    $b = array('A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o');
    return str_replace($a, $b, $str);
}

function sanitize_filename($str)
{
    return strtolower(preg_replace(array('/[^a-zA-Z0-9 -]/', '/[ -]+/', '/^-|-$/'), array('', '-', ''), remove_accent($str)));
}

function upload_file($id, $file)
{
    $dbh = get_dbh();
    $stmt = $dbh->prepare(
        'SELECT `author_name` FROM `works` WHERE `author_code` = ?'
    );
    $stmt->bindValue(1, $id);
    $stmt->execute();

    if ($row = $stmt->fetch()) {
        $author_name = $row['author_name'];

        $target_dir = '/uploads/' . $author_name;
        if (!is_dir('..' . $target_dir)) {
            mkdir('..' . $target_dir);
        }
        $target_path = '..' . $target_dir  . '/';

        $date = date("Y-m-d_H-i-s_");

        $filename_and_extension = basename($file['name']);
        $just_extension = find_exts(basename($file['name']));
        $just_filename = substr($filename_and_extension, 0, strrpos($filename_and_extension, '.'));
        $just_filename_sanitized = sanitize_filename($just_filename);

        $target_path = $target_path . $date . $just_filename_sanitized . '.' . $just_extension;
        if (!move_uploaded_file($file["tmp_name"], $target_path)) {
            throw new Exception('Failure uploading file', 500);
        }
        $updated_url = "/members/bookpull" . $target_dir . "/${date}" . $just_filename_sanitized . '.' . $just_extension;
        return array( url => $updated_url );
    } else {
        throw new Exception('Invalid work', 404);
    }
}

function parse_request_uri($uri)
{
    global $config;
    if (substr($uri, 0, strlen($config['path_prefix'])) == $config['path_prefix']) {
        $uri = substr($uri, strlen($config['path_prefix']));
    }

    $matches = array();
    if (preg_match('/^upload\/([0-9]+)$/', $uri, $matches)) {
        return array(
            resource_id     => $matches[1],
        );
    } else {
        throw new Exception('Invalid request', 400);
    }
}

function handle_request($params, $data)
{
    if ($params['resource_id'] != null) {
        switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $res = upload_file($params['resource_id'], $data);
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

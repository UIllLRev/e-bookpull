<?php
require_once 'lib/Raven/Autoloader.php';
Raven_Autoloader::register();

$client = new Raven_Client($config['sentry_url']);
$client->install();
?>

<?php
require_once 'lib/Raven/Autoloader.php';
Raven_Autoloader::register();

$sentry = new Raven_Client($config['sentry_url']);
$sentry->install();

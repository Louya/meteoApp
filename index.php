<?php

require_once 'vendor/autoload.php';

$router = new AltoRouter();

// $router->setBasePath('/alto');

/**Création des routes */
$router->map('GET', '/', ['c'=>'DataController', 'a'=>'index']);
$router->map('GET', '/list', ['c'=>'DataController', 'a'=>'list']);
$router->map('GET', '/post/[i:id]', ['c'=>'DataController', 'a'=>'post']);

$match = $router->match();
$controller = 'App\\Controller\\'.$match['target']['c'];
$action = $match['target']['a'];
$params = $match['params'];

$object = new $controller();
$print = $object->{$action}($params);

echo $print;
<?php

require_once 'vendor/autoload.php';

$router = new AltoRouter();

$router->setBasePath('/alto');

/**Création des routes */
$router->map('GET', '/', ['c'=>'BlogController', 'a'=>'index']);
$router->map('GET', '/list', ['c'=>'BlogController', 'a'=>'list']);
$router->map('GET', '/post/[i:id]', ['c'=>'BlogController', 'a'=>'post']);

$match = $router->match();
$controller = 'App\\Controller\\'.$match['target']['c'];
$action = $match['target']['a'];
$params = $match['params'];

$object = new $controller();
$print = $object->{$action}($params);

echo $print;
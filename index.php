<?php

require_once 'vendor/autoload.php';

use App\Controller\DataController;
use App\Controller\UserController;

$router = new AltoRouter();

//Sert a indiquer un sous dossier comme racine du site
#$router->setBasePath('/alto');

/**Création des routes */
$router->map('GET', '/', ['c'=>'DataController', 'a'=>'index']);
$router->map('GET', '/weather', ['c'=>'DataController', 'a'=>'weather']);
$router->map('GET', '/user/login', ['c'=>'UserController', 'a'=>'login']);
$router->map('GET', '/user/register', ['c'=>'UserController', 'a'=>'register']);
$router->map('GET', '/post/[i:id]', ['c'=>'DataController', 'a'=>'post']);

$match = $router->match();
$controller = 'App\\Controller\\'.$match['target']['c'];
$action = $match['target']['a'];
$params = $match['params'];

$object = new $controller();
$print = $object->{$action}($params);

echo $print;
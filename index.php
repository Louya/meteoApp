<?php

use App\Controller\MainController;

require_once 'vendor/autoload.php';

use App\Controller\DataController;
use App\Controller\UserController;

$router = new AltoRouter();

//Sert a indiquer un sous dossier comme racine du site
#$router->setBasePath('/alto');

/**Création des routes */
$router->map('GET', '/', ['c'=>'DataController', 'a'=>'get']);
$router->map('GET', '/weather', ['c'=>'DataController', 'a'=>'get']);
// $router->map('GET', '/weather/get', ['c'=>'DataController', 'a'=>'get']);
$router->map('GET', '/user', ['c'=>'UserController', 'a'=>'login']);
$router->map('GET', '/user/login', ['c'=>'UserController', 'a'=>'login']);
$router->map('GET', '/user/register', ['c'=>'UserController', 'a'=>'register']);
$router->map('GET', '/post/[i:id]', ['c'=>'DataController', 'a'=>'post']);
$router->map('GET', '/404', ['c'=>'DataController', 'a'=>'notFound']);

//Correspondance avec l'URL actuelle
$match = $router->match();

$controller = 'App\\Controller\\'.$match['target']['c'];
$action = $match['target']['a'];
$params = $match['params'];

//Instantiation d'un nouveau controlleur
$object = new $controller();
$print = $object->{$action}($params); 

// test d'erreur 404
//if( $match && is_callable( $match['target'] ) ) {
    echo $print;
//} else {
	//Aucune route correspondante
    // header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    //echo '404 not found';
//}
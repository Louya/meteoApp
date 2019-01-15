<?php

use App\Controller\MainController;

require_once 'vendor/autoload.php';

$router = new AltoRouter();

//Sert a indiquer un sous dossier comme racine du site
#$router->setBasePath('/alto');

/**Création des routes */
//Route vers la page d'accueil
$router->map('GET', '/', ['c'=>'MainController', 'a'=>'index']);

$router->map('GET', '/list', ['c'=>'MainController', 'a'=>'list']);
$router->map('GET', '/post/[i:id]', ['c'=>'MainController', 'a'=>'post']);
$router->map('GET', '/404', ['c'=>'MainController', 'a'=>'notFound']);

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
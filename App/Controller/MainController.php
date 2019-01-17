<?php

namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class MainController extends Controller{

    /** Route '/' */

    public function index(){
        return $this->twig->render('main.html.twig');
    }

    /** Route /list */

    public function list(){
        $users = new Users();
        $listUsers = $users->findAll();
        return $this->twig->render('users.html.twig', ['users'=> $listUsers]);
    }

    /** Route /post/id */

    public function post( $params){
        extract($params);
        return 'id du post : '.$id;
    }

    /** Route /404  */
    public function notFound(){
        return $this->twig->render('404.html.twig');
    }

}
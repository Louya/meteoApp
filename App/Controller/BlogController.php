<?php

namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class BlogController extends Controller{

    /** Route '/' */

    public function index(){
        echo 'coucou';
        return $this->twig->render('message.html.twig');
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

}
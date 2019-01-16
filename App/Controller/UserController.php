<?php

namespace App\Controller;

use Framework\Component\Controller;
// use App\Models\Login;

class UserController extends Controller{

    /** Route /login */

    public function login(){
        return $this->twig->render('login.html.twig');
    }

    /** Route /register */

    public function register(){
        return $this->twig->render('register.html.twig');
    }

}
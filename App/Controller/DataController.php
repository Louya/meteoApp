<?php

namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class DataController extends Controller{

    /** Route '/' */

    public function index(){
        return $this->twig->render('message.html.twig');
    }

    /** Route /weather */

    public function weather(){
        return $this->twig->render('message.html.twig');
    }

    /** Route /post/id */

    public function post( $params){
        extract($params);
        return 'id du post : '.$id;
    }

}
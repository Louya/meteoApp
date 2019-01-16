<?php

namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class DataController extends Controller{

    /** Route '/' */

    public function index(){
        return $this->twig->render('weather.html.twig');
    }

    /** Route /weather */

    public function get(){
        return $this->twig->render('weather.html.twig');
    }

    /** Route /post/id */

    // public function post( $params){
    //     extract($params);
    //     return 'id du post : '.$id;
    // }

    /** Route /post/id */

    public function notFound(){
        return $this->twig->render('not_found.html.twig');
    }

}
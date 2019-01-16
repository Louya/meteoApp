<?php

namespace App\Controller;

use Framework\Component\Controller;
// use App\Models\Login;

class UserController extends Controller{

    /** Route /login */

    public function login(){
        
        return $this->twig->render('login.html.twig');

        session_start();
        

        function verifForm() {
            
            $error = false;

            $curr_login = "";
            $curr_pass = "";
            
            if(isset($_POST["login"])) {
                $curr_login = $_POST["login"];
            } else {
                $error = true;
            }
            
            if(isset($_POST["pass"])) {
                $curr_pass = $_POST["pass"];
            } else {
                $error = true;
            }

            $methode = 'aes-256-cbc';
            $mdp = 'skW6UZx7t54n3i3F5NqzcL8H3Qx79W3e3StuREMp3BsH556trV';
            $iv = 'Q3G43Qci7v9ZhQ9f';
            
            $curr_login_encr = openssl_encrypt($curr_login,$methode,$mdp,0,$iv);
            $curr_pass_encr = openssl_encrypt($curr_pass,$methode,$mdp,0,$iv);

            $auth = bdd_authentication($curr_login_encr, $curr_pass_encr);


            if($auth["nombre"] !== "1") {
                $error = true;
            }

            if($error === true) {
                $reponse = array("error"=>"Erreur dans l'identifiant ou le mot de passe");
                $_SESSION["authenticated"] = false;
            } else {
                $reponse = array("error"=>false);
                $_SESSION["authenticated"] = true;

                // Stocke le login pour faire le message d'accueil personnalisé
            }
            
            echo json_encode($reponse);

        }

        function deconnexion() {
            session_unset();    
            session_destroy(); 
            header('Location: /pushyourfiles/admin');
        }


        function showForm() {
            global $twig , $base_url;
            echo $twig->render('view_admin.twig' , 
            array('base_url'=>$base_url));
        }

    }

    /** Route /register */

    public function register(){
        return $this->twig->render('register.html.twig');
    }

}
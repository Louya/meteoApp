<?php

namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class UserController extends Controller{


    /** Route /login */
    public function login(){
        return $this->twig->render('login.html.twig');
    } 


    /** Route /user */

    function connected(){
        if($_SESSION["authenticated"] = true){
        
            var_dump($_SESSION["authenticated"]);
            return $this->twig->render('weather.html.twig', array('connected'=>'connected'));
        }else{
            echo 'jkl';
        }
    }


    /** Route /login/verif */
    function verifForm() {
       
        session_start();
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
        
        $curr_login_encr = $curr_login;
        $curr_pass_encr = openssl_encrypt($curr_pass,$methode,$mdp,0,$iv);
       
        $user = new Users();
        $auth = $user->bdd_authentication($curr_login_encr, $curr_pass_encr);

        if($auth["nombre"] !== "1") {
            $error = true;
        }

        if($error === true) {
            $reponse = array("error"=>"Erreur dans l'identifiant ou le mot de passe");
            $_SESSION["authenticated"] = false;
        } else {
            $user = new Users();
            $info_user = $user->bdd_user($curr_login_encr, $curr_pass_encr);
            $reponse = array("error"=>false, "infos"=>$info_user);
            $_SESSION["authenticated"] = true;
            // Stocke le login pour faire le message d'accueil personnalisé
        }
        echo json_encode($reponse);
    }

    function verifRegister() {
        $error = false;
        $message = array();

        $curr_mail = "";
        $curr_pass = "";
            
        if(isset($_POST["mail"]) && filter_var($_POST["mail"], FILTER_VALIDATE_EMAIL)) {
            $curr_mail = $_POST["mail"];
        } else {
            $error = true;
            array_push($message, "L'email est incorrect");
        }
            
        if(isset($_POST["pass"]) && strlen($_POST["pass"]) > 7) {
            $curr_pass = $_POST["pass"];
        } else {
            $error = true;
            array_push($message, "Le mot de passe est incorrect");
        }

        if(isset($_POST["prenom"]) && !empty($_POST["prenom"]) ) {
            $curr_prenom = $_POST["prenom"];
        } else {
            $error = true;
            array_push($message, "Le prenom est incorrect");
        }

        if(isset($_POST["adresse"]) &&  !empty($_POST["adresse"])) {
            $curr_adresse = $_POST["adresse"];
        } else {
            $error = true;
            array_push($message, "L'adresse est incorrecte");
        }

        if(isset($_POST["ville"]) &&  !empty($_POST["ville"])) {
            $curr_ville = $_POST["ville"];
        } else {
            $error = true;
            array_push($message, "La ville est incorrecte");
        }

        // if(!$error){
            $link = "https://nominatim.openstreetmap.org/search?format=json&q=" . $curr_adresse . "," . $curr_ville;
    
            $get_data = callAPI('GET', $link, false);
            
            if(strlen($get_data) < 4){
                $error = true;
                array_push($message, "Cette association adresse/ville ne retourne pas de résultat");
            }
        // }


        // echo json_encode($get_data);

        $methode = 'aes-256-cbc';
        $mdp = 'skW6UZx7t54n3i3F5NqzcL8H3Qx79W3e3StuREMp3BsH556trV';
        $iv = 'Q3G43Qci7v9ZhQ9f';
            
        $curr_pass_encr = openssl_encrypt($curr_pass,$methode,$mdp,0,$iv);

        $user = new Users();

        $auth = $user->bdd_free($curr_mail);

        if($auth["nbr"] === "1") {
            $error = true;
            array_push($message, "Ce mail est déjà pris");
        }

        if($error === true) {
            $reponse = array("message"=>$message);
        } else {
            $reponse = array("message"=>false);
            $auth = $user->bdd_register($curr_mail, $curr_pass_encr, $curr_prenom, $curr_adresse, $curr_ville);
        }
            
        echo json_encode($reponse);
    }

    /** Route /weather/deconnexion */
    public function deconnexion() {
        session_unset();    
        session_destroy(); 
        header('Location: /weather');
    }
        

    /** Route /register */
    public function register(){

        return $this->twig->render('register.html.twig');
    }
}



function callAPI($method, $url, $data){
    $curl = curl_init();

    switch ($method){
    case "POST":
        curl_setopt($curl, CURLOPT_POST, 1);
        if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        break;
    case "PUT":
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
        break;
    default:
        if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'APIKEY: 111111111111111111111',
    'Content-Type: application/json',
    ));
    curl_setopt ($curl, CURLOPT_USERAGENT, 'browser description');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // EXECUTE:
    $result = curl_exec($curl);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
}

// $response = json_decode($get_data, true);
// $errors = $response['response']['errors'];
// $data = $response['response']['data'][0];


// echo json_encode($response);

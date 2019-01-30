<?php



namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class DataController extends Controller{

    /** Route /weather */
    public function weather(){
        session_start();
        if (isset($_SESSION["authenticated"])) {
            $session = true;
        } else {
            $session = false;
        }
        // var_dump($session);
        // die();
        return $this->twig->render('weather.html.twig', array("isAuth"=>$session));
    }

    /** Route weather/session */
    public function session(){

        session_start();

        if (isset($_SESSION["adresse"]) && isset($_SESSION["ville"])) {
            $infos = array("adresse" => $_SESSION["adresse"],"ville" => $_SESSION["ville"]);
            echo json_encode($infos);
        } else {
            echo json_encode(false);
        }

    //     if(isset($_SESSION["authenticated"])) {

    //     if($_SESSION["authenticated"]) {

    //         $session = array("session"=>$_SESSION["authenticated"]);
            
    //     } else {
    //         $session = array("session"=>false);
    //     }
        
    // } else {
    //         $session = array("session"=>false);
    //     }

        
        // if (isset($_SESSION["authenticated"])) {
        //     $session = true;
        // } else {
        //     $session = false;
        // }

        // $menu = $this->twig->render('menu.html.twig', array("isAuth" => $session));
        // $reponse = array("session" => $session, "menu" => $menu);
	    // echo json_encode($reponse);

    }

    /** Route /weather/get */
    public function get(){
      
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
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        
            // EXECUTE:
            $result = curl_exec($curl);
            if(!$result){die("Connection Failure");}
            curl_close($curl);
            return $result;
        }

        $latitude = $_POST["latitude"];
        $longitude = $_POST["longitude"];
        
        if(!isset($_POST["time"])) {
            $ms = round(microtime(true));
        } else {
            $ms = $_POST["time"];
        }

        $link = "https://api.darksky.net/forecast/dc13d8d3db140a701e2aac4edfdfcfb3/".$latitude.",".$longitude.",".$ms."?lang=fr&units=si";

        echo $get_data = callAPI('GET', $link, false);

    }

    /** Route /404 */
    public function notFound(){
        return $this->twig->render('notFound.html.twig');
    }
}
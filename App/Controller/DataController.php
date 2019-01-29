<?php



namespace App\Controller;

use Framework\Component\Controller;
use App\Models\Users;

class DataController extends Controller{

    /** Route /weather */
    public function weather(){
        return $this->twig->render('weather.html.twig');
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

        $link = "https://api.darksky.net/forecast/d6ab8b4c280a31deb1e67e70da248c11/".$latitude.",".$longitude.",".$ms."?lang=fr&units=si";

        echo $get_data = callAPI('GET', $link, false);

    }

    /** Route /404 */
    public function notFound(){
        return $this->twig->render('notFound.html.twig');
    }
}
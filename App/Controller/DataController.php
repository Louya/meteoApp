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
        // $latitude = 67.3;
        // $longitude = 6.17;

        $ms = round(microtime(true));
        $link = "https://api.darksky.net/forecast/dc13d8d3db140a701e2aac4edfdfcfb3/".$latitude.",".$longitude.",".$ms."?lang=fr&units=auto";

        $get_data = callAPI('GET', $link, false);
        echo json_encode($get_data);
        // $response = json_decode($get_data, true);
        // $errors = $response['response']['errors'];
        // $data = $response['response']['data'][0];


        // echo json_encode($response);

    }

    /** Route /404 */

    public function notFound(){
        return $this->twig->render('not_found.html.twig');
    }

}
<?php

namespace App\Models;

use Framework\Component\Database;

class Users extends Database
{
    //private $id
    //private astname;

    public function bdd_register($prenom, $sexe, $mail, $pass, $localisation)
    {
        $req = "INSERT INTO user (prenom, sexe, mail, pass, localisation) VALUES ('$data[prenomUser]', '$data[nomUser]', '$data[villeUser]')";
        return parent::getOne($req,['password'=>$curr_pass_encr, 'user'=>$curr_login_encr]);
    }


        
    public function bdd_authentication($curr_login_encr, $curr_pass_encr) 
    {
        $req = 'SELECT COUNT(id) AS nombre FROM users WHERE user = :user AND password = :password'; // Je compte le nombre d'entrée ayant pour mot de passe et login ceux rentrés
        return parent::getOne($req,['password'=>$curr_pass_encr, 'user'=>$curr_login_encr]);
    }
}
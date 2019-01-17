<?php

namespace App\Models;

use Framework\Component\Database;

class Users extends Database
{

    public function bdd_free($curr_mail)
    {
        $req = "SELECT COUNT(`mail`) AS nbr FROM `user` WHERE `mail` = :mail";
        return parent::getOne($req,['mail'=>$curr_mail]);
    }

    public function bdd_register($curr_mail, $curr_pass_encr, $curr_prenom, $curr_sexe, $curr_color, $curr_localisation)
    {
        $req = "INSERT INTO user (mail, pass, prenom, sexe, color, localisation) VALUES (:mail, :pass, :prenom, :sexe, :color, :localisation)";
        return parent::getOne($req,['mail'=>$curr_mail,'pass'=>$curr_pass_encr, 'prenom'=>$curr_prenom,'sexe'=>$curr_sexe,'color'=>$curr_color,'localisation'=>$curr_localisation]);
    }

    // function bdd_authentication($curr_login_encr, $curr_pass_encr) {

    //     $req = 'SELECT COUNT(id) AS nombre FROM users WHERE user = :user AND password = :password'; // Je compte le nombre d'entrée ayant pour mot de passe et login ceux rentrés
        
    //     return parent::getOne($req,['password'=>$curr_pass_encr, 'user'=>$curr_login_encr]);


}
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

    public function bdd_register($curr_mail, $curr_pass_encr, $curr_prenom, $curr_adresse, $curr_ville)
    {
        $req = "INSERT INTO user (mail, pass, prenom, adresse, ville) VALUES (:mail, :pass, :prenom, :adresse, :ville)";
        parent::insertOne($req,['mail'=>$curr_mail,'pass'=>$curr_pass_encr, 'prenom'=>$curr_prenom, 'adresse'=>$curr_adresse, 'ville'=>$curr_ville]);
    }


        
        
        public function bdd_authentication($curr_login_encr, $curr_pass_encr) 
        {
            $req = 'SELECT COUNT(id) AS nombre FROM user WHERE mail = :user AND pass = :password'; // Je compte le nombre d'entrées ayant pour mot de passe et login ceux rentrés
            return parent::getOne($req,['password'=>$curr_pass_encr, 'user'=>$curr_login_encr]);
        }

        public function bdd_user($curr_login_encr, $curr_pass_encr) 
        {
            $req = 'SELECT prenom, adresse, ville FROM `user` WHERE mail = :user AND pass = :password'; // Je compte le nombre d'entrée ayant pour mot de passe et login ceux rentrés
            return parent::getOne($req,['password'=>$curr_pass_encr, 'user'=>$curr_login_encr]);
        }


        // SELECT prenom, sexe, color, adresse, ville FROM `user` WHERE mail = :user
    }

<?php

namespace Framework\Component;

use \Dotenv;



class DatabaseConfig
{
    protected static $db;



    private static function config(){
        try
        {
            $dotenv = \Dotenv\Dotenv::create($_SERVER['DOCUMENT_ROOT']);
            $dotenv->load();
            self::$db = new \PDO('mysql:host='.getenv('DB_HOSTNAME').';dbname='.getenv('DB_DATABASE'), getenv('DB_USER'), getenv('DB_PASSWORD') );
            self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    }
    protected static function connect(){
        self::config();        
    }
    
}
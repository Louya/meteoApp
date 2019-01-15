<?php
namespace Framework\Component;

use Framework\Component\DatabaseConfig;

class Database extends DatabaseConfig
{
    private static $th;
    protected static $sql;

    protected static function prepare( string $sql ):void
    {
        parent::connect();
        self::$th = parent::$db->prepare( $sql );
    }

    protected static function execute():void
    {
        self::$th->execute();
    }

    protected static function fetchAll():array
    {
        return self::$th->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected static function fetch():array
    {
        return self::$th->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected static function getAll($sql):array
    {
        self::$sql = $sql;
        self::prepare( self::$sql );
        self::execute();
        return self::fetchAll();
    }
}
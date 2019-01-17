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


    protected static function fetchAll():array{
        return self::$th->fetchAll(\PDO::FETCH_ASSOC);
    }


    protected static function fetch():array{
        return self::$th->fetch(\PDO::FETCH_ASSOC);
    }


    protected static function bindParam( $param, $variable ){
    $typeVariable = gettype( $variable );
    $typeParam = \PDO::PARAM_STR;

    switch( $typeVariable ){

    case "integer" :
    $typeParam = \PDO::PARAM_INT;
    break;

    case "string" :
    case "array" :
    case "object" :
    case "float" :
    $typeParam = \PDO::PARAM_STR;
    break;

    case "boolean" :
    $typeParam = \PDO::PARAM_BOOL;
    break;
    }

    self::$th->bindParam( $param, $variable, $typeParam );
    }


    protected static function getAll( $sql, $params=[] ):array
    {
        self::$sql = $sql;
        self::prepare( self::$sql );
        foreach( $params as $key=>$values){
        self::bindParam(':'.$keys, $values);
        }
        self::execute();
        return self::fetchAll();
    }

protected static function getOne( $sql, $params=[] ):array
{
self::$sql = $sql;
self::prepare( self::$sql );
foreach( $params as $keys=>$values){
self::bindParam(':'.$keys, $values);
}
self::execute();
return self::fetch();
}

protected static function insertOne( $sql, $params=[] )
{
    self::$sql = $sql;
    self::prepare( self::$sql );
    foreach( $params as $keys=>$values){
        self::bindParam(':'.$keys, $values);
    }
    self::execute();
}


}
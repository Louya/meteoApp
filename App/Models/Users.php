<?php

namespace App\Models;

use Framework\Component\Database;

class Users extends Database
{
    //private $id
    //private astname;

    public function findAll()
    {
        $sql ="SELECT id, last_name FROM users";
        return parent::getAll($sql);
    }


}
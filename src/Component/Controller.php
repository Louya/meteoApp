<?php

namespace Framework\Component;

use Framework\Component\Template;

class Controller{

    protected $twig;
    protected $fileTemplate;

    public function __construct() {
        $this->twig = new Template();
    }
}
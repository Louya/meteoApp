<?php

namespace Framework\Component;

use \Twig_Environment;
use \Twig_Loader_Filesystem;

class Template {

    private const PATH = 'Templates';
    private $loader;
    private $template;
    
    public function __construct() {

        $this->loader = new Twig_Loader_Filesystem( self::PATH );
        $this->template = new Twig_Environment( $this->loader, array(
            'cache'=> false
        ));
    }

    public function render( $chemin, $params = [] ){

        return $this->template->render( $chemin, $params );
    }
}
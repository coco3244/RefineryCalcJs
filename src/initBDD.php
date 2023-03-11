<?php
    try {
        $BDD = new PDO('mysql:host='.$_ENV["DB_HOST"].';dbname='.$_ENV["DB_DATABASE"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]); // $_ENV["DB_PASS"]
    } catch (PDOException $e){
        echo 'Allume ton serv MySQL sombre idiot';
    }
?>
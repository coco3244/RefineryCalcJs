<?php
    try {
        $BDD = new PDO('mysql:host=localhost;dbname=appminage', 'root', '');
    } catch (PDOException $e){
        echo 'Allume ton serv MySQL sombre idiot';
    }
?>
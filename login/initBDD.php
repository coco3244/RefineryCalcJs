<?php
    try {
        $BDD = new PDO('mysql:host=localhost;dbname=appminage', 'root', '');
    } catch (PDOException $e){
        echo 'La bdd n\'est pas disponible';
    }
?>
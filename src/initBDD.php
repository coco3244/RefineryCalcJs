<?php
    try {
        // /!\ IMPORTANT : Si tu arrive pas a te connecter à la bdd, remplace le 'azerty' par '', ou appelle Lidu ;)
        $BDD = new PDO('mysql:host=localhost;dbname=refinerycalc', 'root', 'azerty'); 
    } catch (PDOException $e){
        echo 'Allume ton serv MySQL sombre idiot';
    }
?>
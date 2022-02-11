<?php
    // print_r($_POST);
    require("./initBDD.php");

    // Connexion -----------------------
    if(isset($_POST["login"])) {
        $pseudo = $_POST["login"];
        $psw = $_POST["psw"];
        $sql = "SELECT login, password FROM User";
        $req = $BDD->query($sql);
    
        $exist = false;
        while($data = $req->fetch(PDO::FETCH_ASSOC)) {
            // print_r($data);
            if($pseudo == $data["login"]) {
                if($psw == $data["password"]) {
                    echo "Connect";
                    print(" Pseudo=".$pseudo);
                } else {
                    echo "pswNo";
                }
                $exist = true;
                break;
            }
        }
    
        if($exist == false) {
            echo "CRE4TI0N";
        } 

        // Inscription -----------------------
    } elseif(isset($_POST["insert"])) {
        $pseudo = $_POST["insert"]["login"];
        $psw = $_POST["insert"]["password"];
        $sql = $BDD->prepare("INSERT INTO User(login, password) VALUES (?, ?)");
        $sql->execute(array($pseudo, $psw));

        print("Pseudo=".$pseudo);

    } elseif(isset($_POST["fetch"])) {

        if(isset($_POST["raffinery"])) {
            $sql = "SELECT * FROM `jobs` WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."') AND Raffinery LIKE '%".$_POST["raffinery"]."%';";

        } else {
            $sql = "SELECT * FROM `jobs` WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."');";
        }
        $req = $BDD->query($sql);

        $jobs = [];
        while($data = $req->fetch(PDO::FETCH_ASSOC)) {
            $jobs[] = $data;
        }
        $jobs = json_encode($jobs);
        print($jobs);
    }

?>
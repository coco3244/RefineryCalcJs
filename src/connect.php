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

    } elseif (isset($_POST["nextId"])) {
        $sql = "SELECT MAX(idJob) FROM jobs";
        $req = $BDD->query($sql);
        $data = $req->fetch(PDO::FETCH_ASSOC);
        print_r(json_encode($data));

    } elseif (isset($_POST["newInsert"])) {
        $ins = $_POST["newInsert"];
        $i = 0;
        $colonnes = "";
        $pointdint = "";
        $datas = [];

        $id = $_POST["newInsert"]["idJob"];

        $req = $BDD->query("SELECT EXISTS (SELECT idJob FROM jobs WHERE idJob=$id) AS Exist" );
        $data = $req->fetch(PDO::FETCH_ASSOC);
        
        $datas = [];

        if ($data["Exist"] == 1) {
            foreach($_POST["newInsert"] as $col => $val) {
                
                if ($col != "fk_idUser") {
                    if($i != 0) {
                        $colonnes .= ", ";
                    }
                    
                    $colonnes .= $col."=?";
                    $datas[] = $val;
                }
                
                $i++;
            }
            
            print_r($datas);
                   
            $prep = "UPDATE jobs SET $colonnes WHERE idJob=$id";
            print($prep);
            $sql = $BDD->prepare($prep);
            $sql->execute($datas);
            
        } else {
            foreach($_POST["newInsert"] as $col => $val) {
                if($i != 0) {
                    $colonnes .= ", ";
                    $pointdint .= ", ";
                }
                
                if ($col == "fk_idUser") {
                    $sql = "SELECT idUser FROM user WHERE login='$val'";
                    $req = $BDD->query($sql);
                    $data = $req->fetch(PDO::FETCH_ASSOC);
                    
                    $colonnes .= $col;
                    $pointdint .= "?";
                    $datas[] = $data["idUser"];
                } else {
                    $colonnes .= $col;
                    $pointdint .= "?";
                    $datas[] = $val;
                }
                
                $i++;
            }
                   
            $prep = "INSERT INTO jobs ($colonnes) VALUES($pointdint)";
            $sql = $BDD->prepare($prep);
            $sql->execute($datas);
        }
    }

?>
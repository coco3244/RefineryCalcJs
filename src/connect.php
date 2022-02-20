<?php
    // print_r($_POST);
    require("./initBDD.php");

    if (isset($_POST["autoConnect"])) {
        // print("auto");
        print_r($_COOKIE);
        if (isset($_COOKIE["login"])) {
            print("autoConnect");
            print("Pseudo=".$_COOKIE["login"]);
        }

    } elseif(isset($_POST["login"])) {
        // Connexion ----------------------------------------------------------
        $pseudo = $_POST["login"];
        $psw = $_POST["psw"];
        $sql = "SELECT login, password FROM User";
        $req = $BDD->query($sql);
        
        $exist = false;
        while ($data = $req->fetch(PDO::FETCH_ASSOC)) {
            // print_r($data);
            if($pseudo == $data["login"]) {
                if($psw == $data["password"]) {
                    echo "Connect";
                    print(" Pseudo=".$pseudo);
                    if (isset($_POST["rememberMe"])) {
                        // On set les cookies à 3 mois si remember coché
                        setcookie("login", $pseudo, time()+7889400);
                    } else {
                        // On set les cookies à 1 sec si remember pas coché
                        setcookie("login", $pseudo, 1);
                    }
                } else {
                    echo "pswNo";
                }
                $exist = true;
            }
        }


        if($exist == false) {
            echo "CRE4TI0N";
        } 

    } elseif(isset($_POST["insert"])) {
        // Inscription --------------------------------------------------------
        $pseudo = $_POST["insert"]["login"];
        $psw = $_POST["insert"]["password"];
        $sql = $BDD->prepare("INSERT INTO User(login, password) VALUES (?, ?)");
        $sql->execute(array($pseudo, $psw));

        if (isset($_POST["insert"]["rememberMe"])) {
            // On set les cookies à 3 mois si remember coché
            setcookie("login", $pseudo, time()+7889400);
        } else {
            // On set les cookies à 1 sec si remember pas coché
            setcookie("login", $pseudo, 1);
        }

        print("Pseudo=".$pseudo);

    } elseif(isset($_POST["fetch"])) {
        // Récupération des jobs ----------------------------------------------

        if (isset($_POST["firstLoad"])) {
            $sql = "SELECT DISTINCT U.lastFilter, J.* FROM jobs J INNER JOIN user U ON J.Raffinery LIKE concat('%', U.lastFilter ,'%') AND J.fk_idUser = U.idUser WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."')";

        } elseif(isset($_POST["raffinery"])) {
            $sql2 = "UPDATE user SET lastFilter='".$_POST["raffinery"]."' WHERE login = '".$_POST["fetch"]."'";
            $req2 = $BDD->query($sql2);

            $sql = "SELECT * FROM jobs WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."') AND Raffinery LIKE concat('%', '".$_POST["raffinery"]."','%');";

        } else {
            $sql = "SELECT * FROM `jobs` WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."');";
        }
        // print($sql);

        $req = $BDD->query($sql);

        $jobs = [];
        while($data = $req->fetch(PDO::FETCH_ASSOC)) {
            $jobs[] = $data;
        }

        if (isset($_POST["firstLoad"])) {
            if (!isset($jobs[0])) {
                $sql = "SELECT * FROM `jobs` WHERE fk_idUser = (SELECT idUser FROM user WHERE login = '".$_POST["fetch"]."');";
                $req = $BDD->query($sql);

                $jobs = [];
                while($data = $req->fetch(PDO::FETCH_ASSOC)) {
                    $jobs[] = $data;
                }
            }
        }

        $jobs = json_encode($jobs);
        print($jobs);

    } elseif (isset($_POST["nextId"])) {
        // Récup de la prochaine id -------------------------------------------
        $sql = "SELECT MAX(idJob) FROM jobs";
        $req = $BDD->query($sql);
        $data = $req->fetch(PDO::FETCH_ASSOC);
        print_r(json_encode($data));

    } elseif (isset($_POST["newInsert"])) {
        // Insertion ou Update d'une ligne selon l'id -------------------------
        $ins = $_POST["newInsert"];
        $i = 0;
        $colonnes = "";
        $pointdint = "";
        $datas = [];
        $alreadyExist = false;

        $id = $_POST["newInsert"]["idJob"];

        $req = $BDD->query("SELECT * FROM jobs WHERE idJob=$id" );
        $prevData = $req->fetch(PDO::FETCH_ASSOC);

        // On vérifie si toutes les valeurs existent déjà, et si non, on les met à null dans l'update
        if (isset($prevData["idJob"])) {
            $alreadyExist = true;
            foreach($prevData as $key => $val) {
                if ($val == "") {
                    unset($prevData[$key]);
                    continue;
                }
                if (isset($prevData[$key]) && !isset($_POST["newInsert"][$key])) {
                    $_POST["newInsert"][$key] = NULL;
                }
            }
        }
        
        // SI la ligne existe, update
        if ($alreadyExist == true) {
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
            
            $prep = "UPDATE jobs SET $colonnes WHERE idJob=$id";
            $sql = $BDD->prepare($prep);
            $sql->execute($datas);
            
            // Sinon, insert
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
    } elseif (isset($_POST["delLine"])) {
        $id = $_POST["delLine"];
        $sql = "DELETE FROM jobs WHERE idJob=$id";
        $req = $BDD->query($sql);

    }

?>
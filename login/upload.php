<?php
    print_r($_POST);
    require("./initBDD.php");

    if(isset($_POST["login"])) {
        $pseudo = $_POST["login"];
        $sql = "SELECT login FROM user";
        $req = $BDD->query($sql);
    
        $exist = false;
        while($data = $req->fetch(PDO::FETCH_ASSOC)) {
            print_r($data["login"]);
            if($pseudo == $data["login"]) {
                echo "cet identifiant existe déjà ! Conexioooooooon !";
                $exist = true;
                break;
            }
        }
    
        if($exist == false) {
            echo "CRE4TI0N";
        }
    } elseif(isset($_POST["insert"])) {
        print_r($_POST);
        $sql = $BDD->prepare("INSERT INTO user(login) VALUES (?)");
        $sql->execute(array($pseudo));

        // echo "here I remain";
    }

?>
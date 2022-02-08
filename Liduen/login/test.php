<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>appMinage</title>

    <link rel="stylesheet" href="styleTest.css">

    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>
    <?php
        require("./initBDD.php");
    ?>
    <form>
        <label>
            Pseudo : 
            <input type="text" name="login" id="iLogin" max="70" required><br>
            Mot de passe :
            <input type="text" name="psw" id="iPsw" max="70" required>
        </label>

        <button id="submit">Envoyer</button>
    </form> 
    <div class="addLog hide">
        Attention ! Cet identifiant n'existe pas, voulez vous le créer ? <br>
        <button id="yesAdd btnCreate">Oui</button>
        <button id="noAdd btnCreate">Non</button>
    </div>
    <label id="result"> 

    </label>

    <script src="upload.js"></script>
</body>
</html>
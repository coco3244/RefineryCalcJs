const { Z_VERSION_ERROR } = require("zlib");

const mdpErreur = document.querySelector(".mdpError");
const addLog = document.querySelector(".addLog");
const yesAdd = document.querySelector(".yesAdd");
const noAdd = document.querySelector(".noAdd");

const iLogin = document.querySelector("#iLogin");
const iPsw = document.querySelector("#iPsw");
let tabInsert = {};
tabInsert.insert = {};

const connexionContainer = document.querySelector(".connexionContainer");
const pseudo = document.getElementById("pseudoAct");



const titleConnexion = document.querySelector(".titleConnexion");
// A virer, c'est pour le dev uniquement
titleConnexion.addEventListener("mouseover", (e) => {
    console.log("heyy");
    connexionContainer.style.display = "none";
    pseudo.innerHTML = "Liduen";
});


// traitement du form
$("form").submit(function(evt){	 
    evt.preventDefault();
    let formData = new FormData($(this)[0]);

    $.ajax({
        url: './src/connect.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (response) {
            console.log(response);

            if(response.search("CRE4TI0N") !== -1) {
                console.log("uiii");
                mdpErreur.classList.add("hide");
                addLog.classList.remove("hide");
                tabInsert.insert.login = iLogin.value;
                tabInsert.insert.password = iPsw.value;
                console.log(tabInsert.insert.login + " " + tabInsert.insert.password);
            } else if(response.search("Connect") !== -1) {
                connectioooooooon(response);
            } else if(response.search("pswNo") !== -1) {
                mdpErreur.classList.remove("hide");
            }
        }
    });
    return false;
});

//Traitement du btn oui
yesAdd.addEventListener("click", (e) => {
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        data: tabInsert,
        success: function(res) {
            console.log(res);
            connectioooooooon(res);
        }
    });
});



function connectioooooooon(res) {
    connexionContainer.style.display = "none";
    let ps = res.search("Pseudo=");
    let result = res.substr(ps + 7, res.length)
    console.log(result);

    pseudo.innerHTML = result;
}
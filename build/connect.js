"use strict";

var _require = require("zlib"),
    Z_VERSION_ERROR = _require.Z_VERSION_ERROR;

var mdpErreur = document.querySelector(".mdpError");
var addLog = document.querySelector(".addLog");
var yesAdd = document.querySelector(".yesAdd");
var noAdd = document.querySelector(".noAdd");
var iLogin = document.querySelector("#iLogin");
var iPsw = document.querySelector("#iPsw");
var tabInsert = {};
tabInsert.insert = {};
var connexionContainer = document.querySelector(".connexionContainer");
var pseudo = document.getElementById("pseudoAct");
var titleConnexion = document.querySelector(".titleConnexion"); // A virer, c'est pour le dev uniquement

titleConnexion.addEventListener("mouseover", function (e) {
  console.log("heyy");
  connexionContainer.style.display = "none";
  pseudo.innerHTML = "Liduen";
}); // traitement du form

$("form").submit(function (evt) {
  evt.preventDefault();
  var formData = new FormData($(this)[0]);
  $.ajax({
    url: './src/connect.php',
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    success: function success(response) {
      console.log(response);

      if (response.search("CRE4TI0N") !== -1) {
        console.log("uiii");
        mdpErreur.classList.add("hide");
        addLog.classList.remove("hide");
        tabInsert.insert.login = iLogin.value;
        tabInsert.insert.password = iPsw.value;
        console.log(tabInsert.insert.login + " " + tabInsert.insert.password);
      } else if (response.search("Connect") !== -1) {
        connectioooooooon(response);
      } else if (response.search("pswNo") !== -1) {
        mdpErreur.classList.remove("hide");
      }
    }
  });
  return false;
}); //Traitement du btn oui

yesAdd.addEventListener("click", function (e) {
  $.ajax({
    url: "./src/connect.php",
    method: "POST",
    data: tabInsert,
    success: function success(res) {
      console.log(res);
      connectioooooooon(res);
    }
  });
});

function connectioooooooon(res) {
  connexionContainer.style.display = "none";
  var ps = res.search("Pseudo=");
  var result = res.substr(ps + 7, res.length);
  console.log(result);
  pseudo.innerHTML = result;
}
//# sourceMappingURL=connect.js.map
"use strict";

var mdpErreur = document.querySelector(".mdpError");
var addLog = document.querySelector(".addLog");
var yesAdd = document.querySelector(".yesAdd");
var noAdd = document.querySelector(".noAdd");
var iLogin = document.querySelector("#iLogin");
var iPsw = document.querySelector("#iPsw");
var connexionContainer = document.querySelector(".connexionContainer");
var pseudo = document.getElementById("pseudoAct");
var jobContainer = document.querySelector(".jobsContainer");
var tabInsert = {};
var titleConnexion = document.querySelector(".titleConnexion"); // A virer, c'est pour le dev uniquement

titleConnexion.addEventListener("mouseover", function (e) {
  console.log("Connecté :D");
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
        mdpErreur.classList.add("hide");
        addLog.classList.remove("hide");
        tabInsert.insert = {};
        tabInsert.insert.login = iLogin.value;
        tabInsert.insert.password = iPsw.value;
        console.log(tabInsert.insert.login + " " + tabInsert.insert.password);
      } else if (response.search("Connect") !== -1) {
        connectioooooooon(response, false);
      } else if (response.search("pswNo") !== -1) {
        mdpErreur.classList.remove("hide");
      }
    }
  });
  return false;
}); //Traitement du btn oui

yesAdd.addEventListener("click", function (e) {
  e.preventDefault();
  $.ajax({
    url: "./src/connect.php",
    method: "POST",
    data: tabInsert,
    success: function success(res) {
      console.log(res);
      connectioooooooon(res, true);
    }
  });
});
noAdd.addEventListener("click", function (e) {
  e.preventDefault();
  addLog.classList.add("hide");
  iLogin.value = "";
  iPsw.value = "";
});

function connectioooooooon(res, create) {
  connexionContainer.style.display = "none";
  var ps = res.search("Pseudo=");
  var result = res.substr(ps + 7, res.length);
  pseudo.innerHTML = result;
  fetchDB(result);
}

function fetchDB(pseudo) {
  // Requète ajax pour requérir la BDD
  $.ajax({
    url: "./src/connect.php",
    method: "POST",
    data: {
      "fetch": pseudo
    },
    success: function success(res) {
      res = JSON.parse(res);
      jobContainer.innerHTML = ""; //sécurité à enlever ?

      if (res.length > 0) {
        // Défilement du tableau et extraction des valeurs
        for (var i = 0; i < res.length; i++) {
          var jobId = void 0;
          var raffinery = void 0;
          var time = void 0;
          var labelMinerais = "";
          var labelVal = "";

          for (var val in res[i]) {
            switch (val) {
              case "idJob":
                jobId = res[i][val];
                break;

              case "fk_idUser":
                // x(
                // Y a rien à voir, dégage.
                break;

              case "Raffinery":
                raffinery = res[i][val];
                break;

              case "heurePlace":
                time = res[i][val];
                break;

              default:
                if (res[i][val] !== null) {
                  labelMinerais += "<label>".concat(val, "</label>");
                  labelVal += "<label>".concat(res[i][val], " cSCU</label>");
                }

            }
          } // Setup de l'html avec les variables


          var jobHtml = "\n                    <div class=\"job\" id=\"jobId_".concat(jobId, "\">\n                        <label class=\"titleJob\">").concat(i + 1, "</label>\n        \n                        <div class=\"mineraisContainer\">\n                            <div class=\"mineraisJob\">\n                                <div class=\"listeMinerais\">\n                                    ").concat(labelMinerais, "\n                                </div>\n                                <span class=\"separate\"></span>\n                                <div class=\"listeQuantites\">\n                                    ").concat(labelVal, "\n                                </div>\n                            </div>\n                            <label class=\"titreCat\">Total de ce Raffinage : </label>\n                            <div class=\"tabCat\">\n                                250 000 aUEC\n                            </div>\n                        </div>\n        \n                        <div class=\"emplacementContainer\">\n                            <label class=\"titreCat\">Emplacement : </label>\n                            <div class=\"tabCat\">\n                                ").concat(raffinery, "\n                            </div>\n                        </div>\n        \n                        <div class=\"tempsContainer\">\n                            <label class=\"titreCat\">Temps Restant : </label>\n                            <div class=\"tabCat\">\n                                ").concat(time, "\n                            </div>\n                        </div>\n        \n                        <div class=\"btnsContainer\">\n                            <button class=\"btnTransport\">Transporter</button>\n                            <button class=\"btnModif\">Modifier</button>\n                        </div>\n                    </div>"); //Affichage des cases remplies

          jobContainer.innerHTML = jobHtml + jobContainer.innerHTML;
        }
      }
    }
  });
}
//# sourceMappingURL=connect.js.map
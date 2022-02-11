"use strict";

var scrollContainer = document.querySelector('.jobsContainer');
var addJobButton = document.querySelector('.addJobCont');
var selectFiltre = document.querySelector("#selectFiltre");
scrollContainer.addEventListener('wheel', function (event) {
  event.preventDefault();
  scrollContainer.scrollLeft += event.deltaY;
});
addJobButton.addEventListener("click", function (event) {
  event.preventDefault();
  var jobsContainer = document.querySelector(".jobsContainer");
  var numJob = document.querySelectorAll(".job").length + 1;
  var jobHtml =
  /*html*/
  "\n    <div class=\"job job".concat(numJob, "\" id=\"jobId_TOBECHANGED\">\n        <label class=\"titleJob dontmod\">").concat(numJob, "</label>\n\n        <div class=\"mineraisContainer\">\n                    <select class=\"selectMinerai\"> \n                    <option>quantainum</option>\n                    <option>bexalite</option>\n                    <option>taranite</option>\n                    <option>borase</option>\n                    <option>laranite</option>\n                    <option>agricium</option>\n                    <option>hephaestanite</option>\n                    <option>titanium</option>                               \n                    </select>\n                <button class=\"btnAddMineral\">Ajouter</button>\n                <button class=\"btnSuppMineral\">Supprimer</button>\n            <div class=\"mineraisJob\">\n                \n                \n                <div class=\"listeMinerais\">\n                    \n                </div>\n\n                <span class=\"separate\"></span>\n                <div class=\"listeQuantites\">\n                    \n                </div>\n            </div>\n            <label class=\"titreCat dontmod\">Total de ce Raffinage : </label>\n            <div class=\"tabCat\">\n                0\n            </div>\n        </div>\n        \n        <div class=\"emplacementContainer\">\n            <label class=\"titreCat dontmod\">Emplacement : </label>\n            <div class=\"tabCat\">\n                <select class=\"Raffinery\"> \n                    <option>CRU-L1</option>\n                    <option>ARC-L1</option>\n                    <option>ARC-L2</option>\n                    <option>HUR-L1</option>\n                    <option>HUR-L2</option>\n                    <option>MIC-L2</option>                             \n                </select>\n            </div>\n        </div>\n\n        <div class=\"tempsContainer\">\n            <label class=\"titreCat dontmod\">Temps Restant : </label>\n            <div class=\"tabCat\">\n                <input class=\"temprestant\" type=\"text\">\n            </div>\n        </div>\n\n        <div class=\"btnsContainer\">\n            <button class=\"btnTransport\">Transporter</button>\n            <button class=\"btnModif hide\">Modifier</button>\n            <button class=\"btnConfirm\">Confirmer</button>\n        </div>\n    </div>");
  jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
  var newJob = document.querySelector(".job".concat(numJob));
  var selectMinerai = newJob.querySelector('.selectMinerai');
  var listeMineraisDiv = newJob.querySelector('.listeMinerais');
  var listeQuantitesDiv = newJob.querySelector('.listeQuantites');
  /**
  * listener pour ajouter un minerai
  * ca cree un label et un input et ca les insère dans leur div correspondante
  */

  newJob.querySelector('.btnAddMineral').addEventListener('click', function (event) {
    if (!listeMineraisDiv.querySelector(".".concat(selectMinerai.value))) {
      var input = document.createElement('input');
      input.setAttribute('type', 'number');
      input.classList.add("".concat(selectMinerai.value));
      var label = document.createElement('label');
      label.classList.add("".concat(selectMinerai.value));
      label.classList.add("dontmod");
      label.innerHTML = "".concat(selectMinerai.value);
      listeQuantitesDiv.appendChild(input);
      listeMineraisDiv.appendChild(label);
    }
  });
  /**
  * Supprime les minerai des 2 div correspondante
  */

  newJob.querySelector('.btnSuppMineral').addEventListener('click', function (event) {
    listeQuantitesDiv.querySelector(".".concat(selectMinerai.value)).remove();
    listeMineraisDiv.querySelector(".".concat(selectMinerai.value)).remove();
  });
  /**
  * listener du bouton confirmation
  * ça confirme la modification
  * ca re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
  * ca cache le bouton modifier et re affiche le bouton confirmer
  */

  newJob.querySelector('.btnModif').addEventListener('click', function (event) {
    var labels = newJob.querySelectorAll('label');
    selectMinerai.classList.remove('hide');
    newJob.querySelector('.btnAddMineral').classList.remove('hide');
    newJob.querySelector('.btnSuppMineral').classList.remove('hide');
    labels.forEach(function (label) {
      if (!label.classList.contains('dontmod')) {
        var input = document.createElement('input');

        if (label.parentNode.classList.contains('listeQuantites')) {
          input.setAttribute('type', 'number');
        } else {
          input.setAttribute('type', 'text');
        }

        if (label.classList.contains('Raffinery')) {
          var select = document.createElement('select');
          select.innerHTML = "\n                <option>CRU-L1</option>\n                <option>ARC-L1</option>\n                <option>ARC-L2</option>\n                <option>HUR-L1</option>\n                <option>HUR-L2</option>\n                <option>MIC-L2</option>                             \n                ";
          select.classList.add('Raffinery');
          var options = select.querySelectorAll('option');
          var raffinerie = label.innerHTML;
          options.forEach(function (value) {
            if (value.innerHTML === raffinerie) {
              select.value = raffinerie;
            }
          });
          label.parentNode.appendChild(select);
          label.remove();
        } else {
          input.classList.add("".concat(label.classList.toString()));
          input.setAttribute('value', "".concat(delUnit(label.innerHTML, 5)));
          label.parentNode.appendChild(input);
          label.remove();
        }
      }
    });
    var target = event.target.parentNode;
    target.querySelector('.btnConfirm').classList.remove('hide');
    target.querySelector('.btnModif').classList.add('hide');
  });
  /**
    * listener pour la confirmation de modification
    * ca cache le menu déroulant avec les minerai ainsi que les boutons ajouter et supprimer
    * ca transforme les input en label
    * ca cache le bouton confirmer et re affiche le bouton modifier
    */

  newJob.querySelector('.btnConfirm').addEventListener('click', function (event) {
    var target = event.target.parentNode;
    target.querySelector('.btnConfirm').classList.add('hide');
    target.querySelector('.btnModif').classList.remove('hide');
    var inputs = newJob.querySelectorAll('input');
    inputs.forEach(function (input) {
      var label = document.createElement('label');
      label.classList.add("".concat(input.classList.toString()));

      if (!label.classList.contains('temprestant')) {
        label.innerHTML = "".concat(input.value, " cSCU");
      } else {
        label.innerHTML = "".concat(input.value);
      }

      input.parentNode.appendChild(label);
      input.remove();
    });
    var raffinerySelect = newJob.querySelector('.Raffinery');
    var label = document.createElement('label');
    console.log(newJob);
    label.classList.add("".concat(raffinerySelect.classList.toString()));
    label.innerHTML = raffinerySelect.value;
    raffinerySelect.parentNode.appendChild(label);
    raffinerySelect.remove();
    selectMinerai.classList.add('hide');
    newJob.querySelector('.btnAddMineral').classList.add('hide');
    newJob.querySelector('.btnSuppMineral').classList.add('hide');
  });
});
selectFiltre.addEventListener("input", function (e) {
  console.log(selectFiltre.value);
  var pseudoCont = document.querySelector("#pseudoAct");
  var pseudo = pseudoCont.innerHTML;
  fetchDB(pseudo, selectFiltre.value);
});
/**
* fonction fournie par Liduen
* @param {*} numb 
* @param {*} nbUnit 
* @returns 
*/

function delUnit(numb, nbUnit) {
  numb = numb.split("");
  numb.splice(numb.length - nbUnit, nbUnit);
  numb = numb.join("");
  return Number(numb);
}
//# sourceMappingURL=scriptCalc.js.map
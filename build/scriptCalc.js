"use strict";

var scrollContainer = document.querySelector('.jobsContainer');
var addJobButton = document.querySelector('.addJobCont');
var selectFiltre = document.querySelector("#selectFiltre");
var jobsContainer = document.querySelector(".jobsContainer");
scrollContainer.addEventListener('wheel', function (event) {
  event.preventDefault();
  scrollContainer.scrollLeft += event.deltaY;
});
jobContainer.addEventListener("click", function (event) {
  var selectMinerai = event.target.parentNode.parentNode.querySelector('.selectMinerai');
  var listeMineraisDiv = event.target.parentNode.parentNode.querySelector('.listeMinerais');
  var listeQuantitesDiv = event.target.parentNode.parentNode.querySelector('.listeQuantites');

  if (event.target.classList.contains("btnAddMineral")) {
    /**
    * listener pour ajouter un minerai
    * ca cree un label et un input et ca les insère dans leur div correspondante
    */
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
  }

  if (event.target.classList.contains("btnSuppMineral")) {
    /**
    * Supprime les minerai des 2 div correspondante
    */
    listeQuantitesDiv.querySelector(".".concat(selectMinerai.value)).remove();
    listeMineraisDiv.querySelector(".".concat(selectMinerai.value)).remove();
  }

  if (event.target.classList.contains("btnModif")) {
    /**
    * listener du bouton confirmation
    * ça confirme la modification
    * ca re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
    * ca cache le bouton modifier et re affiche le bouton confirmer
    */
    event.target.parentNode.querySelector('.btnConfirm').classList.remove('hide');
    event.target.parentNode.querySelector('.btnModif').classList.add('hide');
    var labels = event.target.parentNode.parentNode.querySelectorAll('label');
    selectMinerai.classList.remove('hide');
    event.target.parentNode.parentNode.querySelector('.btnAddMineral').classList.remove('hide');
    event.target.parentNode.parentNode.querySelector('.btnSuppMineral').classList.remove('hide');
    labels.forEach(function (label) {
      if (!label.classList.contains('dontmod')) {
        var _input = document.createElement('input');

        if (label.parentNode.classList.contains('listeQuantites')) {
          _input.setAttribute('type', 'number');
        } else {
          _input.setAttribute('type', 'text');
        }

        if (label.classList.contains('Raffinery')) {
          var select = document.createElement('select');
          select.innerHTML = "\n                    <option>CRU-L1</option>\n                    <option>ARC-L1</option>\n                    <option>ARC-L2</option>\n                    <option>HUR-L1</option>\n                    <option>HUR-L2</option>\n                    <option>MIC-L2</option>                             \n                    ";
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
          _input.classList.add("".concat(label.classList[1]));

          _input.setAttribute('value', "".concat(delUnit(label.innerHTML, 5)));

          label.parentNode.appendChild(_input);
          label.remove();
        }
      }
    });
  }
  /**
     * Si on clique sur le bouton confirmer
     * ca cache le menu déroulant avec les minerai ainsi que les boutons ajouter et supprimer
     * ca transforme les input en label
     * ca cache le bouton confirmer et re affiche le bouton modifier
     */


  if (event.target.classList.contains("btnConfirm")) {
    event.target.parentNode.querySelector('.btnConfirm').classList.add('hide');
    event.target.parentNode.querySelector('.btnModif').classList.remove('hide');
    var inputs = event.target.parentNode.parentNode.querySelectorAll('input');
    inputs.forEach(function (input) {
      var label = document.createElement('label');
      label.classList.add("".concat(input.classList.toString()));

      if (input.parentNode.classList.contains('listeQuantites')) {
        label.classList.add('MineralQuantityLabel');
      }

      if (!label.classList.contains('temprestant')) {
        label.innerHTML = "".concat(input.value, " cSCU");
      } else {
        label.innerHTML = "".concat(input.value);
      }

      input.parentNode.appendChild(label);
      input.remove();
    });
    var raffinerySelect = event.target.parentNode.parentNode.querySelector('.Raffinery');

    var _label = document.createElement('label');

    _label.classList.add("".concat(raffinerySelect.classList.toString()));

    _label.innerHTML = raffinerySelect.value;
    raffinerySelect.parentNode.appendChild(_label);
    raffinerySelect.remove();
    selectMinerai.classList.add('hide');
    event.target.parentNode.parentNode.querySelector('.btnAddMineral').classList.add('hide');
    event.target.parentNode.parentNode.querySelector('.btnSuppMineral').classList.add('hide');
    event.target.parentNode.parentNode.querySelector('.totalJobDiv').innerHTML = "Total: ".concat(calculTotalUnitJob(event.target.parentNode.parentNode));
    var tabTotal = document.querySelector('.tabTotal');
    tabTotal.innerHTML = "Total global cSCU: ".concat(calculTotalUnitGlobal(document.querySelectorAll('.job')));
  }
});
addJobButton.addEventListener("click", function (event) {
  event.preventDefault();
  var numJob = document.querySelectorAll(".job").length + 1;
  var jobHtml =
  /*html*/
  "\n    <div class=\"job job".concat(numJob, "\" id=\"jobId_TOBECHANGED\">\n        <label class=\"titleJob dontmod\">").concat(numJob, "</label>\n\n        <div class=\"mineraisContainer\">\n                    <select class=\"selectMinerai\"> \n                    <option>quantainum</option>\n                    <option>bexalite</option>\n                    <option>taranite</option>\n                    <option>borase</option>\n                    <option>laranite</option>\n                    <option>agricium</option>\n                    <option>hephaestanite</option>\n                    <option>titanium</option>                               \n                    </select>\n                <button class=\"btnAddMineral\">Ajouter</button>\n                <button class=\"btnSuppMineral\">Supprimer</button>\n            <div class=\"mineraisJob\">\n                \n                \n                <div class=\"listeMinerais\">\n                    \n                </div>\n\n                <span class=\"separate\"></span>\n                <div class=\"listeQuantites\">\n                    \n                </div>\n            </div>\n           \n            \n            <label class=\"titreCat dontmod\">Total de ce Raffinage : </label>\n            <div class=\"tabCat totalJobDiv\">\n                0\n            </div>\n        </div>\n        \n        <div class=\"emplacementContainer\">\n            <label class=\"titreCat dontmod\">Emplacement : </label>\n            <div class=\"tabCat\">\n                <select class=\"Raffinery\"> \n                    <option>CRU-L1</option>\n                    <option>ARC-L1</option>\n                    <option>ARC-L2</option>\n                    <option>HUR-L1</option>\n                    <option>HUR-L2</option>\n                    <option>MIC-L2</option>                             \n                </select>\n            </div>\n        </div>\n\n        <div class=\"tempsContainer\">\n            <label class=\"titreCat dontmod\">Temps Restant : </label>\n            <div class=\"tabCat\">\n                <input class=\"temprestant\" type=\"text\">\n            </div>\n        </div>\n\n        <div class=\"btnsContainer\">\n            <button class=\"btnTransport\">Transporter</button>\n            <button class=\"btnModif hide\">Modifier</button>\n            <button class=\"btnConfirm\">Confirmer</button>\n        </div>\n    </div>");
  jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
});
selectFiltre.addEventListener("input", function (e) {
  //console.log(selectFiltre.value);
  var pseudoCont = document.querySelector("#pseudoAct");
  var pseudo = pseudoCont.innerHTML;
  fetchDB(pseudo, selectFiltre.value);
});
/**
 * Fonction qui calcul le total d'unité (cSCU) dans le job donné
 * @param {*} job La div du job
 * @returns Le total d'unité
 */

function calculTotalUnitJob(job) {
  var result = 0;
  var quantityLabels = job.querySelectorAll('.MineralQuantityLabel');
  quantityLabels.forEach(function (value) {
    result += delUnit(value.innerHTML, 5);
  });
  return result;
}

function calculTotalUnitGlobal(jobs) {
  var result = 0;
  jobs.forEach(function (job) {
    result += calculTotalUnitJob(job);
  });
  return result;
}
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
/**
 * fonction fournie par Liduen
 * @param {*} classF 
 * @param {*} e 
 * @returns 
 */


function find(classF, e) {
  var targ = e.target;

  while (!targ.classList.contains(classF)) {
    targ = targ.parentNode;

    if (targ === document.body) {
      break;
    }
  }

  return targ;
}
//# sourceMappingURL=scriptCalc.js.map
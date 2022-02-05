"use strict";

var boutonPlus = document.querySelector('.boutonPlus');
var boutonMoins = document.querySelector('.boutonMoins');
var addButton = document.querySelector('.addButton');
var remButton = document.querySelector('.remButton');
var listeMinerai = document.querySelector('.listeMinerai');
var quantainumTR = document.querySelector('.quantainum');
var lineTabl = document.querySelectorAll('.lineTab');
var jobTR = document.querySelector('.job');
var thJob;
var thJobRes;
/**
 * Ajout de la ligne du minerai selectionné
 */

addButton.addEventListener('click', function (event) {
  var classes = document.querySelectorAll(".".concat(listeMinerai.value));
  classes.forEach(function (value) {
    value.classList.remove('hide');
  });
});
/**
 * Suppression de la ligne du minerai selectionné
 */

remButton.addEventListener('click', function (event) {
  var classes = document.querySelectorAll(".".concat(listeMinerai.value));
  classes.forEach(function (value) {
    value.classList.add('hide');
  });
});
/**
 * Ajout d'une colonne de job
 */

boutonPlus.addEventListener('click', function (event) {
  thJob = document.querySelectorAll('.thJob');
  lineTabl.forEach(function (value) {
    if (value.classList.contains('job')) {
      var newTh = document.createElement('th');

      if (!value.classList.contains('resLine')) {
        newTh.classList.add('thJob');
      } else {
        newTh.classList.add('thJobRes');
      }

      newTh.classList.add("job".concat(thJob.length + 1));
      newTh.innerHTML = "Job ".concat(thJob.length + 1);

      if (!value.classList.contains('resLine')) {
        var button = document.createElement('button');
        button.classList.add('suppbtn');
        button.innerHTML = 'X';
        newTh.appendChild(button);
      }

      value.appendChild(newTh);
    } else {
      var newTd = document.createElement('td');
      newTd.classList.add("job".concat(thJob.length + 1));

      if (value.classList.contains('resLine')) {
        var saisie = document.createElement('H2');
        saisie.innerHTML = '0';
        newTd.appendChild(saisie);
      } else {
        var _saisie = document.createElement('input');

        _saisie.setAttribute('type', 'number');

        _saisie.setAttribute('min', '0');

        newTd.appendChild(_saisie);
      }

      value.appendChild(newTd);
    }
  });
});
jobTR.addEventListener('click', function (event) {
  thJob = document.querySelectorAll('.thJob');

  if (event.target.classList.contains('suppbtn')) {
    var classeDuParent = event.target.parentNode.classList[1];
    var toutLeBordel = document.querySelectorAll(".".concat(classeDuParent));
    toutLeBordel.forEach(function (value) {
      value.remove();
    });
    var count = 1;
    lineTabl.forEach(function (value) {
      var count2 = 1;
      var ths = value.querySelectorAll('th'); // console.warn(ths);     

      ths.forEach(function (vals) {
        console.log(vals);

        if (vals.classList.contains('thJobRes')) {
          vals.className = "";
          vals.classList.add("thJobRes");
          vals.classList.add("job".concat(count2));
          vals.innerHTML = "job ".concat(count2);
        } else {
          vals.className = "";
          vals.classList.add("thJob");
          vals.classList.add("job".concat(count2));
          vals.innerHTML = "job ".concat(count2);
          var button = document.createElement('button');
          button.classList.add('suppbtn');
          button.classList.add("SuppButton".concat(count2));
          button.innerHTML = 'X';
          vals.appendChild(button);
        }

        count2++;
      });
      var tds = value.querySelectorAll('td');
      var count3 = 1;
      tds.forEach(function (vals) {
        if (count3 != 1) {
          vals.className = "";
          vals.classList.add("job".concat(count2));
          count2++;
        }

        count3++;
      });
      count++;
    });
  }
});
//# sourceMappingURL=calc.js.map
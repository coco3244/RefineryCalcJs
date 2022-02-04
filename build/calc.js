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
addButton.addEventListener('click', function (event) {
  document.querySelector(".".concat(listeMinerai.value)).classList.remove('hide');
});
remButton.addEventListener('click', function (event) {
  document.querySelector(".".concat(listeMinerai.value)).classList.add('hide');
});
boutonPlus.addEventListener('click', function (event) {
  thJob = document.querySelectorAll('.thJob');
  lineTabl.forEach(function (value) {
    if (value.classList.contains('job')) {
      var newTh = document.createElement('th');
      newTh.classList.add('thJob');
      newTh.classList.add("job".concat(thJob.length + 1));
      newTh.innerHTML = "Job ".concat(thJob.length + 1);
      var button = document.createElement('button');
      button.classList.add('suppbtn');
      button.innerHTML = 'X';
      newTh.appendChild(button);
      value.appendChild(newTh);
    } else {
      var newTd = document.createElement('td');
      newTd.classList.add("job".concat(thJob.length + 1));
      var saisie = document.createElement('input');
      saisie.setAttribute('type', 'number');
      saisie.setAttribute('min', '0');
      newTd.appendChild(saisie);
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
    console.log(lineTabl);
    var count = 1;
    lineTabl.forEach(function (value) {
      var count2 = 1;

      if (count === 1) {
        var ths = value.querySelectorAll('th');
        ths.forEach(function (vals) {
          vals.className = "";
          vals.classList.add("thJob");
          vals.classList.add("job".concat(count2));
          vals.innerHTML = "job ".concat(count2);
          var button = document.createElement('button');
          button.classList.add('suppbtn');
          button.classList.add("SuppButton".concat(count2));
          button.innerHTML = 'X';
          vals.appendChild(button);
          count2++;
        });
      } else {
        var _ths = value.querySelectorAll('td');

        var count3 = 1;

        _ths.forEach(function (vals) {
          if (count3 != 1) {
            vals.className = "";
            vals.classList.add("job".concat(count2));
            count2++;
          }

          count3++;
        });
      }

      count++;
    });
  }
});
//# sourceMappingURL=calc.js.map
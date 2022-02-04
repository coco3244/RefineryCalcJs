"use strict";

var boutonPlus = document.querySelector('.boutonPlus');
var boutonMoins = document.querySelector('.boutonMoins');
var addButton = document.querySelector('.addButton');
var listeMinerai = document.querySelector('.listeMinerai');
var quantainumTR = document.querySelector('.quantainum');
var lineTabl = document.querySelectorAll('.lineTab');
var jobTR = document.querySelector('.job');
var thJob;
addButton.addEventListener('click', function (event) {
  document.querySelector(".".concat(listeMinerai.value)).classList.remove('hide');
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
    var trList = document.querySelectorAll('.lineTab');
    console.log(trList);
    var count = 1;
    trList.forEach(function (value) {
      var count2 = 1;
      var nodes = value.childNodes;

      if (count === 1) {
        nodes.forEach(function (element) {
          if (element.classList.contains('thJob')) {
            element.removeClass();
            element.classList.add("thJob job".concat(count2));
            element.innerHTML = "Job ".concat(count2);
          }
        });
      } else {}

      count++;
    });
  }
});
//# sourceMappingURL=calc.js.map
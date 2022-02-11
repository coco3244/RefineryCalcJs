"use strict";

var scrollContainer = document.querySelector('.jobsContainer');
var addJobButton = document.querySelector('.addJobCont');
var selectFiltre = document.querySelector("#selectFiltre");
scrollContainer.addEventListener('wheel', function (event) {
  event.preventDefault();
  scrollContainer.scrollLeft += event.deltaY;
});
addJobButton.addEventListener('click', function (event) {
  event.preventDefault();
  var jobsContainer = document.querySelector('.jobsContainer');
  var firstJob = document.querySelector('.job').cloneNode(true);
  firstJob.setAttribute('id', "job".concat(document.querySelectorAll('.job').length + 1));
  firstJob.querySelector('label').innerHTML = document.querySelectorAll('.job').length + 1;
  firstJob.querySelector('.listeMinerais').innerHTML = "";
  firstJob.querySelector('.listeQuantites').innerHTML = "";
  var tabCatList = firstJob.querySelectorAll('.tabCat');
  tabCatList.forEach(function (value) {
    value.innerHTML = "";
  });
  jobsContainer.innerHTML = firstJob.outerHTML + jobsContainer.innerHTML;
});
selectFiltre.addEventListener("input", function (e) {
  console.log(selectFiltre.value);
  var pseudoCont = document.querySelector("#pseudoAct");
  var pseudo = pseudoCont.innerHTML;
  fetchDB(pseudo, selectFiltre.value);
});
//# sourceMappingURL=scriptCalc.js.map
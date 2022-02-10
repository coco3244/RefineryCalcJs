"use strict";

var scrollContainer = document.querySelector('.jobsContainer');
var addJobButton = document.querySelector('.addJobCont');
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
//# sourceMappingURL=scriptCalc.js.map
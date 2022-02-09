"use strict";

var scrollContainer = document.querySelector('.jobsContainer');
scrollContainer.addEventListener('wheel', function (event) {
  event.preventDefault();
  scrollContainer.scrollLeft += event.deltaY;
});
//# sourceMappingURL=scriptCalc.js.map
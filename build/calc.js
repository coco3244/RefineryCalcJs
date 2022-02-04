"use strict";

var div = document.querySelector('.calcTab');
var H1 = document.createElement('H1');
var text;

for (var i = 0; i < 5; i++) {
  text = document.createTextNode("its hell ".concat(i));
  H1.appendChild(text);
  div.appendChild(H1);
}
//# sourceMappingURL=calc.js.map

const div = document.querySelector('.calcTab');
const H1 = document.createElement('H1');

let text;

for (let i = 0; i < 5; i++) {
    text=document.createTextNode(`its hell ${i}`);
    H1.appendChild(text);
    div.appendChild(H1);
    
}


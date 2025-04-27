const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobBtn');
const transportButton = document.querySelector('.transportJobsBtn');
const selectFiltre = document.querySelector("#selectFiltre");
const jobsContainer = document.querySelector(".jobsContainer");
const transportContainer = document.querySelector('.transportContainer');
const totalPanierCont = document.querySelector('.totalPanierCont');
const tabTotal = document.querySelector('.tabTotal');
const xSelect = document.querySelector(".xSelect");
const volumeCheckbox = document.querySelector('.volumeCheckbox');
const customSelect = document.querySelector('.customSelect');
const customFilterData = document.querySelector('.customFilterData');
const logoOOS = document.querySelector(".LogoOOS");

let nextId = -1;
let prixMineraiRefined = {
    "Quantainium"     : [266.43, "#FF2D00"],  // Rouge vif
    "Stileron"        : [337.81, "#007EFF"],  // Bleu vif
    "Riccite"         : [244.97, "#11FF00"],  // Vert fluo
    "Bexalite"        : [74.05,  "#8ED2AD"],  // Vert menthe
    "Taranite"        : [97.89,  "#F4FF00"],  // Jaune citron
    "Gold"            : [63.29,  "#4300FF"],  // Violet électrique
    "Borase"          : [34.19,  "#FF007B"],  // Rose fuchsia
    "Laranite"        : [28.30,  "#421874"],  // Violet profond
    "Recycled"        : [106.82, "#D9FF00"],  // Jaune chartreuse
    "Construction"    : [21.42,  "#CAA800"],  // Or foncé
    "Hephaestanite"   : [25.88,  "#C391FF"],  // Lavande
    "Ice"             : [7.94,   "#507248"],  // Vert mousse
    "Beryl"           : [27.74,  "#184474"],  // Bleu nuit
    "Agricium"        : [26.41,  "#8D4760"],  // Vieux rose
    "Titanium"        : [4.81,   "#00ABA4"],  // Cyan doux
    "Tungsten"        : [6.55,   "#2E8B57"],  // Vert sapin
    "Quartz"          : [3.98,   "#FF8C00"],  // Orange foncé
    "Copper"          : [3.87,   "#6495ED"],  // Bleu clair
    "Iron"            : [4.00,   "#DC143C"],  // Rouge cramoisi
    "Corundum"        : [3.91,   "#00CED1"],  // Bleu sarcelle
    "Aluminum"        : [3.22,   "#FFD700"],  // Or
    "Silicon"         : [2.18,   "#4B0082"],  // Indigo
    "Tin"             : [3.57,   "#9ACD32"],  // Vert jaune clair
    "Diamond"         : [59.18,  "#8B4513"],  // Brun riche
};


let loadMoment;
/**
 * insére "l'heure" du chargement de la page
 */
window.onload = function(){
    loadMoment=new Date();
}
// prout


scrollContainer.addEventListener('wheel',event=>{
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY * 2.99;
    
});

logoOOS.addEventListener("click", e => {
    location.href("");
});
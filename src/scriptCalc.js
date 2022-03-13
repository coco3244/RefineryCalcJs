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

let nextId = -1;
let prixMineraiRefined = {
    "Quantainium" : [88.00,"#FF2D00"],
    "Bexalite" : [40.65,"#007EFF"],
    "Taranite" : [32.58,"#11FF00"],
    "Borase" : [32.58,"#F4FF00"],
    "Laranite" : [31.01,"#4300FF"],
    "Agricium" : [27.50,"#D9FF00"],
    "Hephaestanite" : [14.76,"#FF007B"],
    "Titanium" : [8.93,"#CAA800"],
    "Diamond" : [7.36,"#58B603"],
    "Gold" : [6.40,"#8ED2AD"],
    "Copper" : [5.73,"#184474"],
    "Beryl" : [4.41,"#421874"],
    "Tungsten" : [4.10,"#C391FF"],
    "Corundum" : [2.70,"#8D4760"],
    "Quartz" : [1.56,"#507248"],
    "Aluminum" : [1.33,"#00ABA4"],
    "Inert-Material" : [0.02,"#000000"],
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
    scrollContainer.scrollLeft += event.deltaY;
});
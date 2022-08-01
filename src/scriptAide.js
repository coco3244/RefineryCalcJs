
const labelAide = document.querySelector('.labelAide');
const pagesCont = document.querySelectorAll(".aidePage")
const aideSommaireCont = document.querySelector(".aideSommaireCont");
const aideSommaireH3 = aideSommaireCont.querySelectorAll("h3");
const aidePageNumbersCont = document.querySelector('.aidePageNumbersCont');
const maxPage = pagesCont.length;
let currentPage = 1;

const pages = {
    "Acceuil":1,
    "Raffinage":2,
    "Statistique":3,
    "Transport":4
}

document.addEventListener('keydown',event=>{
    if(!document.querySelector('.aideContainer ').classList.contains('hide')){
        if(event.key=="ArrowRight" && currentPage<maxPage){
            DisplayPage(currentPage+1);
        }
        if(event.key=="ArrowLeft" && currentPage>1){
            DisplayPage(currentPage-1);
        }
    }
    
})

/**
 * Bloque d'initialisation de la pagination création des chiffres et des bouton Précédent / Suivant
 */
const labelPrevious = document.createElement("label");
labelPrevious.innerHTML="Précédent";
labelPrevious.addEventListener('click',event=>{
    if(currentPage>1){
        DisplayPage(currentPage-1);
    }
});
aidePageNumbersCont.appendChild(labelPrevious)


for(let i=1;i<=maxPage;i++){
    const label = document.createElement("label");
    label.innerHTML=i;
    label.addEventListener('click',event=>{
        DisplayPage(label.innerHTML);
    });
    aidePageNumbersCont.appendChild(label);
}

const labelNext = document.createElement("label");
labelNext.innerHTML="Suivant";
labelNext.addEventListener('click',event=>{
    if(currentPage<maxPage){
        DisplayPage(currentPage+1);
    }
});
aidePageNumbersCont.appendChild(labelNext)
/*--------------------------------------------- */
UpdatePaginationNumber()

labelAide.addEventListener('click',event=>{
    const aideContainer = document.querySelector('.aideContainer');
    aideContainer.classList.remove('hide');    
    aideContainer.addEventListener("click", e => {
 
        if (e.target.classList.contains("aideContainer") || e.target.classList.contains("btnCloseAide")) {
            
            aideContainer.classList.add('hide');
        }
    });
})



aideSommaireH3.forEach(h3=>{
    h3.addEventListener('click',event=>{
        console.log(event.target.innerHTML);
        DisplayPage(pages[event.target.innerHTML]);
    });
})


/**
 *Affiche la page pagenumber en retiran la classe hide de ladite page tout en masquant l'ancienne 
 * 
 * @param {*} pagenumber 
 */
function DisplayPage(pagenumber) {
    
    pagesCont.forEach(element => {         
            element.classList.add('hide');                         
            if(element.classList.contains(`page${pagenumber}`)){
                element.classList.remove('hide'); 
            }
    });
    currentPage=pagenumber
    UpdatePaginationNumber();
}

/**
 * Met à jour la pagination, retire la class current à l'ancien et le met a la nouvelle page
 */
function UpdatePaginationNumber() {
    const aidePageNumbersLabel = aidePageNumbersCont.querySelectorAll("label");
    aidePageNumbersLabel.forEach(label=>{
        if(label.classList.contains('current')){
            label.classList.remove('current');
        }
        if(label.innerHTML==currentPage){
      
            label.classList.add('current');
        }
    });
}
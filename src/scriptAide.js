
const labelAide = document.querySelector('.labelAide');
const pagesCont = document.querySelectorAll(".aidePage")
const pageListCont = document.querySelector(".pageListCont");

const aidePageNumbersCont = document.querySelector('.aidePageNumbersCont');
const maxPage = pagesCont.length;
let currentPage = 1;
const pages =[
    ["Acceuil",1],
    ["Statistiques",2],
    ["Transport",3]
]

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
const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobCont');
const customOptions = document.querySelectorAll(".customOptions");
let labelOptions;
customOptions.forEach(item => {
    labelOptions = item.querySelectorAll("label");
})

scrollContainer.addEventListener('wheel',event=>{
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
});

addJobButton.addEventListener('click',event=>{
    event.preventDefault();
    const jobsContainer = document.querySelector('.jobsContainer');
    const firstJob = document.querySelector('.job').cloneNode(true);
    firstJob.setAttribute('id',`job${document.querySelectorAll('.job').length+1}`)
    
    firstJob.querySelector('label').innerHTML=document.querySelectorAll('.job').length+1;
    firstJob.querySelector('.listeMinerais').innerHTML="";
    firstJob.querySelector('.listeQuantites').innerHTML="";

    const tabCatList = firstJob.querySelectorAll('.tabCat');
    tabCatList.forEach(value => {
        value.innerHTML="";
    });
   
    jobsContainer.innerHTML=firstJob.outerHTML+jobsContainer.innerHTML;

});

//faut le bon sélecteur ici :)
labelOptions.forEach(item => {
    item.addEventListener("click", e => {
        console.log(item);
    });
});


const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobCont');
const selectFiltre = document.querySelector("#selectFiltre");

scrollContainer.addEventListener('wheel',event=>{
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
});

addJobButton.addEventListener("click", (event) => {
    event.preventDefault();
    const jobsContainer = document.querySelector(".jobsContainer");
    
    const numJob = document.querySelectorAll(".job").length + 1;
    let jobHtml = /*html*/ `
    <div class="job job${numJob}" id="jobId_TOBECHANGED">
        <label class="titleJob dontmod">${numJob}</label>

        <div class="mineraisContainer">
                    <select class="selectMinerai"> 
                    <option>quantainum</option>
                    <option>bexalite</option>
                    <option>taranite</option>
                    <option>borase</option>
                    <option>laranite</option>
                    <option>agricium</option>
                    <option>hephaestanite</option>
                    <option>titanium</option>                               
                    </select>
                <button class="btnAddMineral">Ajouter</button>
                <button class="btnSuppMineral">Supprimer</button>
            <div class="mineraisJob">
                
                
                <div class="listeMinerais">
                    
                </div>

                <span class="separate"></span>
                <div class="listeQuantites">
                    
                </div>
            </div>
            <label class="titreCat dontmod">Total de ce Raffinage : </label>
            <div class="tabCat">
                0
            </div>
        </div>
        
        <div class="emplacementContainer">
            <label class="titreCat dontmod">Emplacement : </label>
            <div class="tabCat">
                <select class="Raffinery"> 
                    <option>CRU-L1</option>
                    <option>ARC-L1</option>
                    <option>ARC-L2</option>
                    <option>HUR-L1</option>
                    <option>HUR-L2</option>
                    <option>MIC-L2</option>                             
                </select>
            </div>
        </div>

        <div class="tempsContainer">
            <label class="titreCat dontmod">Temps Restant : </label>
            <div class="tabCat">
                <input class="temprestant" type="text">
            </div>
        </div>

        <div class="btnsContainer">
            <button class="btnTransport">Transporter</button>
            <button class="btnModif hide">Modifier</button>
            <button class="btnConfirm">Confirmer</button>
        </div>
    </div>`;
  jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
  const newJob = document.querySelector(`.job${numJob}`);
  
  const selectMinerai = newJob.querySelector('.selectMinerai');
  const listeMineraisDiv = newJob.querySelector('.listeMinerais');
  const listeQuantitesDiv = newJob.querySelector('.listeQuantites');
  

/**
* listener pour ajouter un minerai
* ca cree un label et un input et ca les insère dans leur div correspondante
*/
newJob.querySelector('.btnAddMineral').addEventListener('click',event=>{  
    if(!listeMineraisDiv.querySelector(`.${selectMinerai.value}`)){
        const input = document.createElement('input');
        input.setAttribute('type','number');
        input.classList.add(`${selectMinerai.value}`);
        
        const label = document.createElement('label');
        label.classList.add(`${selectMinerai.value}`);
        label.classList.add(`dontmod`);
        label.innerHTML=`${selectMinerai.value}`;
        
        listeQuantitesDiv.appendChild(input);
        listeMineraisDiv.appendChild(label);
    }
    
    
}); 
/**
* Supprime les minerai des 2 div correspondante
*/
newJob.querySelector('.btnSuppMineral').addEventListener('click',event=>{    
    listeQuantitesDiv.querySelector(`.${selectMinerai.value}`).remove();
    listeMineraisDiv.querySelector(`.${selectMinerai.value}`).remove();   
}); 

/**
* listener du bouton confirmation
* ça confirme la modification
* ca re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
* ca cache le bouton modifier et re affiche le bouton confirmer
*/
newJob.querySelector('.btnModif').addEventListener('click',event=>{  
    
    const labels = newJob.querySelectorAll('label');
    selectMinerai.classList.remove('hide');
    newJob.querySelector('.btnAddMineral').classList.remove('hide');
    newJob.querySelector('.btnSuppMineral').classList.remove('hide');
    
    labels.forEach(label=>{
        
        if(!label.classList.contains('dontmod')){
            const input = document.createElement('input');
            if(label.parentNode.classList.contains('listeQuantites')){
                input.setAttribute('type','number');
            }else{
                input.setAttribute('type','text');
            }
            
            if(label.classList.contains('Raffinery')){
                const select = document.createElement('select');
                select.innerHTML=`
                <option>CRU-L1</option>
                <option>ARC-L1</option>
                <option>ARC-L2</option>
                <option>HUR-L1</option>
                <option>HUR-L2</option>
                <option>MIC-L2</option>                             
                `
                select.classList.add('Raffinery')
                const options = select.querySelectorAll('option');
                const raffinerie = label.innerHTML;
                options.forEach(value=>{
                    if(value.innerHTML===raffinerie){
                        select.value=raffinerie;
                    }
                });
                label.parentNode.appendChild(select)
                label.remove();
            }else{
                input.classList.add(`${label.classList.toString()}`);
                input.setAttribute('value',`${delUnit(label.innerHTML,5)}`)
                label.parentNode.appendChild(input);
                label.remove();
            }
            
        }
    })
    
    const target = event.target.parentNode;
    target.querySelector('.btnConfirm').classList.remove('hide');
    target.querySelector('.btnModif').classList.add('hide');
}); 

/**
  * listener pour la confirmation de modification
  * ca cache le menu déroulant avec les minerai ainsi que les boutons ajouter et supprimer
  * ca transforme les input en label
  * ca cache le bouton confirmer et re affiche le bouton modifier
  */
 newJob.querySelector('.btnConfirm').addEventListener('click',event=>{  
    const target = event.target.parentNode;
    target.querySelector('.btnConfirm').classList.add('hide');
    target.querySelector('.btnModif').classList.remove('hide');
    
    const inputs = newJob.querySelectorAll('input');
    inputs.forEach(input=>{
        const label = document.createElement('label');
        
        label.classList.add(`${input.classList.toString()}`)
        if(!label.classList.contains('temprestant')){
            label.innerHTML=`${input.value} cSCU`;
        }else{
            label.innerHTML=`${input.value}`;
        }
        
        input.parentNode.appendChild(label);
        input.remove();
    })
    
    const raffinerySelect = newJob.querySelector('.Raffinery')
    const label = document.createElement('label');
    console.log(newJob);
    label.classList.add(`${raffinerySelect.classList.toString()}`)
    label.innerHTML=raffinerySelect.value
    raffinerySelect.parentNode.appendChild(label)
    raffinerySelect.remove();

    selectMinerai.classList.add('hide');
    newJob.querySelector('.btnAddMineral').classList.add('hide');
    newJob.querySelector('.btnSuppMineral').classList.add('hide');
}); 

});


selectFiltre.addEventListener("input", e => {
    console.log(selectFiltre.value);
    const pseudoCont = document.querySelector("#pseudoAct");
    const pseudo = pseudoCont.innerHTML;
    fetchDB(pseudo, selectFiltre.value);
})



/**
* fonction fournie par Liduen
* @param {*} numb 
* @param {*} nbUnit 
* @returns 
*/
function delUnit(numb, nbUnit) {
    numb = numb.split("");
    numb.splice((numb.length - nbUnit), nbUnit);
    numb = numb.join("");
    return Number(numb);
}

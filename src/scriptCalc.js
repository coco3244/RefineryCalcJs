const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobCont');
const transportButton = document.querySelector('.transportJobsCont');
const selectFiltre = document.querySelector("#selectFiltre");
const jobsContainer = document.querySelector(".jobsContainer");
const transportContainer = document.querySelector('.transportContainer');
const totalPanierCont = document.querySelector('.totalPanierCont');

scrollContainer.addEventListener('wheel',event=>{
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
});
// on crée le tableau (prixmineraisrefined) et on y rajoute les prix par rapport ah un nom de minerai
    let prixMineraiRefined = {
        "Quantainium" : 88.00,
        "Bexalite" : 40.65,
        "Taranite" : 32.58,
        "Borase" : 32.58,
        "Laranite" : 31.01,
        "Agricium" : 27.50,
        "Hephaestanite" : 14.76,
        "Titanium" : 8.93,
        "Diamond" : 7.36,
        "Gold" : 6.40,
        "Copper" : 5.73,
        "Beryl" : 4.41,
        "Tungsten" : 4.10,
        "Corundum" : 2.70,
        "Quartz" : 1.56,
        "Aluminum" : 1.33,
        "Inert-Material" : 0.02,
    };
jobContainer.addEventListener("click", (event) => {
    const selectMinerai = event.target.parentNode.parentNode.querySelector('.selectMinerai');
    const listeMineraisDiv = event.target.parentNode.parentNode.querySelector('.listeMinerais');
    const listeQuantitesDiv = event.target.parentNode.parentNode.querySelector('.listeQuantites');
    if(event.target.classList.contains("btnAddMineral")) {
        /**
        * listener pour ajouter un minerai
        * ca cree un label et un input et ca les insère dans leur div correspondante
        */                          
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
        
        
    }
    if(event.target.classList.contains("btnSuppMineral")) {
        /**
        * Supprime les minerai des 2 div correspondante
        */                
        listeQuantitesDiv.querySelector(`.${selectMinerai.value}`).remove();
        listeMineraisDiv.querySelector(`.${selectMinerai.value}`).remove();   
        
    }
    /**
    * Si on clique sur le bouton modifier
    * ça confirme la modification
    * ca re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
    * ca cache le bouton modifier et re affiche le bouton confirmer
    */
    if(event.target.classList.contains("btnModif")) {
        
        event.target.parentNode.querySelector('.btnConfirm').classList.remove('hide');
        event.target.parentNode.querySelector('.btnModif').classList.add('hide');
        event.target.parentNode.parentNode.querySelector('.checkBoxDiv').classList.add('hide'); //je cache la div avec la checkbox
        event.target.parentNode.parentNode.querySelector('.checkBoxDiv').querySelector('input').checked=false; //je décoche la checkbox

        const labels = event.target.parentNode.parentNode.querySelectorAll('label');
        selectMinerai.classList.remove('hide');
        event.target.parentNode.parentNode.querySelector('.btnAddMineral').classList.remove('hide');
        event.target.parentNode.parentNode.querySelector('.btnSuppMineral').classList.remove('hide');
        
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
                    input.classList.add(`${label.classList[0]}`);
                    if(!label.classList[1]==='undefined'){
                        input.classList.add(`${label.classList[1]}`);
                    }
                    if(label.classList.contains('temprestant')){
                        
                        input.setAttribute('value',`${label.innerHTML}`);
                    }else{
                        input.setAttribute('value',`${delUnit(label.innerHTML,5)}`)
                    }
                   
                    label.parentNode.appendChild(input);
                    label.remove();
                }
                
            }
        })
        
       
        
    }

     /**
        * Si on clique sur le bouton confirmer
        * ca cache le menu déroulant avec les minerai ainsi que les boutons ajouter et supprimer
        * ca transforme les input en label
        * ca cache le bouton confirmer et re affiche le bouton modifier
        */
    if(event.target.classList.contains("btnConfirm")) {       
        const inputs = event.target.parentNode.parentNode.querySelectorAll('input');
        event.target.parentNode.parentNode.querySelector('.checkBoxDiv').classList.remove('hide');
        let compactecSCU = []; 

        inputs.forEach(input=>{
            let nomMinerai = input.classList.value;
             // on demande "si (if)" découvre Temprestant il ne le prends pas en compte
             if(nomMinerai !== "temprestant" && nomMinerai!=='jobTransportCheckbox dontmod'){
                // appelle des minerais avec la fonction push
               compactecSCU[nomMinerai] = input.value;
           }          
            if(!input.classList.contains('dontmod')){
                const label = document.createElement('label');       
                label.classList.add(`${input.classList.toString()}`)
                if(input.parentNode.classList.contains('listeQuantites')){
                    label.classList.add('MineralQuantityLabel');
                }
                if(!label.classList.contains('temprestant')){
                    
                    label.innerHTML=`${input.value} cSCU`;
                    
                }else{
                    label.innerHTML=`${input.value}`;
                }           
                input.parentNode.appendChild(label);
                input.remove();
            }
        })
         

        let multipliMineraiParPrix = {};  //j'apprends que multipliMineraiParPrix et un tableau
        let totaljob = 0; //j'apprends que totalJob et à 0

        //je demande de dissocier la quantité de minerai du nom du minerai
        for (const minerai in compactecSCU) {
            // je demande de multiplier la quantité de minerai par le prix
            multipliMineraiParPrix[minerai] = Number(compactecSCU[minerai]) * prixMineraiRefined[minerai];
           
            totaljob += multipliMineraiParPrix[minerai];
            multipliMineraiParPrix[minerai] = multipliMineraiParPrix[minerai] + " aUEC ";
        };

        event.target.parentNode.querySelector('.btnConfirm').classList.add('hide');
        event.target.parentNode.querySelector('.btnModif').classList.remove('hide');
        const raffinerySelect = event.target.parentNode.parentNode.querySelector('.Raffinery')
        const label = document.createElement('label');
        
        label.classList.add(`${raffinerySelect.classList.toString()}`)
        label.innerHTML=raffinerySelect.value
        raffinerySelect.parentNode.appendChild(label)
        raffinerySelect.remove();
        selectMinerai.classList.add('hide');
        
        event.target.parentNode.parentNode.querySelector('.btnAddMineral').classList.add('hide');
        event.target.parentNode.parentNode.querySelector('.btnSuppMineral').classList.add('hide');
        event.target.parentNode.parentNode.querySelector('.totalJobDiv').innerHTML=`${calculTotalUnitJob(event.target.parentNode.parentNode)} cSCU | ${totaljob} aUEC`
        
        const tabTotal = document.querySelector('.tabTotal');
        
        tabTotal.innerHTML=`Total global cSCU: ${calculTotalUnitGlobal(document.querySelectorAll('.job'))}`;      
        
    }
});



/**
 * Ajout de l'écoute sur le bouton d'ajout de job
 * cela crée un job de toute piece, l'intègre a gauche ce ceux présent
 * et ajoute les listener sur tout ce qu'il faut
 */
addJobButton.addEventListener("click", (event) => {
    event.preventDefault();
    const numJob = document.querySelectorAll(".job").length + 1;
    let jobHtml = /*html*/ `
    <div class="job job${numJob}" id="jobId_TOBECHANGED">
        <div class="checkBoxDiv hide"> 
            <label class="dontmod">bouh: </label>
            <input class="jobTransportCheckbox dontmod"type="checkbox">
        </div>
    
        <label class="titleJob dontmod">${numJob}</label>

        <div class="mineraisContainer">
                    <select class="selectMinerai"> 
                    <option>Quantainium</option>
                    <option>Bexalite</option>
                    <option>Taranite</option>
                    <option>Borase</option>
                    <option>Laranite</option>
                    <option>Agricium</option>
                    <option>Hephaestanite</option>
                    <option>Diamond</option>
                    <option>Gold</option> 
                    <option>Copper</option> 
                    <option>Beryl</option> 
                    <option>Tungsten</option> 
                    <option>Corundum</option> 
                    <option>Quartz</option> 
                    <option>Aluminum</option> 
                    <option>Inert-Material</option>                                
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
            <div class="tabCat totalJobDiv">
                0
            </div>
        </div>
        
        <div class="emplacementContainer">
            <label class="titreCat dontmod">Emplacement : </label>
            <div class="tabCat">
                <select class="Raffinery"> 
                <option>CRU-L1</option>
                <option>ARC-L1</option>
                <option>HUR-L1</option>
                <option>HUR-L2</option>
                <option>MIC-L1</option>                               
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
            <button class="btnSupprimer">Supprimer</button>
            <button class="btnModif hide">Modifier</button>
            <button class="btnConfirm">Confirmer</button>
        </div>
    </div>`;
  jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
});


transportButton.addEventListener('click',event=>{
    const jobs = jobsContainer.querySelectorAll('.job');
    const jobsResumeCont = transportContainer.querySelector('.jobsResumeCont');
    let mineraisList = []; 

    jobs.forEach(job=>{
        if(job.querySelector('.jobTransportCheckbox').checked){ 
            /**
            * une cascade de IF qui verifie si la 2eme case du queryselector, qui correspond
            * au label avec la quantité n'est pas 'undefined' alors on peut incrémenté
            * la variable correspondante 
            */
            const minerals = job.querySelectorAll('.listeQuantites');
            
            minerals.forEach(mineral=>{

                const labels = mineral.querySelectorAll('label');
                labels.forEach(label=>{                     
                    if(mineraisList[label.classList[0]]=== undefined ){
                        mineraisList[label.classList[0]]=delUnit(label.innerHTML,5);
                    }else{
                        mineraisList[label.classList[0]]+=delUnit(label.innerHTML,5);
                    }         
                   
                })                          
            })         
        }      
    });
    
    jobsResumeCont.innerHTML="";
    let totalcSCU=0;
    let totalaUEC=0;
    for (const minerai in mineraisList) {
        const br = document.createElement('br');
        const label = document.createElement('label');
        totalcSCU+=mineraisList[minerai];
        totalaUEC+=Number(mineraisList[minerai]) * prixMineraiRefined[minerai];
        label.innerHTML=`${minerai}: ${mineraisList[minerai]} cSCU | ${Number(mineraisList[minerai]) * prixMineraiRefined[minerai]}  aUEC`;

        jobsResumeCont.appendChild(label);
        jobsResumeCont.appendChild(br);

    };
    const totalLabel = totalPanierCont.querySelector('.totalLabel');
    totalLabel.innerHTML=`${totalcSCU} cSCU | ${totalaUEC} aUEC`;
    transportContainer.classList.remove('hide');
})

transportContainer.querySelector('.CancelButtonCont').addEventListener('click',event=>{
    transportContainer.querySelectorAll('.job').forEach(job=>{
        job.remove();
    })
    transportContainer.classList.add('hide');
})

selectFiltre.addEventListener("input", e => {
    //console.log(selectFiltre.value);
    const pseudoCont = document.querySelector("#pseudoAct");
    const pseudo = pseudoCont.innerHTML;
    fetchDB(pseudo, selectFiltre.value);
})



/**
 * Fonction qui calcul le total d'unité (cSCU) dans le job donné
 * @param {*} job La div du job
 * @returns Le total d'unité
 */
function calculTotalUnitJob(job){
    let result = 0;
    const quantityLabels = job.querySelectorAll('.MineralQuantityLabel');
    quantityLabels.forEach(value=>{
        
        result+=delUnit(value.innerHTML,5);
    })
    return result;
}

/**
 * Fonction qui prend une liste de jobs et qui calcul les cSCU globaux
 * @param {*} jobs La liste des jobs
 * @returns le compte de tout les cSCU de tout les jobs
 */
function calculTotalUnitGlobal(jobs){
    let result =0;
    jobs.forEach(job=>{
        result+=calculTotalUnitJob(job);
    })
    return result;
}




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
/**
 * fonction fournie par Liduen
 * @param {*} classF 
 * @param {*} e 
 * @returns 
 */
function find(classF, e) {
    let targ = e.target;
    while(!targ.classList.contains(classF)) {
        targ = targ.parentNode;

        if(targ === document.body) {break;}
    } 
    return targ;
}

const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobCont');
const transportButton = document.querySelector('.transportJobsCont');
const selectFiltre = document.querySelector("#selectFiltre");
const jobsContainer = document.querySelector(".jobsContainer");
const transportContainer = document.querySelector('.transportContainer');
const totalPanierCont = document.querySelector('.totalPanierCont');
const tabTotal = document.querySelector('.tabTotal');
const xSelect = document.querySelector(".xSelect");
const volumeCheckbox = document.querySelector('.volumeCheckbox');

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
// on crée le tableau (prixmineraisrefined) et on y rajoute les prix par rapport ah un nom de minerai



// Tracking des boutons dans les Jobs -----------------------------------------
jobsContainer.addEventListener("click", (event) => {
    const jobActuel = find("job", event);

    const selectMineraiCont = jobActuel.querySelector('.selectContainer');
    const selectMinerai = jobActuel.querySelector(".selectMinerai")
    const listeMineraisDiv = jobActuel.querySelector('.listeMinerais');
    const listeQuantitesDiv = jobActuel.querySelector('.listeQuantites');
    const raffinerySelect = jobActuel.querySelector('.Raffinery');
    const bar = jobActuel.querySelector('.tProgress');

    if(event.target.classList.contains("btnAddMineral")) {
        /**
         * listener pour ajouter un minerai
         * ca cree un label et un input et ca les insère dans leur div correspondante
         */

        if(!listeMineraisDiv.querySelector(`.${selectMinerai.value}`)){
            
            // Création du nom du minerais
            const label = document.createElement('label');
            label.classList.add(selectMinerai.value);
            label.innerHTML = selectMinerai.value;
            
            // Création de l'input et du label de valeurs
            const input = document.createElement('input');
            input.setAttribute('type','number');
            input.classList.add(selectMinerai.value);
            input.setAttribute("placeholder", "en cSCU");

            const labelVal = document.createElement("label");
            labelVal.classList.add(selectMinerai.value);
            labelVal.classList.add("hide");

            
            
            listeMineraisDiv.appendChild(label);
            listeQuantitesDiv.appendChild(input);
            listeQuantitesDiv.appendChild(labelVal);
        }     
        
        
    } else if(event.target.classList.contains("btnSuppMineral")) {
        // Supprime les minerai des 2 div correspondante
                     
        if(listeQuantitesDiv.querySelector(`.${selectMinerai.value}`) && listeMineraisDiv.querySelector(`.${selectMinerai.value}`)){
            listeQuantitesDiv.querySelector(`label.${selectMinerai.value}`).remove();
            listeQuantitesDiv.querySelector(`input.${selectMinerai.value}`).remove();   
            listeMineraisDiv.querySelector(`label.${selectMinerai.value}`).remove();   
        }
        
        

    } else if(event.target.classList.contains("btnModif")) {
        /**
        * listener du bouton modifier
        * permet d'entrer en mode modif
        * ça re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
        * ça cache le bouton modifier et re affiche le bouton confirmer
        */

        const labels = jobActuel.querySelectorAll('label');
        
        // On retire les hide de touts les élem d'édition
        jobActuel.querySelector('.btnModif').classList.add('hide');
        jobActuel.querySelector('.btnSupprimer').classList.add('hide');
        jobActuel.querySelector('.btnConfirm').classList.remove('hide');
        jobActuel.querySelector('.btnCancel').classList.remove('hide');
        selectMineraiCont.classList.remove('hide');
        
        // Transformation des labels de valeur en inputs
        labels.forEach(label=>{
            if (findParent("listeQuantites", label) !== 0) {
                // Les valeurs
                const input = label.previousElementSibling;
                input.value = delUnit(label.innerHTML, 5);
                input.classList.remove("hide");
                label.classList.add("hide");

            } else if (findParent("emplacementContainer", label, 2) !== 0) {
                // La localisation
                const select = label.previousElementSibling;
                select.value = label.innerHTML;
                select.classList.remove("hide");
                label.classList.add("hide");
                
            } else if (findParent("tempsContainer", label, 2) !== 0) {
                // Le temps
                if(label.classList.contains('heurePlace')){
                    const heure = jobActuel.querySelector('.heurePlace');
                    const minute = jobActuel.querySelector('.minsPlace');   

                    heure.value = 0;
                    minute.value = 0;
                    bar.style.backgroundColor = "transparent";

                    heure.classList.remove("hide");
                    minute.classList.remove("hide");
                    label.classList.add("hide");
                }else{
                    const input = label.previousElementSibling;
                    input.value = label.innerHTML;
                    input.classList.remove("hide");
                    label.classList.add("hide");
                }
               
                
            } else if(findParent("checkBoxDiv", label) !== 0) {
                // La checkbox
                label.parentNode.classList.add("hide");
            }
        });


    } else if(event.target.classList.contains("btnConfirm")) {       
        /**
           * Si on clique sur le bouton confirmer
           * ça cache le menu déroulant avec les minerai ainsi que les boutons ajouter et supprimer
           * ça transforme les input en label
           * ça cache le bouton confirmer et re affiche le bouton modifier
           */
        const inputs = jobActuel.querySelectorAll('input');
        
        let tabInsert = {};
        let iVide = false;
        let tVide = false;
        
        // On vérifie qu'il n'y a pas d'input vide
        inputs.forEach(input => {
            if (input.parentNode.classList.contains("tabCat") && input.value === "") {
                tVide = true;
            } else if (input.value === "") {
                iVide = true;
            }
        });

        // Si il y a des champs vide, on les suppr, ou pas :)
        let confirmDel = false;
        if (iVide === true) {
            confirmDel = window.confirm("Vous laissez des champs vides ! Voulez vous les supprimer ?");

            if (confirmDel === true) {
                inputs.forEach(input => {
                    if (input.value === "") {
                        let classe = input.classList[0];
                        const toRem = jobActuel.querySelectorAll(`.${classe}`);
                        toRem.forEach(item => {
                            item.remove();
                        });
                    }
                });
            } 
        }

        //Si le champ de temps est vide, on le signale
        if (tVide === true) {
            alert("Vous devez définir le temps restant !");
        }

        if (iVide === false && tVide === false) {
            let timeInit = new Date();
            let timeRemain = new Date();
            const labelT = jobActuel.querySelector("label.heurePlace");

            // Réaffichage de la checkbox
            jobActuel.querySelector('.checkBoxDiv').classList.remove('hide');
            if(jobActuel.querySelector('.minsPlace').value>59){
                alert("t'as déja vu des minutes au dessus de 59 toi ?");
                return;
            }
            // Boucle pour switcher l'affichage des inputs aux labels
            inputs.forEach(input => {
                if (!input.classList.contains("jobTransportCheckbox") && !input.classList.contains('heurePlace') && !input.classList.contains('minsPlace')) {
                    // console.log(input);
                    const label = input.parentNode.querySelector("label." + input.classList[0]);
                    let nomMinerai = input.classList.value;
                            
                    // Insertion dans le tab pour la bdd
                    tabInsert[input.className] = input.value;
                    
                    // on demande "si (if)" découvre Temprestant il ne le prends pas en compte
                    if(nomMinerai !== "temprestant" && nomMinerai !== 'jobTransportCheckbox'){
                        // appelle des minerais avec la fonction push
                        compactecSCU[nomMinerai] = input.value;
                    }   
        
                    // Extraction des valeurs des inputs pour les mettre dans les labels
                    if(input.parentNode.classList.contains('listeQuantites')){
                        label.classList.add('MineralQuantityLabel');
        
                        label.innerHTML=`${input.value} cSCU`;
                        input.classList.add("hide");
                        label.classList.remove("hide");

                        // Insertion dans le tab pour la bdd
                        tabInsert[input.classList[0]] = input.value;

                    } else if(input.classList.contains("heurePlace")) {
                        // Pour la bdd
                        let hoursRest = timeRemain.getHours();
                        hoursRest += Number(input.value);
                        timeRemain.setHours(hoursRest);

                        // Pour l'affichage
                        hours = input.value;
                        if(hours.length < 2) {hours = `0${hours}`;}

                        input.classList.add("hide");
                        labelT.innerHTML = hours; // temporaire
                        
                    } else if(input.classList.contains("minsPlace")) {
                        // Pour la bdd
                        let minRest = timeRemain.getMinutes();
                        minRest += Number(input.value);
                        timeRemain.setMinutes(minRest);

                        // Pour l'affichage
                        let min = input.value;
                        if(min.length < 2) {min = `0${min}`;}
                        bar.style.width = "0%";

                        input.classList.add("hide");
                        labelT.classList.remove("hide");
                        labelT.innerHTML += `:${min}:00`; // temporaire

                    } 
                }
            });
            
            //On cache et fait rapparaitre les btns du bas qu'il faut
            jobActuel.querySelector(".btnCancel").classList.add('hide');
            jobActuel.querySelector('.btnConfirm').classList.add('hide');
            jobActuel.querySelector('.btnModif').classList.remove('hide');
            jobActuel.querySelector('.btnSupprimer').classList.remove('hide');


            // Calculs Okaaa
            let multipliMineraiParPrix = {};  //j'apprends que multipliMineraiParPrix et un tableau
            let totaljob = 0; //j'apprends que totalJob et à 0
            
            // Insertion dans le tab pour la bdd
            tabInsert[raffinerySelect.className] = raffinerySelect.value;
            let idJob = jobActuel.id.split("_");
            tabInsert["idJob"] = idJob[1];
            tabInsert["heurePlace"] = Date.parse(timeInit);
            tabInsert['tRestant'] = Date.parse(timeRemain);

            // Remplacement du select par son label
            const label = jobActuel.querySelector('label.' + raffinerySelect.classList[0]);
            label.innerHTML = raffinerySelect.value;
            label.classList.remove("hide");

            // On cache les selects et autres btns de modif
            raffinerySelect.classList.add('hide');
            selectMineraiCont.classList.add('hide');

            if (jobActuel.classList.contains("newJob")) {
                jobActuel.classList.remove("newJob");
            }
            
            // Calcul des totaux
            initiateCalculateValue();
            
            // Insertion dans la bdd
            insertNewJob(tabInsert);

            const TotalcSCUByMineral = calcPercentage(document.querySelector('.tabMineraisTable'),document.querySelectorAll('.job'));

            refreshPercentageColorBar(document.querySelector('.tabMineraisTable'),document.querySelector('.pourcentageTotalMainCont'),document.querySelectorAll('.job'),TotalcSCUByMineral);
            
            
        }
    } else if(event.target.classList.contains("btnSupprimer")) {
        const title = jobActuel.querySelector(".titleJob");
        let numJ = title.innerHTML;
       

        let msg = `Etes-vous sûr de vouloir supprimer le raffinage n°${numJ} ? Cette action est irréversible.`;

        if(window.confirm(msg)) {
            delJob(jobActuel);                   
        }
        

    } else if(event.target.classList.contains("btnCancel")) {
        /**
         * Tracking du bouton Annuler, si c'est un job qui vient d'être créé, je job est supprimé, sinon il est remis à l'état où il était avant la modif.
         */

        if (jobActuel.classList.contains("newJob")) {
            jobActuel.remove();

        } else {
            const inputs = jobActuel.querySelectorAll("input");
            
            // On boucle pour cacher tout les inputs et afficher leurs labels
            inputs.forEach(input => {
                if (input.parentNode.classList.contains("listeQuantites")) {
                    const label = input.parentNode.querySelector("label." + input.classList[0]);

                    input.value = delUnit(label.innerHTML, 5);

                    input.classList.add("hide");
                    label.classList.remove("hide");

                } else if(input.classList.contains("heurePlace")) {
                    const label = input.parentNode.querySelector("label.heurePlace");
                    const iMin = input.parentNode.querySelector("input.minsPlace");

                    bar.style.backgroundColor = "";
                    label.classList.remove("hide");
                    input.classList.add("hide");
                    iMin.classList.add("hide");
                }
            });

            // Remplacement du select par son label
            const label = jobActuel.querySelector('label.' + raffinerySelect.classList[0]);
            label.innerHTML = raffinerySelect.value;
            label.classList.remove("hide");

            // On cache les selects et autres btns de modif
            raffinerySelect.classList.add('hide');
            selectMineraiCont.classList.add('hide');

            // On cache et fait rapparaitre les btns du bas qu'il faut
            jobActuel.querySelector(".btnCancel").classList.add('hide');
            jobActuel.querySelector('.btnConfirm').classList.add('hide');
            jobActuel.querySelector('.btnModif').classList.remove('hide');
            jobActuel.querySelector('.btnSupprimer').classList.remove('hide');

        }

    }else if(event.target.classList.contains("jobTransportCheckbox")){
        let checkedJob=[];
        const pourcentagecont = document.querySelector('.pourcentageMainCont');
        const tabSelectedMineraisTable = document.querySelector('.tabSelectedMineraisTable')
        document.querySelectorAll('.job').forEach(job=>{
            if(job.querySelector('.jobTransportCheckbox').checked){
                checkedJob.push(job);
            }
        })
        const TotalcSCUByMineral = calcPercentage(tabSelectedMineraisTable,checkedJob);
        refreshPercentageColorBar(tabSelectedMineraisTable,pourcentagecont,checkedJob,TotalcSCUByMineral);
        
    }
});

function refreshPercentageColorBar(meneraiTab,pourcentagecont,jobs,TotalcSCUByMineral){

    const tbody = meneraiTab.querySelector('tbody');
    const trs = tbody.querySelectorAll('tr');
    pourcentagecont.innerHTML=""
        trs.forEach(tr=>{
           if(tr.classList.length!=0){                   
                const percentageDiv = document.createElement('div');     
                percentageDiv.classList.add('pourcentagecont');
                percentageDiv.style.backgroundColor=`${prixMineraiRefined[tr.classList[0]][1]}`;
                percentageDiv.setAttribute('title',`${tr.classList[0]}: ${TotalcSCUByMineral[tr.classList[0]]} cSCU`)
                const td = document.createElement('td');

                td.style.backgroundColor=`${prixMineraiRefined[tr.classList[0]][1]}`;
                td.style.paddingLeft='5px';
                tr.appendChild(td);
                percentageDiv.style.width = `${delUnit(tr.querySelector(`.${tr.classList[0]}tdPercentageValue`).innerHTML,2)-0.1}%`;
                pourcentagecont.appendChild(percentageDiv);
            }
            
        })

}

/**
 * Ajout de l'écoute sur le bouton d'ajout de job
 * cela crée un job de toute piece, l'intègre a gauche ce ceux présent
 * et ajoute les listener sur tout ce qu'il faut
 */
addJobButton.addEventListener("click", (event) => {
    event.preventDefault();
    const numJob = document.querySelectorAll(".job").length + 1;

    getNextId();

    let jobHtml = /*html*/ `
    <div class="job job${numJob} newJob" id="jobId_${nextId}">
        <div class="checkBoxDiv hide"> 
            <input class="jobTransportCheckbox"type="checkbox">
        </div>

        <label class="titleJob">${numJob}</label>

        <div class="mineraisContainer">
            <div class="selectContainer">
                <select class="selectMinerai"> 
                    <option>Quantainium</option>
                    <option>Bexalite</option>
                    <option>Taranite</option>
                    <option>Borase</option>
                    <option>Laranite</option>
                    <option>Agricium</option>
                    <option>Hephaestanite</option>
                    <option>Titanium</option>    
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
            </div>

            <div class="mineraisJob">
                <div class="listeMinerais">
                    
                </div>
                <span class="separate"></span>
                <div class="listeQuantites">
                    
                </div>
            </div>
            
            <label class="titreCat">Total de ce Raffinage : </label>
            <div class="tabCat totalJobDiv">
                0
            </div>
        </div>
        
        <div class="emplacementContainer">
            <label class="titreCat">Emplacement : </label>
            <div class="tabCat">
                <select class="Raffinery"> 
                    <option>CRU-L1</option>
                    <option>ARC-L1</option>
                    <option>HUR-L1</option>
                    <option>HUR-L2</option>
                    <option>MIC-L1</option>          
                </select>
                <label class="Raffinery"></label>
            </div>
        </div>

        <div class="tempsContainer">
            <label class="titreCat">Temps Restant : </label>
            <div class="tabCat">
                <span class="tProgress"></span>
                <input class="heurePlace" max=999 placeholder="heures"  type="number" value=0>  
                <input class="minsPlace" max=59 placeholder="minutes" type="number" value=0>
                <label class="heurePlace hide"></label>
            </div>
        </div>

        <div class="btnsContainer">
            <button class="btnCancel">Annuler</button>
            <button class="btnSupprimer hide">Supprimer</button>
            <button class="btnModif hide">Modifier</button>
            <button class="btnConfirm">Confirmer</button>
        </div>
    </div>`;
    jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
});

/** Insertion dans la bdd à l'ajout d'un job
 * @param {*} tabInsert Le tableau contenant les vasleurs à insérer
 */
function insertNewJob(tabInsert) {
    const pseudo = getPseudo();
    tabInsert.fk_idUser = pseudo;

    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async: false,
        data: {newInsert : tabInsert},
        success: function(res) {
            //console.log(res);
        }
    });
}

function delJob(jobActuel) {
    let idJob = jobActuel.id.split("_");
    idJob = idJob[1];
    
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async: false,
        data: {"delLine" : idJob},
        success: function(res) {
            //console.log(res);
            jobActuel.remove(); 
               
        }
    });
    
    //reset du numéro de chaque job mais pas de l'id !!
    const jobs = jobsContainer.querySelectorAll(".job");
    let i = jobs.length;
    jobs.forEach(job => {
        const titleJob = job.querySelector(".titleJob");
        titleJob.innerHTML = i;
        i--;
    });

    // Calcul des totaux
    initiateCalculateValue();
}

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
                        mineraisList[label.classList[0]]=Number(delUnit(label.innerHTML,5));
                    }else{
                        mineraisList[label.classList[0]]+=Number(delUnit(label.innerHTML,5));
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
        totalcSCU+= Number(mineraisList[minerai]);
        totalaUEC+= Number(mineraisList[minerai]) * Number(prixMineraiRefined[minerai][0]);
        label.innerHTML=`${minerai}: ${mineraisList[minerai]} cSCU | ${mineraisList[minerai] * prixMineraiRefined[minerai][0]}  aUEC`;

        jobsResumeCont.appendChild(label);
        jobsResumeCont.appendChild(br);

    };
    
    
   
    /**
     * Je creer une tableau de tableau, le tableau interne :
     * l'indice 0 le nom du vaisseau
     * l'indice 1 la capacité de cargo
     * l'indice 2 le lien dudis vaisseau sur le site de RSI
     * /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ 
     * C EST TEMPORAIRE, L'ORSQUE QUE LE TABLEAU SERA GéNéRé VIA BDD CA SERA LUI QUI PRENDRA LE RELAIS DANS L AFFICHAGE
     * JE N AI VOLONTAIREMENT PAS MIS TOUT LES VAISSEAUX PRéSENT DANS L APPLI INITIAL PAR FLEMME CAR CA SERA CHANGé APRèS
     */
    let ships = [ 
        ["600i Touring",1600,"https://robertsspaceindustries.com/pledge/ships/600i/600i-Touring"],
        ["600i Explorer",4000,"https://robertsspaceindustries.com/pledge/ships/600i/600i-Explorer"],
        ["Hammerhead",4000,"https://robertsspaceindustries.com/pledge/ships/hammerhead/Hammerhead"],
        ["Mercury Star Runner",11400,"https://robertsspaceindustries.com/pledge/ships/crusader-mercury-star-runner/"],
        ["C2 Hercules",69600,"https://robertsspaceindustries.com/pledge/ships/crusader-starlifter/C2-Hercules"]
    ]
    let images={
        "600i Touring":"https://robertsspaceindustries.com/media/7yex5ptnfxerer/store_small/600i_beach_03.jpg",
        "600i Explorer":"https://media.robertsspaceindustries.com/nsl0zel8gmfxl/store_small.jpg",
        "Hammerhead":"https://media.robertsspaceindustries.com/93zcfnzsy6xnu/store_small.png",
        "Mercury Star Runner":"https://robertsspaceindustries.com/media/k8z9y4skemjncr/store_slideshow_large/Crusader-Three-Quater-Updated.png",
        "C2 Hercules": "https://media.robertsspaceindustries.com/iohxx8vfa9hbh/store_small.jpg"
    }
    const vaisseauxListCont = transportContainer.querySelector('.vaisseauxListCont');
    
    const vaisseauxPhotoCont = transportContainer.querySelector('.vaisseauxPhotoCont');
    const totalLabel = totalPanierCont.querySelector('.totalLabel');
    totalLabel.innerHTML=`${totalcSCU} cSCU | ${totalaUEC} aUEC`;

    vaisseauxListCont.innerHTML=`<table class="vaisseauxListTable">
                    <tr>
                        <th>Vaisseau</th>
                        <th>Capacité cargo</th>
                        <th>Cargo restant</th>
                    </tr>

                </table>`;
    const vaisseauxListTable = vaisseauxListCont.querySelector('.vaisseauxListTable');
    ships.forEach(ship=>{
        if(ship[1]>=totalcSCU){
            const tr = document.createElement('tr');
            const tdShip = document.createElement('td');
            const tdShipCargo = document.createElement('td');
            const tdShipCargoLeft = document.createElement('td');
            tr.classList.add('vaisseau');
            tdShip.innerHTML=`<a target="_blank "href="${ship[2]}">${ship[0]}</a>`;
            tdShipCargo.innerHTML=` ${ship[1]} cSCU`;
            tdShipCargoLeft.innerHTML=`${ship[1]-totalcSCU} cSCU`;

            const link = tdShip.querySelector('a');
            link.addEventListener('mouseover',event=>{
                const image = document.createElement('img');
                image.setAttribute('src',images[event.target.innerHTML]);
                vaisseauxPhotoCont.innerHTML="";
                vaisseauxPhotoCont.appendChild(image);

            })
            tr.appendChild(tdShip);
            tr.appendChild(tdShipCargo);
            tr.appendChild(tdShipCargoLeft);
            
            
            vaisseauxListTable.appendChild(tr);
            
        }
    })
    
    const vaisseauxTr = vaisseauxListTable.querySelectorAll('.vaisseau');
    //console.log(vaisseauxTr);
    if(vaisseauxTr.length==0){
        alert('Ta cargaison est trop volumineuse même pour le plus gros de tes ship !');
        return;
    }
    if(volumeCheckbox.checked==true){
        var audio = new Audio('./audio/Boing.mp3');   
        audio.volume=0.1;   
        audio.play();
    }
    transportContainer.classList.remove('hide');
})

//Fermeture de la fenêtre de transport
transportContainer.addEventListener("click", e => {
    const target = e.target;
    if (target.classList.contains("transportContainer") || target.classList.contains("bntCancelTransport")) {
        transportContainer.querySelectorAll('.job').forEach(job=>{
            job.remove();
        }); 
        transportContainer.classList.add('hide');
    }
    if(target.classList.contains('btnValidateTransport') && window.confirm("Es tu sur de vouloir valider le transport ?")){

        const jobs = jobsContainer.querySelectorAll('.job');

        jobs.forEach(job=>{
            if(job.querySelector('.jobTransportCheckbox').checked){ 
                delJob(job);
            }
        });
        transportContainer.classList.add('hide');

    }
}); 

// Update du Filtre -----------------------------------------------------------
selectFiltre.addEventListener("input", inputSelect);
function inputSelect() {
    //console.log(selectFiltre.value);
    const pseudo = getPseudo();
    //console.log("here");
    if (connected === true) {
        fetchDB(pseudo, selectFiltre.value);
    }
}

xSelect.addEventListener("click", () => {
    selectFiltre.value = "";
    inputSelect();
});

const statLabel = document.querySelector('.labelStat');

statLabel.addEventListener('click',event=>{
    const statistiqueContainer = document.querySelector('.statistiqueContainer');
    statistiqueContainer.classList.remove('hide');

    statistiqueContainer.addEventListener("click", e => {
        //console.log(e.target);
        if (e.target.classList.contains("statistiqueContainer") || e.target.classList.contains("btnCloseStat")) {

            statistiqueContainer.classList.add('hide');
        }
    });
})

const labelFlotte = document.querySelector('.labelFlotte');

labelFlotte.addEventListener('click',event=>{
    const flotteContainer = document.querySelector('.flotteContainer');
    flotteContainer.classList.remove('hide');

    flotteContainer.addEventListener("click", e => {
        //console.log(e.target);
        if (e.target.classList.contains("flotteContainer") || e.target.classList.contains("btnCloseFlotte")) {

            flotteContainer.classList.add('hide');
        }
    });
})

const labelAide = document.querySelector('.labelAide');

labelAide.addEventListener('click',event=>{
    const aideContainer = document.querySelector('.aideContainer');
    aideContainer.classList.remove('hide');

    aideContainer.addEventListener("click", e => {
        //console.log(e.target);
        if (e.target.classList.contains("aideContainer") || e.target.classList.contains("btnCloseAide")) {

            aideContainer.classList.add('hide');
        }
    });
})

/**
 * Fonctions qui décrémente de X minute le temps d'une liste de job
 * @param {*} jobs la liste des jobs
 * @param {*} nbmin nombre de minute a décrémenté
 */
function xMinutesLessJobsList(jobs,nbmin){
    nbmin=Math.abs(nbmin);
    jobs.forEach(job=>{     
        xMinutesLessJob(job,nbmin);
    })
}
/**
 * Fonction qui décrémente de 1 minute le temps de un job 
 * @param {*} job un job
 * @param {*} nbmin nombre de minute a décrémenté
 */
function xMinutesLessJob(job,nbmin){
    nbmin=Math.abs(nbmin);
   
    const heurePlace = job.querySelector('label[class=heurePlace]');
        const time = heurePlace.innerHTML.split(' : '); 
        
        if(nbmin<=time[1]){ //si les minutes a enlevé sont inférieur au minutes actuellement écrite
            time[1]-=nbmin;

        }else if (nbmin>59){
            let heureMoin = Math.round(nbmin/60);
            let minRest = nbmin%60;
            if(heureMoin<=time[0]){
                time[0]-=heureMoin;
            }else{
                time[0]=0;
            }

            if(minRest<time[1]){
                time[1]-=minRest;
            }else{
                time[1]=0;
            }
            
        }else{
            nbmin-=time[1];

        }
       
        heurePlace.innerHTML=`${time[0]} : ${time[1]}`;
}




/** ---------------------------------------------------------------------------
 * Fonction qui calcule le total d'unités (cSCU) dans le job donné
 * @param {*} job La div du job
 * @returns Le total d'unité
 */
function calculTotalUnitJob(job){
    let result = 0;
        const quantityLabels = job.querySelectorAll('.MineralQuantityLabel');
        
        quantityLabels.forEach(value=>{    
           // console.log(value);     
            result+=Number(delUnit(value.innerHTML,5));
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
        result+=Number(calculTotalUnitJob(job));
    })
    return result;
}

/**
 * calcul la valeur en aUEC du job en parametre
 * @param {*} job un job
 * @returns le total du job
 */
function calculTotalPriceJob(job){
   
    const confButton = job.querySelector('.btnConfirm');
    if(confButton.classList.contains('hide')){     
        const totalLabels = job.querySelector('.totalJobDiv'); 
        const totalLabelsTab = totalLabels.innerHTML.split(' | ');
        return Number(delUnit(totalLabelsTab[1],5).replace(/\s/g, ''));;
    }else{
        return 0;
    }
    
}

/**
 * calcul le total en aUEC du job
 * @param {*} jobs liste de job
 * @returns le total du prix de tout les jobs
 */
function calculTotalPriceGlobal(){
    const jobs=document.querySelectorAll('.job')
    let result=0

    jobs.forEach(job=>{
        result+=calculTotalPriceJob(job);
       
    })
    
    return result;

}

/**
 * Fonction qui va update le temps restant des labels qui en ont besoin à chaque secondes
 */
setInterval(updateTime, 1000);
function updateTime() {
    
    const jobs = jobsContainer.querySelectorAll(".job");
    jobs.forEach(jobAct => {
        const tProgress = jobAct.querySelector(".tProgress");

        if (Number(delUnit(tProgress.style.width, 1)) !== 100 && tProgress.style.width !== "") {
            const label = jobAct.querySelector("label.heurePlace");
            const bar = label.parentNode.querySelector(".tProgress");
            let time = label.innerHTML.split(":");
            
            // Calcul de pourcentage pour la barre de progression
            let percentBase = Number(delUnit(bar.style.width, 1));
            percentBase = 100 - percentBase;
            let valPart = 0;
            valPart += Number(time[2]);
            valPart += Number(time[1]) * 60;
            valPart += Number(time[0]) * 3600;
            let pTotal = (valPart * 100) / percentBase;
            
            // Récup du texte du label et décrémentation du temps
            time[2] = Number(time[2]) - 1;
            if (time[2] < 0) {
                time[1] = Number(time[1]) - 1;
                time[2] = 59;

                if (time[1] < 0) {
                    time[0] = Number(time[0]) - 1;
                    time[1] = 59;
                }
            }

            // Vérif de s'il y a un nombre sans son 0 (9 et pas 09)
            for (let i = 0; i < time.length; i++) {
                time[i] = String(time[i]);
                if (time[i].length < 2) {
                    time[i] = "0" + String(time[i])
                }
            }

            // Vérif si c'est fini ou pas
            if (time[0] === '00' && time[1] === '00' && time[2] === '00') {
                label.innerHTML = "Terminé !";
                bar.style.width = "100%";
                bar.style.backgroundColor = "#05c14ea3";

            } else {
                // Progression de la barre via calcul de pourcentage
                let valPart2 = 0;
                valPart2 += Number(time[2]);
                valPart2 += Number(time[1]) * 60;
                valPart2 += Number(time[0]) * 3600;
                let nextPercent = (valPart2 * 100) / pTotal;
                nextPercent = 100 - nextPercent;

                // Affichage
                label.innerHTML = time.join(":");
                bar.style.width = nextPercent + '%';
            }
        }
    });
}


// Fonctions d'automatisation -------------------------------------------------
/**
* Fonction permettant de retirer @nbUnit de 
* @param {*} string La chaine de 
* @param {int} nbUnit 
* @returns 
*/
function delUnit(string, nbUnit) {
    string = string.split("");
    string.splice((string.length - nbUnit), nbUnit);
    string = string.join("");
    return string;
}


/**
 * fonction fournie par Liduen
 * @param {*} classF La classe qu'on recherche sur le parent
 * @param {*} e L'event
 * @returns Le noeud parent si elle le trouve, sinon 0
 */
function find(classF, e) {
    let targ = e.target;
    while(!targ.classList.contains(classF)) {
        targ = targ.parentNode;

        if(targ === document.body) {break;}
    } 
    return targ;
}


/** Fonction permettant de vérifier qu'un élément à bien un parent contenant @classF
 * @param classF La classe qu'on recherche sur le parent
 * @param elem L'enfant à partir duquel vous faites la recherche
 * @param {int} numParent Optionnel : mettez un Nombre si vous savez de combien de noeuds remonter
 * @returns Le noeud parent si elle le trouve, sinon 0
 */
function findParent(classF, elem, numParent) {
    let targ = elem;

    if(numParent === undefined) {
        while(!targ.classList.contains(classF)) {
            targ = targ.parentNode;
            
            if(targ === document.body) {
                targ = 0;
                break;
            }
        } 
        
    } else {
        for (let i = 0; i < numParent; i++) {
            targ = targ.parentNode;
    
            if(targ === document.body) {
                targ = 0;
                break;
            }
        }
        if (!targ.classList.contains(classF)) {
            targ = 0;
        }

    }
    return targ;
}


/**
 * Fonction qui set le prochain id à mettre sur un nouveau Job sur nextId
 */
function getNextId() {
    const pseudo = getPseudo();
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async: false,
        data: "nextId",
        success: function(res) {
            res = JSON.parse(res)
            let previousId = nextId;
            let tmpId = Number(res["MAX(idJob)"]) + 1;
            if (tmpId <= previousId) {
                nextId = previousId + 1;
            } else {
                nextId = tmpId;
            }
        }
    });
}

function calcPercentage(tabMineraisTable, jobs){
             /**
             * Partie de calcul des pourcentages
             */
         
     tabMineraisTable.innerHTML=`<tr>
     <th>Minerais</th>
     <th>% de la cargaison +/-</th>
     <th>aUEC +/-</th>
     </tr>`;
     const totalcSCU = calculTotalUnitGlobal(jobs);
     //const totalaUEC = calculTotalPriceGlobal(document.querySelectorAll('.job'));
     let TotalcSCUByMineral = [];
     
    jobs.forEach(job=>{
        const listeQuantiteAll = job.querySelectorAll('.listeQuantites');
        listeQuantiteAll.forEach(listeMinerai=>{
            const labels = listeMinerai.querySelectorAll('label');
   
            labels.forEach(label=>{
                if(TotalcSCUByMineral[label.classList[0]]==undefined){
                    TotalcSCUByMineral[label.classList[0]]=Number(delUnit(label.innerHTML, 5));
                }else{
                    TotalcSCUByMineral[label.classList[0]]+=Number(delUnit(label.innerHTML, 5)); 
                }
            })
   
        })
    })
     for(const minerai in TotalcSCUByMineral){
         const tr = document.createElement('tr');
         tr.classList.add(`${minerai}`);
         tr.classList.add(`TrPercentage`);
         const tdMinerai = document.createElement('td');
         tdMinerai.classList.add(`${minerai}tdPercentageName`)
         const tdPourcentage = document.createElement('td');
         tdPourcentage.classList.add(`${minerai}tdPercentageValue`)
         const tdValeur = document.createElement('td');
         tdValeur.classList.add(`${minerai}tdPercentageAUEC`)

         tdMinerai.innerHTML=minerai;
         tdPourcentage.innerHTML = `${parseFloat(((100*TotalcSCUByMineral[minerai])/totalcSCU)).toFixed(2)} %`;
         tdValeur.innerHTML = `${Math.round(TotalcSCUByMineral[minerai]*prixMineraiRefined[minerai][0])}`;
         tr.appendChild(tdMinerai);
         tr.appendChild(tdPourcentage);
         tr.appendChild(tdValeur);
         tabMineraisTable.querySelector('tbody').appendChild(tr);

     }
     return TotalcSCUByMineral;
}

/**
 * Fonction qui retourne le pseudo actuel
 * @returns le pseudo
 */
function getPseudo() {
    const pseudo = document.querySelector("#pseudoAct").innerHTML;
    return pseudo;
}

function separateur_nombre (nbr) {
    let string;
    let caractere = [];

    string = String(nbr);

    compteurSecondaire=0

    caractere = string.split('');

    for (let i = caractere.length; i > 0 ; i--) {

        if (compteurSecondaire == 3){

            compteurSecondaire = 0;
            caractere.splice (i, 0, ' ');
        }
        compteurSecondaire++;
    }

    caractere = caractere.join('');

    return caractere;
}
const scrollContainer = document.querySelector('.jobsContainer');
const addJobButton = document.querySelector('.addJobCont');
const transportButton = document.querySelector('.transportJobsCont');
const selectFiltre = document.querySelector("#selectFiltre");
const jobsContainer = document.querySelector(".jobsContainer");
const transportContainer = document.querySelector('.transportContainer');
const totalPanierCont = document.querySelector('.totalPanierCont');
const tabTotal = document.querySelector('.tabTotal');
const xSelect = document.querySelector(".xSelect");

let nextId = -1;



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


// Tracking des boutons dans les Jobs -----------------------------------------
jobsContainer.addEventListener("click", (event) => {
    const jobActuel = find("job", event);

    const selectMineraiCont = jobActuel.querySelector('.selectContainer');
    const selectMinerai = jobActuel.querySelector(".selectMinerai")
    const listeMineraisDiv = jobActuel.querySelector('.listeMinerais');
    const listeQuantitesDiv = jobActuel.querySelector('.listeQuantites');

    if(event.target.classList.contains("btnAddMineral")) {
        /**
         * listener pour ajouter un minerai
         * ca cree un label et un input et ca les insère dans leur div correspondante
         */

        if(!listeMineraisDiv.querySelector(`.${selectMinerai.value}`)){
            const input = document.createElement('input');
            
            input.setAttribute('type','number');
            input.classList.add(selectMinerai.value);
            input.requiered = true;

            const label = document.createElement('label');
            label.classList.add(selectMinerai.value);
            label.innerHTML = selectMinerai.value;
            
            listeQuantitesDiv.appendChild(input);
            listeMineraisDiv.appendChild(label);
        }     
        
        
    } else if(event.target.classList.contains("btnSuppMineral")) {
        // Supprime les minerai des 2 div correspondante
                     
        listeQuantitesDiv.querySelector(`.${selectMinerai.value}`).remove();
        listeMineraisDiv.querySelector(`.${selectMinerai.value}`).remove();   
        

    } else if(event.target.classList.contains("btnModif")) {
        /**
        * listener du bouton modifier
        * permet d'entrer en mode modif
        * ça re-affiche le menu déroulant des minerai et les bouton ajouter/supprimer
        * ça cache le bouton modifier et re affiche le bouton confirmer
        */

        // On retire les hide de touts les élem d'édition
        jobActuel.querySelector('.btnConfirm').classList.remove('hide');
        jobActuel.querySelector('.btnModif').classList.add('hide');
        
        const labels = jobActuel.querySelectorAll('label');
        selectMineraiCont.classList.remove('hide');
        
        // Transformation des labels de valeur en inputs
        labels.forEach(label=>{
            if (findParent("listeQuantites", label) !== 0) {
                // Les valeurs
                const input = label.previousElementSibling;
                input.value = delUnit(label.innerHTML, 5);
                input.classList.remove("hide");
                label.remove();

            } else if (findParent("emplacementContainer", label, 2) !== 0) {
                // La localisation
                const select = label.previousElementSibling;
                select.value = label.innerHTML;
                select.classList.remove("hide");
                label.remove();
                
            } else if (findParent("tempsContainer", label, 2) !== 0) {
                // Le temps
                const input = label.previousElementSibling;
                input.value = label.innerHTML;
                input.classList.remove("hide");
                label.remove();
                
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
        const raffinerySelect = jobActuel.querySelector('.Raffinery');
        
        let tabInsert = {};
        let iVide = false;
        let tVide = false;
        let compactecSCU = []; 
        
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
                        })
                    }
                });
            } 
        }

        //Si le champ de temps est vide, on le signale
        if (tVide === true) {
            alert("Vous devez définir le temps restant !");
        }

        if (iVide === false && tVide === false) {
            jobActuel.querySelector('.checkBoxDiv').classList.remove('hide');
            inputs.forEach(input => {
                const label = document.createElement('label');    
                label.classList.add(input.classList[0]);

                let nomMinerai = input.classList.value;
                // on demande "si (if)" découvre Temprestant il ne le prends pas en compte
                if(nomMinerai !== "temprestant" && nomMinerai !== 'jobTransportCheckbox'){
                    // appelle des minerais avec la fonction push
                    compactecSCU[nomMinerai] = input.value;
                }   
    
                // Insertion dans le tab pour la bdd
                if (!input.classList.contains("jobTransportCheckbox")) {
                    tabInsert[input.className] = input.value;
                }
    
                // Extraction des valeurs des inputs pour les mettre dans les labels
                if(input.parentNode.classList.contains('listeQuantites')){
                    label.classList.add('MineralQuantityLabel');
    
                    label.innerHTML=`${input.value} cSCU`;
                    input.classList.add("hide");
                    input.parentNode.appendChild(label);

                } else if (input.parentNode.classList.contains("checkBoxDiv")) {
                    input.parentNode.classList.remove("hide");

                } else {
                    label.innerHTML = input.value;
                    input.classList.add("hide");
                    input.parentNode.appendChild(label);
                }
                
                
                
            });

        
            jobActuel.querySelector('.btnConfirm').classList.add('hide');
            jobActuel.querySelector('.btnModif').classList.remove('hide');


            // Calculs Okaaa
            let multipliMineraiParPrix = {};  //j'apprends que multipliMineraiParPrix et un tableau
            let totaljob = 0; //j'apprends que totalJob et à 0

            //je demande de dissocier la quantité de minerai du nom du minerai
            for (const minerai in compactecSCU) {
                // je demande de multiplier la quantité de minerai par le prix
                multipliMineraiParPrix[minerai] = Number(compactecSCU[minerai]) * prixMineraiRefined[minerai];
            
                totaljob += multipliMineraiParPrix[minerai];
                multipliMineraiParPrix[minerai] = multipliMineraiParPrix[minerai] + " aUEC ";
            };
            
            // Insertion dans le tab pour la bdd
            tabInsert[raffinerySelect.className] = raffinerySelect.value;
            let idJob = jobActuel.id.split("_");
            tabInsert["idJob"] = idJob[1];


            // Création des labels pour remplacer les inputs
            const label = document.createElement('label');
            label.classList.add(`${raffinerySelect.className}`);
            label.innerHTML = raffinerySelect.value;
            raffinerySelect.parentNode.appendChild(label);

            // On cache les selects et autres btns de modif
            raffinerySelect.classList.add('hide');
            selectMineraiCont.classList.add('hide');
            

            // Calcul des totaux
            // Par Job
            jobActuel.querySelector('.totalJobDiv').innerHTML=`Total: ${calculTotalUnitJob(jobActuel)}`
            
            // Et total
            tabTotal.innerHTML=`Total global cSCU: ${calculTotalUnitGlobal(document.querySelectorAll('.job'))}`;      
            
            // Insertion dans la bdd
            insertNewJob(tabInsert);
        }
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

    getNextId();

    let jobHtml = /*html*/ `
    <div class="job job${numJob}" id="jobId_${nextId}">
        <div class="checkBoxDiv hide"> 
            <label>Transporter ? </label>
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
            </div>
        </div>

        <div class="tempsContainer">
            <label class="titreCat">Temps Restant : </label>
            <div class="tabCat">
                <input class="heurePlace" type="text">
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
            console.log(res);
        }
    });
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
    
    const vaisseauxListCont = transportContainer.querySelector('.vaisseauxListCont');
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
        "600i Touring":"https://robertsspaceindustries.com/media/6leim20dm8avcr/store_slideshow_large/600i-Swanky-Apartment.jpg",
        "600i Explorer":"https://robertsspaceindustries.com/media/edwd8vsufwmdxr/store_slideshow_large/600i_01_Beach-Squashed.jpg",
        "Hammerhead":"https://robertsspaceindustries.com/media/sjzzdy79hoq0sr/store_slideshow_large/Aegis-Hammerhead-Piece-02-Full-Force-03-06.jpg",
        "Mercury Star Runner":"https://robertsspaceindustries.com/media/k8z9y4skemjncr/store_slideshow_large/Crusader-Three-Quater-Updated.png",
        "C2 Hercules": "https://media.robertsspaceindustries.com/datp88pyz74xg/store_slideshow_large.jpg"
    }
    const vaisseauxPhotoCont = transportContainer.querySelector('.vaisseauxPhotoCont');
    const totalLabel = totalPanierCont.querySelector('.totalLabel');
    totalLabel.innerHTML=`${totalcSCU} cSCU | ${totalaUEC} aUEC`;
    vaisseauxListCont.innerHTML="";
    ships.forEach(ship=>{
        if(ship[1]>=totalcSCU){
            const label = document.createElement('label');
            const br = document.createElement('br');
            label.classList.add('vaisseau');
            label.innerHTML=`Le <a target="_blank "href="${ship[2]}">${ship[0]}</a> avec ${ship[1]} cSCU, ${ship[1]-totalcSCU} après chargement`;
            const link = label.querySelector('a');
            link.addEventListener('mouseover',event=>{
                const image = document.createElement('img');
                image.setAttribute('src',images[event.target.innerHTML]);
                vaisseauxPhotoCont.innerHTML="";
                vaisseauxPhotoCont.appendChild(image);

            })
            vaisseauxListCont.appendChild(label);
            vaisseauxListCont.appendChild(br);
        }
    })
    

    transportContainer.classList.remove('hide');
})

transportContainer.querySelector('.CancelButtonCont').addEventListener('click',event=>{
    transportContainer.querySelectorAll('.job').forEach(job=>{
        job.remove();
    })
    transportContainer.classList.add('hide');
})

// Update du Filtre -----------------------------------------------------------
selectFiltre.addEventListener("input", inputSelect());
function inputSelect() {
    //console.log(selectFiltre.value);
    const pseudo = getPseudo();
    console.log("here");
    if (connected === true) {
        fetchDB(pseudo, selectFiltre.value);
    }
}

xSelect.addEventListener("click", () => {
    selectFiltre.value = "";
    inputSelect();
});


/** ---------------------------------------------------------------------------
 * Fonction qui calcule le total d'unités (cSCU) dans le job donné
 * @param {*} job La div du job
 * @returns Le total d'unité
 */
function calculTotalUnitJob(job){
    let result = 0;
    const quantityLabels = job.querySelectorAll('.MineralQuantityLabel');
    quantityLabels.forEach(value=>{
        
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

/**
 * Fonction qui retourne le pseudo actuel
 * @returns le pseudo
 */
function getPseudo() {
    const pseudo = document.querySelector("#pseudoAct").innerHTML;
    return pseudo;
}


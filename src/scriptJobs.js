

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
                    bar.style.zIndex = "-1";

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
        let tVide = true;

        if (listeMineraisDiv.children.length <= 0 ){
            alerteCustom()
            return;
        }
        
        // On vérifie qu'il n'y a pas d'input vide
        inputs.forEach(input => {
            if (input.parentNode.classList.contains("tabCat") && input.value !== "") {
                tVide = false;
            } else if (input.value === "" && !input.parentNode.classList.contains("tabCat")) {
                iVide = true;
            }   

        });
        // console.log(listeMineraisDiv.children.length);

        // Si il y a des champs vide, on les suppr, ou pas :)
        let confirmDel = false;
        if (iVide === true) {
            confirmDel = window.confirm("Vous laissez des champs vides ! Voulez vous les supprimer ?");

            if (confirmDel === true) {
                inputs.forEach(input => {
                    if (input.value === "" && !input.parentNode.classList.contains("tabCat")) {
                        let classe = input.classList[0];
                        const toRem = jobActuel.querySelectorAll(`.${classe}`);
                        toRem.forEach(item => {
                            item.remove();
                        });
                    }
                });
            } 
        }
        console.log(listeMineraisDiv);

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
            if(jobActuel.querySelector('.minsPlace').value > 59){
                alert("t'as déja vu des minutes au dessus de 59 toi ?");
                return;
            }

            // Boucle pour switcher l'affichage des inputs aux labels
            inputs.forEach(input => {
                if (!input.classList.contains("jobTransportCheckbox")) {
                    // console.log(input);
                    const label = input.parentNode.querySelector("label." + input.classList[0]);
                    
                    // Extraction des valeurs des inputs pour les mettre dans les labels
                    if(input.parentNode.classList.contains('listeQuantites')){
                        label.classList.add('MineralQuantityLabel');
        
                        label.innerHTML=`${input.value} cSCU`;
                        input.classList.add("hide");
                        label.classList.remove("hide");

                        // Insertion dans le tab pour la bdd
                        tabInsert[input.classList[0]] = input.value;
                        console.log(input);

                    } else if(input.classList.contains("heurePlace")) {
                        // Pour la bdd
                        let hoursRest = timeRemain.getHours();
                        hoursRest += Number(input.value);
                        timeRemain.setHours(hoursRest);
                        console.log(timeRemain);

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
                        bar.style.backgroundColor = "";
                        bar.style.zIndex = "0";

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
        updateCheckboxs();
    }
});

function updateCheckboxs() {
    let checkedJob=[];
    const pourcentagecont = document.querySelector('.pourcentageMainCont');
    const tabSelectedMineraisTable = document.querySelector('.tabSelectedMineraisTable')
    document.querySelectorAll('.job').forEach(job=>{
        if(job.querySelector('.jobTransportCheckbox').checked){
            checkedJob.push(job);
            job.classList.add("shadowChecked");
        } else {
            job.classList.remove("shadowChecked");
        }
    })
    const TotalcSCUByMineral = calcPercentage(tabSelectedMineraisTable,checkedJob);
    refreshPercentageColorBar(tabSelectedMineraisTable,pourcentagecont,checkedJob,TotalcSCUByMineral);
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
    <label class="job job${numJob} newJob" id="jobId_${nextId}">
        <div class="checkBoxDiv hide"> 
            <input class="jobTransportCheckbox hide"type="checkbox" disabled>
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
                <input class="heurePlace" max=999 placeholder="heures"  type="number">  
                <input class="minsPlace" max=59 placeholder="minutes" type="number">
                <label class="heurePlace hide"></label>
            </div>
        </div>

        <div class="btnsContainer">
            <button class="btnCancel">Annuler</button>
            <button class="btnSupprimer hide">Supprimer</button>
            <button class="btnModif hide">Modifier</button>
            <button class="btnConfirm">Confirmer</button>
        </div>
    </label>`;
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
    let checkJobs=[];
    jobs.forEach(job => {
        const titleJob = job.querySelector(".titleJob");
        titleJob.innerHTML = i;
        i--;
        if(job.querySelector('.jobTransportCheckbox').checked){
            checkJobs.push(job);
        }
    });

    // Calcul des totaux
    initiateCalculateValue();
    const TotalcSCUByMineral = calcPercentage(document.querySelector('.tabSelectedMineraisTable'),checkJobs);
    refreshPercentageColorBar(document.querySelector('.tabSelectedMineraisTable'),document.querySelector('.pourcentageMainCont'),checkJobs,TotalcSCUByMineral);

}
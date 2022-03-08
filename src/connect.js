const mdpErreur = document.querySelector(".mdpError");
const addLog = document.querySelector(".addLog");
const yesAdd = document.querySelector(".yesAdd");
const noAdd = document.querySelector(".noAdd");

const iLogin = document.querySelector("#iLogin");
const iPsw = document.querySelector("#iPsw");

const connexionContainer = document.querySelector(".connexionContainer");
const pseudo = document.getElementById("pseudoAct");
const iRemember = document.getElementById("rememberMe");
const deco = document.getElementById("labelDeco");

const tabTotals = document.querySelector('.tabTotal');

let jobList;

let tabInsert = {};
let connected = false;

window.onload = init();
function init() {
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        data: "autoConnect",
        // async: false,
        success: function(res) {
            let searchAuto = res.search("autoConnect");
            if (searchAuto !== -1) {
                connexionContainer.classList.add("connect-hidden");
                connectioooooooon(res, true);
            } else {
                // connexionContainer.style.display = "flex";
                connexionContainer.classList.remove("connect-hidden");
            }
        }
    });
}

deco.addEventListener("click", e => {
    pseudo.innerHTML = "Pseudo";
    jobsContainer.innerHTML = "";
    selectFiltre.value = "";
    connected = false;
    // connexionContainer.style.display = "flex";
    connexionContainer.classList.remove("connect-hidden");
});

// const titleConnexion = document.querySelector(".titleConnexion");
// // A virer, c'est pour le dev uniquement
// titleConnexion.addEventListener("mouseover", (e) => {
//     console.log("Connecté :D");
//     connexionContainer.style.display = "none";
//     pseudo.innerHTML = "Liduen";
// });


// traitement du form
$("form").submit(function(evt){	 
    evt.preventDefault();
    let formData = new FormData($(this)[0]);

    $.ajax({
        url: './src/connect.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        async: false,
        success: function (response) {
            console.log(response);

            if(response.search("CRE4TI0N") !== -1) {
                mdpErreur.classList.add("hide");
                addLog.classList.remove("hide");

                tabInsert.insert = {};
                tabInsert.insert.login = iLogin.value;
                tabInsert.insert.password = iPsw.value;
                tabInsert.insert.rememberMe = iRemember.value;

                console.log(tabInsert.insert.login + " " + tabInsert.insert.password);

            } else if(response.search("Connect") !== -1) {
                connectioooooooon(response, false);

            } else if(response.search("pswNo") !== -1) {
                mdpErreur.classList.remove("hide");
            }
        }
    });
    return false;
});

//Traitement du btn oui
yesAdd.addEventListener("click", (e) => {
    e.preventDefault();
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async:false,
        data: tabInsert,
        success: function(res) {
            console.log(res);
            addLog.classList.add("hide");
            connectioooooooon(res);
        }
    });
});

noAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addLog.classList.add("hide");
    iLogin.value = "";
    iPsw.value = "";
})

function connectioooooooon(res, auto) {
    if (auto !== true) {
        connexionContainer.classList.add("connect-hidden");
    }
    connected = true;
    let ps = res.search("Pseudo=");
    let result = res.substr(ps + 7, res.length)
    
    pseudo.innerHTML = result;
    fetchDB(result, undefined, 1);
    
}

function fetchDB(pseudo, raffinery, load) {
    nextId = -1;
    // Requète ajax pour requérir la BDD
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async:false,
        data: {
            fetch : pseudo,
            raffinery : raffinery,
            firstLoad : load
        },
        success: function(res) {
            res = JSON.parse(res)
            //console.log(res);

            jobsContainer.innerHTML = ""; 
            
            if(res.length > 0) {
                // Défilement du tableau et extraction des valeurs
                for(let i = 0;i < res.length;i++) {
                    let jobId;
                    let raffinery;
                    let time;
                    let labelMinerais = "";
                    let labelVal = "";
                    let hStart;
                    let hEnd;
                    let hNow = new Date();
                    hNow = Date.parse(hNow);
                    let cTime = "";
                    let sTime = "";
                    for (const val in res[i]) {
                        switch(val) {
                            case "idJob": 
                                jobId = res[i][val];
                            break;
                            case "fk_idUser": // x(
                                // Y a rien à voir, dégage.
                            break;
                            case "Raffinery":
                                raffinery = res[i][val];
                            break;
                            case "heurePlace":
                                hStart = Number(res[i][val]);
                            break;
                            case "tRestant": 
                                hEnd = Number(res[i][val]);
                            break;
                            case "lastFilter":
                                selectFiltre.value = res[i][val];
                            break;
                            default:
                                if(res[i][val] !== null) {
                                    labelMinerais += `<label class="${val}">${val}</label>`;
                                    labelVal += `<input class="${val}   hide" type="number" placeholder="en cSCU">
                                    <label class="${val} MineralQuantityLabel">${res[i][val]} cSCU</label>`;
                                }
                        }
                    }

                    // Vérifie si le job est terminé ou pas
                    if (hNow > hEnd) {
                        // Affichage de Terminé !
                        time = "Terminé !";
                        cTime = "tFinish";

                    } else {
                        // Affichage du décompte
                        let tRemaining = Math.abs(hEnd - hNow);
                        let day = new Date(tRemaining).toISOString().substring(8, 10);
                        time = new Date(tRemaining).toISOString().substring(11, 19);
                        time = time.split(":");

                        // Vérif de si l'heure est tellement grande qu'il y a des jours dans la date, et ajoute des heures en conséquence
                        // /!\ Ne gère que des temps de moins d'un mois, (780h)
                        if (day > 1) {
                            time[0] = Number(time[0]);
                            time[0] += 24 * (day - 1);
                        }

                        time = time.join(":");

                        let tTotal = Math.abs(hEnd - hStart);
                        let tPercent = tRemaining * 100 / tTotal;

                        tPercent = Math.abs(tPercent - 100);
                        sTime = `width:${tPercent}%`;
                    }

                    // Setup de l'html avec les variables
                    let jobHtml = `
                    <div class="job" id="jobId_${jobId}">
                        <div class="checkBoxDiv"> 
                            <input class="jobTransportCheckbox"type="checkbox">
                        </div>

                        <label class="titleJob">${i + 1}</label>
                    
                        <div class="selectContainer hide">
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

                        <div class="mineraisContainer">
                            <div class="mineraisJob">
                                <div class="listeMinerais">
                                    ${labelMinerais}
                                </div>
                                <span class="separate"></span>
                                <div class="listeQuantites">
                                    ${labelVal}
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
                                <select class="Raffinery hide"> 
                                    <option>CRU-L1</option>
                                    <option>ARC-L1</option>
                                    <option>HUR-L1</option>
                                    <option>HUR-L2</option>
                                    <option>MIC-L1</option>
                                </select>
                                <label class="Raffinery">${raffinery}</label>
                            </div>
                        </div>
        
                        <div class="tempsContainer">
                            <label class="titreCat">Temps Restant : </label>
                            <div class="tabCat">
                                <span class="tProgress ${cTime}" style="${sTime}"></span>
                                <input class="heurePlace hide" placeholder="heures" max=999 type="number"> 
                                <input class="minsPlace hide" placeholder="minutes" max=59 type="number">
                                <label class="heurePlace">${time}</label>
                            </div>
                        </div>
        
                        <div class="btnsContainer">
                            <button class="btnCancel hide">Annuler</button>
                            <button class="btnSupprimer">Supprimer</button>
                            <button class="btnModif">Modifier</button>
                            <button class="btnConfirm hide">Confirmer</button>
                        </div>
                    </div>`;
        
                    //Affichage des cases remplies
                    jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
        
                }

                initiateCalculateValue();
            }
        }
    });
    
  
}

function initiateCalculateValue(){

    jobList = document.querySelectorAll(".job");
   
    jobList.forEach(job=>{
        let compactecSCU = []; 
        let multipliMineraiParPrix = {};
        let totaljob = 0; 
        const labels = job.querySelector('.listeQuantites').querySelectorAll('label')

        labels.forEach(label=>{
            let nomMinerai = label.classList[0];
            
            if(nomMinerai !== "heurePlace" && nomMinerai !== "minsPlace" && nomMinerai !== 'jobTransportCheckbox'){
                
                compactecSCU[nomMinerai] = label.innerHTML;
                
            } 
            
        })
        for (const minerai in compactecSCU) {
            multipliMineraiParPrix[minerai] = Number(delUnit(compactecSCU[minerai],5)) * Number(prixMineraiRefined[minerai][0]);
            totaljob += Number(multipliMineraiParPrix[minerai]);
            multipliMineraiParPrix[minerai] = multipliMineraiParPrix[minerai] + " aUEC ";
        };          
        totaljob = Math.round(totaljob);
        
        job.querySelector('.totalJobDiv').innerHTML=`${separateur_nombre(calculTotalUnitJob(job))} cSCU | ${separateur_nombre(totaljob)} aUEC`
    })

    tabTotals.innerHTML=`${separateur_nombre(calculTotalUnitGlobal(jobList))} cSCU <br>${separateur_nombre(calculTotalPriceGlobal())} aUEC`;

    const TotalcSCUByMineral = calcPercentage(document.querySelector('.tabMineraisTable'),document.querySelectorAll('.job'));
    refreshPercentageColorBar(document.querySelector('.tabMineraisTable'),document.querySelector('.pourcentageTotalMainCont'),document.querySelectorAll('.job'),TotalcSCUByMineral);
}
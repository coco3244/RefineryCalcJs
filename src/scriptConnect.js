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

let stationsOptions = "";
const stationsList = locations.then(
    function success(res) {
        let stations = [];

        // Tri des localisation pour avoir juste les stations
        res.find(elem => {
            if (elem.name.search('Refinement Center') !== -1) {
                stations.push(elem.name);
            }
        });

        // Affichage des stations
        for (const loc of stations) {
            const name = loc.split(" > ")[1];
            // let nameShort = name.substr(0, 6);
            const nameShort = name;
            stationsOptions += `<option title="${name}">${nameShort}</option>`;
        }

        const parents = document.querySelectorAll("select.Raffinery");
        if (parents) {
            for (const parent of parents) {
                parent.innerHTML = stationsOptions;
            }
        }
    },
    function error(error) {
        stationsOptions = "Erreur : Impossible d'obtenir les stations";
        console.error("Impossible d'obtenir les stations : " + error);
    }
);

let oresOptions = "";
const oresList = ores.then(
    function success(res) {
        // Affichage des minerais
        for (const ore of res) {
            let nameShort = ore.split(" ")[0];
            oresOptions += `<option title="${ore}">${nameShort}</option>`;
        }

        const parents = document.querySelectorAll("select.selectMinerai");
        if (parents) {
            for (const parent of parents) {
                parent.innerHTML = oresOptions;
            }
        }
    },
    function error(error) {
        oresOptions = "Erreur : Impossible d'obtenir les stations";
        console.error("Impossible d'obtenir les stations : " + error);
    }
);

window.onload = init();
function init() {
    // console.log(document.cookie);
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        data: "autoConnect",
        // async: false,
        success: function(res) {
            res = JSON.parse(res);
            // console.log(res);

            if (res.login !== undefined) {
                connexionContainer.classList.add("connect-hidden");
                if (res.filter !== undefined) {
                    selectFiltre.value = res.filter;
                }
                connectioooooooon(res.login);
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
$(".formConnect").submit(function(evt){	 
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
            // console.log(response);

            if(response.search("CRE4TI0N") !== -1) {
                mdpErreur.classList.add("hide");
                addLog.classList.remove("hide");
                // console.log(formData);
                
            } else if(response.search("Connect") !== -1) {
                
                let ps = response.search("Pseudo=");
                let result = response.substr(ps + 7, response.length);
                
                connectioooooooon(result);

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

    tabInsert.insert = {};
    tabInsert.insert.login = iLogin.value;
    tabInsert.insert.password = iPsw.value;
    
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async:false,
        data: tabInsert,
        success: function(res) {
            addLog.classList.add("hide");
            let ps = res.search("Pseudo=");
            let result = res.substr(ps + 7, res.length);

            connectioooooooon(result);
        }
    });
});

noAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addLog.classList.add("hide");
    iLogin.value = "";
    iPsw.value = "";
})

function connectioooooooon(tPseudo) {
    // if (auto !== true) {
    //     connexionContainer.classList.add("connect-hidden");
    // }
    connected = true;
    connexionContainer.classList.add("connect-hidden");
        
    pseudo.innerHTML = tPseudo;
    fetchDB(tPseudo, 1);
}

function fetchDB(pseudo, load) {
    nextId = -1;
    // Requète ajax pour requérir la BDD
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async:false,
        data: {
            fetch : pseudo,
            firstLoad : load
        },
        success: function(res) {
            res = JSON.parse(res)

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
                    if (hNow >= hEnd) {
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
                    <label class="job" id="jobId_${jobId}">
                        <div class="checkBoxDiv"> 
                            <input class="jobTransportCheckbox hide"type="checkbox">
                        </div>

                        <label class="titleJob">${i + 1}</label>
                    
                        <div class="selectContainer hide">
                            <select class="selectMinerai"> 
                                ${oresOptions}                          
                            </select>

                            <div class="addSupprContainer">
                                <button class="btnAddMineral">Ajouter</button>
                                <button class="btnSuppMineral">Supprimer</button>
                            </div>
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
                            <label class="titreCat">Total de ce Raffinage</label>
                            <div class="tabCat totalJobDiv">
                                0
                            </div>
                        </div>
        
                        <div class="emplacementContainer">
                            <label class="titreCat">Emplacement</label>
                            <div class="tabCat">
                                <select class="Raffinery hide"> 
                                    ${stationsOptions}
                                </select>
                                <label class="Raffinery">${raffinery}</label>
                            </div>
                        </div>
        
                        <div class="tempsContainer">
                            <label class="titreCat">Temps Restant</label>
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
                    </label>`;
        
                    //Affichage des cases remplies
                    jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
        
                }

                filtrage();
            }
        }
    });
    
  
}

function initiateCalculateValue(){
    jobList = document.querySelectorAll(".job");
   
    jobList.forEach(job=>{
        if (!job.classList.contains('hide')) {
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
            
            job.querySelector('.totalJobDiv').innerHTML=`
            ${separateur_nombre(calculTotalUnitJob(job))} cSCU | 
            ${separateur_nombre(totaljob)} aUEC`;
        }
    })

    tabTotals.innerHTML = `
    ${separateur_nombre(calculTotalUnitGlobal(jobList))} cSCU <br>
    ${separateur_nombre(calculTotalPriceGlobal(jobList))} aUEC`;

    const TotalcSCUByMineral = calcPercentage(document.querySelector('.tabMineraisTable'),document.querySelectorAll('.job'));
    refreshPercentageColorBar(document.querySelector('.tabMineraisTable'),document.querySelector('.pourcentageTotalMainCont'),document.querySelectorAll('.job'),TotalcSCUByMineral);
}
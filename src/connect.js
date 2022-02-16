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
            console.log(res);
            let searchAuto = res.search("autoConnect");
            console.log(searchAuto);
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
        data: tabInsert,
        success: function(res) {
            console.log(res);
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
        data: {
            fetch : pseudo,
            raffinery : raffinery,
            firstLoad : load
        },
        success: function(res) {
            res = JSON.parse(res)
            console.log(res);

            jobsContainer.innerHTML = ""; 
            
            if(res.length > 0) {
                // Défilement du tableau et extraction des valeurs
                for(let i = 0;i < res.length;i++) {
                    let jobId;
                    let raffinery;
                    let time;
                    let labelMinerais = "";
                    let labelVal = "";
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
                                time = res[i][val];
                            break;
                            case "lastFilter":
                                selectFiltre.value = res[i][val];
                            break;
                            default:
                                if(res[i][val] !== null) {
                                    labelMinerais += `<label class="${val}">${val}</label>`;
                                    labelVal += `<input class="${val} hide" type="number">
                                    <label>${res[i][val]} cSCU</label>`;
                                }
                        }
                    }

                    // Setup de l'html avec les variables
                    let jobHtml = `
                    <div class="job" id="jobId_${jobId}">
                        <div class="checkBoxDiv"> 
                            <label>Transporter ? </label>
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
                                    <option>ARC-L2</option>
                                    <option>HUR-L1</option>
                                    <option>HUR-L2</option>
                                    <option>MIC-L2</option>                             
                                </select>
                                <label>${raffinery}</label>
                            </div>
                        </div>
        
                        <div class="tempsContainer">
                            <label class="titreCat">Temps Restant : </label>
                            <div class="tabCat">
                                <input class="heurePlace hide" type="text">
                                <label>${time}</label>
                            </div>
                        </div>
        
                        <div class="btnsContainer">
                            <button class="btnSupprimer">Supprimer</button>
                            <button class="btnModif">Modifier</button>
                            <button class="btnConfirm hide">Confirmer</button>
                        </div>
                    </div>`;
        
                    //Affichage des cases remplies
                    jobsContainer.innerHTML = jobHtml + jobsContainer.innerHTML;
        
                }

                // const jobs = document.querySelectorAll('.job');
                // jobs.forEach(jobActuel => {
                //     // console.log(jobActuel);
                //     // Calcul des totaux
                //     // Par Job
                //     jobActuel.querySelector('.totalJobDiv').innerHTML = `Total: ${calculTotalUnitJob(jobActuel)}`;
                //     // console.log(jobActuel.querySelector('.totalJobDiv').innerHTML);
                    
                // });

                // // Et total
                // tabTotal.innerHTML=`Total global cSCU: ${calculTotalUnitGlobal(document.querySelectorAll('.job'))}`; 

            }
        }
    });
    jobList = document.querySelectorAll(".job");
}
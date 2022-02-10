const mdpErreur = document.querySelector(".mdpError");
const addLog = document.querySelector(".addLog");
const yesAdd = document.querySelector(".yesAdd");
const noAdd = document.querySelector(".noAdd");

const iLogin = document.querySelector("#iLogin");
const iPsw = document.querySelector("#iPsw");

const connexionContainer = document.querySelector(".connexionContainer");
const pseudo = document.getElementById("pseudoAct");
const jobContainer = document.querySelector(".jobsContainer");

let tabInsert = {};


const titleConnexion = document.querySelector(".titleConnexion");
// A virer, c'est pour le dev uniquement
titleConnexion.addEventListener("mouseover", (e) => {
    console.log("Connecté :D");
    connexionContainer.style.display = "none";
    pseudo.innerHTML = "Liduen";
});


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
        success: function (response) {
            console.log(response);

            if(response.search("CRE4TI0N") !== -1) {
                mdpErreur.classList.add("hide");
                addLog.classList.remove("hide");

                tabInsert.insert = {};
                tabInsert.insert.login = iLogin.value;
                tabInsert.insert.password = iPsw.value;

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
            connectioooooooon(res, true);
        }
    });
});

noAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addLog.classList.add("hide");
    iLogin.value = "";
    iPsw.value = "";
})

function connectioooooooon(res, create) {
    connexionContainer.style.display = "none";
    let ps = res.search("Pseudo=");
    let result = res.substr(ps + 7, res.length)

    pseudo.innerHTML = result;
    fetchDB(result);
}

function fetchDB(pseudo) {
    // Requète ajax pour requérir la BDD
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        data: {"fetch" : pseudo},
        success: function(res) {
            res = JSON.parse(res)

            jobContainer.innerHTML = ""; //sécurité à enlever éventuellement
            
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
                            default:
                                if(res[i][val] !== null) {
                                    labelMinerais += `<label>${val}</label>`;
                                    labelVal += `<label>${res[i][val]} cSCU</label>`;
                                }
                        }
                    }

                    // Setup de l'html avec les variables
                    let jobHtml = `
                    <div class="job" id="jobId_${jobId}">
                        <label class="titleJob">${i + 1}</label>
        
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
                            <div class="tabCat">
                                250 000 aUEC
                            </div>
                        </div>
        
                        <div class="emplacementContainer">
                            <label class="titreCat">Emplacement : </label>
                            <div class="tabCat">
                                ${raffinery}
                            </div>
                        </div>
        
                        <div class="tempsContainer">
                            <label class="titreCat">Temps Restant : </label>
                            <div class="tabCat">
                                ${time}
                            </div>
                        </div>
        
                        <div class="btnsContainer">
                            <button class="btnTransport">Transporter</button>
                            <button class="btnModif">Modifier</button>
                        </div>
                    </div>`;
        
                    //Affichage des cases remplies
                    jobContainer.innerHTML = jobHtml + jobContainer.innerHTML;
        
                }
            }
        }
    });
}
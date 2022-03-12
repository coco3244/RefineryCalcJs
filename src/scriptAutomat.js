
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


function ComparatorShips(a, b) {

    if (a[1] < b[1]) return -1;

    if (a[1] > b[1]) return 1;
    
    return 0;
}

function alerteCustom() {
    const  Alerte = document.querySelector(".AlerteMainContainer");
    Alerte.classList.remove("hide");

    console.log("essais");
    console.log(Alerte);
}

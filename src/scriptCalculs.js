
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
        if (!job.classList.contains("hide")) {
            result+=Number(calculTotalUnitJob(job));
        }
    })
    return result;
}

/**
 * Calcule la valeur en aUEC du job en paramètre
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
function calculTotalPriceGlobal(jobs){
    let result=0;

    jobs.forEach(job=>{
        if (!job.classList.contains("hide")) {
            result += calculTotalPriceJob(job);
        }
    })
    
    return result;
}


function calcPercentage(tabMineraisTable, jobs){
    /**
     * Partie de calcul des pourcentages
     */
         
     tabMineraisTable.innerHTML=`<tr>
     <th>Minerais</th>
     <th>% Cargaison</th>
     <th>aUEC +/-</th>
     </tr>`;
     const totalcSCU = calculTotalUnitGlobal(jobs);
     //const totalaUEC = calculTotalPriceGlobal(document.querySelectorAll('.job'));
     let TotalcSCUByMineral = [];
     
    jobs.forEach(job=>{
        if (!job.classList.contains('hide')) {
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
        }
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
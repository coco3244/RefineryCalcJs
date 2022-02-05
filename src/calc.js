

const boutonPlus = document.querySelector('.boutonPlus');
const boutonMoins = document.querySelector('.boutonMoins');
const addButton = document.querySelector('.addButton');
const remButton = document.querySelector('.remButton')
const listeMinerai= document.querySelector('.listeMinerai');
const quantainumTR=document.querySelector('.quantainum');
const lineTabl = document.querySelectorAll('.lineTab');
const jobTR = document.querySelector('.job');
let inputs = document.querySelectorAll('input');
let thJob;
let thJobRes;
addListenerOnInput();


/**
* Ajout de la ligne du minerai selectionné
*/
addButton.addEventListener('click',(event)=>{
    let classes = document.querySelectorAll(`.${listeMinerai.value}`);
    classes.forEach(value=>{
        value.classList.remove('hide')
    })
    
})
/**
* Suppression de la ligne du minerai selectionné
*/
remButton.addEventListener('click',(event)=>{
    let classes = document.querySelectorAll(`.${listeMinerai.value}`);
    classes.forEach(value=>{
        value.classList.add('hide');
    })
})

/**
* Ajout d'une colonne de job
*/
boutonPlus.addEventListener('click',(event)=>{  
    thJob = document.querySelectorAll('.thJob');
    lineTabl.forEach(value=>{
        if(value.classList.contains('job')){
            const newTh = document.createElement('th');
            if(!value.classList.contains('resLine')){
                newTh.classList.add('thJob');
            }else{
                newTh.classList.add('thJobRes');
            }         
            newTh.classList.add(`job${thJob.length+1}`);
            newTh.innerHTML=`Job ${thJob.length+1}`;
            if(!value.classList.contains('resLine')){
                const button = document.createElement('button');
                button.classList.add('suppbtn');
                button.innerHTML='X';
                newTh.appendChild(button);
            }
            value.appendChild(newTh);
        }else{
            const newTd = document.createElement('td');
            newTd.classList.add(`job${thJob.length+1}`);
            if(value.classList.contains('resLine')){
                const h2TotPrice = document.createElement('H2');
                h2TotPrice.classList.add('resH2');
                if(value.classList.contains('totPerJob')){
                    h2TotPrice.classList.add('subTotPrice');
                }           
                h2TotPrice.innerHTML='0';
                newTd.appendChild(h2TotPrice);
                if(value.classList.contains('totPerJob')){
                    const h2TotUnit = document.createElement('H2');
                    h2TotUnit.classList.add('resH2');
                    h2TotUnit.classList.add('subTotUnit');
                    h2TotUnit.innerHTML='0';
                    newTd.appendChild(h2TotUnit);
                }
                
              
                
            }else{
                const saisie = document.createElement('input');
                saisie.setAttribute('type','number');
                saisie.setAttribute('min','0');
                newTd.appendChild(saisie);
            }
            
            value.appendChild(newTd);
        }
        
    })
    inputs = document.querySelectorAll('input');
    addListenerOnInput();
})


jobTR.addEventListener('click',(event)=>{
    thJob = document.querySelectorAll('.thJob');
    if(event.target.classList.contains('suppbtn')){
        const classeDuParent = event.target.parentNode.classList[1];
        
        const toutLeBordel = document.querySelectorAll(`.${classeDuParent}`);
        toutLeBordel.forEach(value =>{
            value.remove();
        })
        
        let count = 1;
        lineTabl.forEach(value => {           
            let count2=1;
            const ths = value.querySelectorAll('th'); 
            // console.warn(ths);     
            ths.forEach(vals=>{
                
                if(vals.classList.contains('thJobRes')){
                    vals.className="";
                    vals.classList.add(`thJobRes`);
                    vals.classList.add(`job${count2}`);
                    vals.innerHTML=`job ${count2}`;
                }else{
                    vals.className="";
                    vals.classList.add(`thJob`);
                    vals.classList.add(`job${count2}`);
                    vals.innerHTML=`job ${count2}`;
                    const button = document.createElement('button');
                    button.classList.add('suppbtn');
                    button.classList.add(`SuppButton${count2}`);
                    button.innerHTML='X';
                    vals.appendChild(button);
                }
                
                count2++;
            })
            
            const tds = value.querySelectorAll('td');
            let count3=1;
            tds.forEach(vals=>{
                if(count3!=1){
                    vals.className="";
                    vals.classList.add(`job${count2}`);              
                    count2++;
                }
                count3++;
                
            })
            
            
            count++;
        });
        
        
    }
    
})

function addListenerOnInput(){
    
    inputs.forEach(value=>{
        
        value.addEventListener('input',(event)=>{
            const units =event.target.value; // ce qui est entré dans l'input, dans notre cas les unité de minerai
            const h2TotalScu = document.querySelector('.totalScu');
            let total =0;
            
            const tdJob = event.target.parentNode.classList[0]; //récup quel job et donc quelle colonne
            const minerai = event.target.parentNode.parentNode.classList[0]; //recupere quel minerai a été modifié
            
            const allTrWithResLine = document.querySelectorAll('.resLine'); //je prend tout ce qui contien la class resLine
            allTrWithResLine.forEach(values=>{
                if(values.classList.contains(`${minerai}`)){
                    
                    const tdToModify = values.querySelector(`.${tdJob}`); //je chope le td de la bonne colonne
                    tdToModify.querySelector('H2').innerHTML=units;
                    
                }
                const tds = values.querySelectorAll('td');
                tds.forEach(tdsValues=>{
                    
                    const h2 = tdsValues.querySelector('h2');
                   
                    if(h2!=null && h2.classList.contains('resH2')){
                        total+=parseFloat(h2.innerText);                     
                    }
                })
                
            })

            const allSubTotH2 = document.querySelectorAll('.subTotUnit');

            allSubTotH2.forEach(value=>{
                const job = value.parentNode.classList[0];
                console.log(job);
                const col = document.querySelectorAll(`.${job}`);
                let unit=0;
                col.forEach(cols=>{
                    const h2 = cols.querySelectorAll('h2');
                    
                    h2.forEach(h2s=>{
                        unit+=parseFloat(h2s.innerText);
                    })
                    
                })
                console.log(unit);
                console.log(value);
                value.innerText=unit;
                unit=0;
            })                                 
            h2TotalScu.innerText=total;
            
            
        })
        
    })
    
}






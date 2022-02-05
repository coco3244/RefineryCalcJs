

const boutonPlus = document.querySelector('.boutonPlus');
const boutonMoins = document.querySelector('.boutonMoins');
const addButton = document.querySelector('.addButton');
const remButton = document.querySelector('.remButton')
const listeMinerai= document.querySelector('.listeMinerai');
const quantainumTR=document.querySelector('.quantainum');
const lineTabl = document.querySelectorAll('.lineTab');
const jobTR = document.querySelector('.job');
let thJob;
let thJobRes;

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
                const saisie = document.createElement('H2');
                saisie.innerHTML='0';
                newTd.appendChild(saisie);
            }else{
                const saisie = document.createElement('input');
                saisie.setAttribute('type','number');
                saisie.setAttribute('min','0');
                newTd.appendChild(saisie);
            }
            
            value.appendChild(newTd);
        }
        
    })
    
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
                    console.log(vals);
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




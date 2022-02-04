

const boutonPlus = document.querySelector('.boutonPlus');
const boutonMoins = document.querySelector('.boutonMoins');
const addButton = document.querySelector('.addButton');
const listeMinerai= document.querySelector('.listeMinerai');
const quantainumTR=document.querySelector('.quantainum');
const lineTabl = document.querySelectorAll('.lineTab');
const jobTR = document.querySelector('.job');
let thJob
addButton.addEventListener('click',(event)=>{
    document.querySelector(`.${listeMinerai.value}`).classList.remove('hide');
})

boutonPlus.addEventListener('click',(event)=>{  
    thJob = document.querySelectorAll('.thJob');
    lineTabl.forEach(value=>{
        if(value.classList.contains('job')){
            const newTh = document.createElement('th');
            newTh.classList.add('thJob');
            newTh.classList.add(`job${thJob.length+1}`);
            newTh.innerHTML=`Job ${thJob.length+1}`;
            const button = document.createElement('button');
            button.classList.add('suppbtn');
            button.innerHTML='X';
            newTh.appendChild(button);
            value.appendChild(newTh);
        }else{
            const newTd = document.createElement('td');
            newTd.classList.add(`job${thJob.length+1}`);
            const saisie = document.createElement('input');
            saisie.setAttribute('type','number');
            saisie.setAttribute('min','0');
            newTd.appendChild(saisie);
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
        });
        
        lineTabl.forEach(item => {
            const tdLine = item.querySelectorAll("td");
            tdLine.forEach(item => {
                console.log(item);
            })
        })
                
        
    }
    
})




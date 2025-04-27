
transportButton.addEventListener('click',event=>{
    const jobs = jobsContainer.querySelectorAll('.job');
    const jobsResumeCont = transportContainer.querySelector('.jobsResumeCont');
    

    let mineraisList = []; 

    jobs.forEach(job=>{
        if(job.querySelector('.jobTransportCheckbox').checked){ 
            /**
            * une cascade de IF qui verifie si la 2eme case du queryselector, qui correspond
            * au label avec la quantité n'est pas 'undefined' alors on peut incrémenté
            * la variable correspondante 
            */
            const minerals = job.querySelectorAll('.listeQuantites');
            
            minerals.forEach(mineral=>{

                const labels = mineral.querySelectorAll('label');
                labels.forEach(label=>{                     
                    if(mineraisList[label.classList[0]]=== undefined ){
                        mineraisList[label.classList[0]]=Number(delUnit(label.innerHTML,5));
                    }else{
                        mineraisList[label.classList[0]]+=Number(delUnit(label.innerHTML,5));
                    }         
                   
                })                          
            })         
        }      
    });
    
    jobsResumeCont.innerHTML="";
    let totalcSCU=0;
    let totalaUEC=0;
    
    for (const minerai in mineraisList) {
        const br = document.createElement('br');
        const label = document.createElement('label');
        totalcSCU+= Number(mineraisList[minerai]);
        totalaUEC+= Math.round(Number(mineraisList[minerai]) * Number(prixMineraiRefined[minerai][0]));
        label.innerHTML=`<span class="transportMineral">${minerai}</span>: ${separateur_nombre(mineraisList[minerai])} cSCU | ${separateur_nombre(Math.round(mineraisList[minerai] * prixMineraiRefined[minerai][0]))}  aUEC`;

        jobsResumeCont.appendChild(label);
        jobsResumeCont.appendChild(br);

    };
    
   
    /**
     * Je creer une tableau de tableau, le tableau interne :
     * l'indice 0 le nom du vaisseau
     * l'indice 1 la capacité de cargo
     * l'indice 2 le lien dudis vaisseau sur le site de RSI
     * /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ 
     * C'EST TEMPORAIRE, L'ORSQUE QUE LE TABLEAU SERA GéNéRé VIA BDD CA SERA LUI QUI PRENDRA LE RELAIS DANS L'AFFICHAGE
     * JE N AI VOLONTAIREMENT PAS MIS TOUT LES VAISSEAUX PRéSENT DANS L APPLI INITIAL PAR FLEMME CAR CA SERA CHANGé APRèS
     */
    let ships = [ 
        ["The Hull C",460800,"https://robertsspaceindustries.com/en/pledge/ships/hull/hull-c?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The C2 Hercules",69600,"https://robertsspaceindustries.com/en/pledge/ships/crusader-starlifter/c2-hercules?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Caterpillar",57600,"https://robertsspaceindustries.com/en/pledge/ships/drake-caterpillar/caterpillar?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Polaris",57600,"https://robertsspaceindustries.com/en/pledge/ships/polaris/polaris?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The M2 Hercules",46800,"https://robertsspaceindustries.com/en/pledge/ships/crusader-starlifter/m2-hercules?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Carrack",45600,"https://robertsspaceindustries.com/en/pledge/ships/carrack/carrack?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Reclaimer",42000,"https://robertsspaceindustries.com/en/pledge/ships/reclaimer/reclaimer?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The 890 Jump",38800,"https://robertsspaceindustries.com/en/pledge/ships/890-jump/890-jump?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Starfarer ",29100,"https://robertsspaceindustries.com/en/pledge/ships/misc-starfarer/starfarer?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The A2 Hercules",23400,"https://robertsspaceindustries.com/en/pledge/ships/crusader-starlifter/a2-hercules?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Starlancer MAX",22400,"https://robertsspaceindustries.com/en/pledge/ships/starlancer/Starlancer-MAX?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The RAFT",19200,"https://robertsspaceindustries.com/en/pledge/ships/raft/raft?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["THE Constellation Taurus",17400,"https://robertsspaceindustries.com/en/pledge/ships/rsi-constellation/constellation-taurus?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["The Zeus Mk II CL",12800,"https://robertsspaceindustries.com/en/pledge/ships/zeus-mk-ii/zeus-mk-ii-cl?utm_source=UEX&utm_medium=referral&utm_campaign=uex_vehicles_pledge_tab"],
        ["",00,""],

    ];

    ships = ships.sort(ComparatorShips);

    let images={
        "The Hull C":"https://media.robertsspaceindustries.com/k5ko5s3oet0r2/store_slideshow_large.jpg",
        "The C2 Hercules":"https://media.robertsspaceindustries.com/datp88pyz74xg/store_slideshow_large.jpg",
        "The Caterpillar":"https://robertsspaceindustries.com/media/6vue4kvm5b4fpr/store_slideshow_large/Front_B.jpg",
        "The Polaris":"https://media.robertsspaceindustries.com/oe0wikh6g3ltm/store_slideshow_large.jpg",
        "The M2 Hercules":"https://media.robertsspaceindustries.com/bi6gwwa49h7rk/store_slideshow_large.jpg",
        "The Carrack":"https://robertsspaceindustries.com/media/uacgp8oc20yekr/store_slideshow_large/Carrack.jpg",
        "The Reclaimer":"https://media.robertsspaceindustries.com/iweivr5xyt5j1/store_slideshow_large.jpg",
        "The 890 Jump":"https://media.robertsspaceindustries.com/dbl4dtyvzkqao/store_slideshow_large.jpg",
        "The Starfarer ":"https://robertsspaceindustries.com/media/r24pdushv6qrsr/store_slideshow_large/Starfarer_HR_ext_f.jpg",
        "The A2 Hercules":"https://media.robertsspaceindustries.com/0x7gcjyfe67l7/store_slideshow_large.jpg",
        "The Starlancer MAX":"https://media.robertsspaceindustries.com/ycdxrzxcd9kpw/store_slideshow_large.jpg",
        "The RAFT":"https://media.robertsspaceindustries.com/x4b15hx3vui08/store_slideshow_large.jpg",
        "THE Constellation Taurus":"https://robertsspaceindustries.com/media/446v92ef0mp27r/store_slideshow_large/Taurus_Front-Right.jpg",
        "The Zeus Mk II CL":"https://media.robertsspaceindustries.com/ypbhy8y8jsgea/store_slideshow_large.jpg",
        "":"",

    };
    const vaisseauxListCont = transportContainer.querySelector('.vaisseauxListCont');
    
    const vaisseauxPhotoCont = transportContainer.querySelector('.vaisseauxPhotoCont');
    const totalLabel = totalPanierCont.querySelector('.totalLabel');
    totalLabel.innerHTML=`${separateur_nombre(totalcSCU)} cSCU | ${separateur_nombre(totalaUEC)} aUEC`;

    vaisseauxListCont.innerHTML=`<table class="vaisseauxListTable">
                    <tr>
                        <th>Vaisseau</th>
                        <th>Capacité cargo</th>
                        <th>Cargo restant</th>
                    </tr>

                </table>`;
    const vaisseauxListTable = vaisseauxListCont.querySelector('.vaisseauxListTable');
    ships.forEach(ship=>{
        if(ship[1]>=totalcSCU){
            const tr = document.createElement('tr');
            const tdShip = document.createElement('td');
            const tdShipCargo = document.createElement('td');
            const tdShipCargoLeft = document.createElement('td');
            tr.classList.add('vaisseau');
            tdShip.innerHTML=`<a target="_blank "href="${ship[2]}">${ship[0]}</a>`;
            tdShipCargo.innerHTML=` ${separateur_nombre(ship[1])} cSCU`;
            tdShipCargoLeft.innerHTML=`${separateur_nombre(ship[1]-totalcSCU)} cSCU`;

            const link = tdShip.querySelector('a');
            link.addEventListener('mouseover',event=>{
                const image = document.createElement('img');
                image.setAttribute('src',images[event.target.innerHTML]);
                vaisseauxPhotoCont.innerHTML="";
                const label = document.createElement('label');
                label.innerHTML=event.target.innerHTML;
                vaisseauxPhotoCont.appendChild(image);
                vaisseauxPhotoCont.appendChild(document.createElement('hr'));
                vaisseauxPhotoCont.appendChild(label);

            })
            tr.appendChild(tdShip);
            tr.appendChild(tdShipCargo);
            tr.appendChild(tdShipCargoLeft);
            
            
            vaisseauxListTable.appendChild(tr);
            
        }
    })
    
    const vaisseauxTr = vaisseauxListTable.querySelectorAll('.vaisseau');
    //console.log(vaisseauxTr);
    if(vaisseauxTr.length==0){
        alert('Ta cargaison est trop volumineuse même pour le plus gros de tes ship !');
        return;
    }
  /* if(volumeCheckbox.checked==true){
        var audio = new Audio('./audio/Boing.mp3');   
        audio.volume=0.1;   
        audio.play();
    }*/
    transportContainer.classList.remove('hide');
})

//Fermeture de la fenêtre de transport
transportContainer.addEventListener("click", e => {
    const target = e.target;
    if (target.classList.contains("transportContainer") || target.classList.contains("bntCancelTransport")) {
        transportContainer.querySelectorAll('.job').forEach(job=>{
            job.remove();
        }); 
        transportContainer.classList.add('hide');
    }
    if(target.classList.contains('btnValidateTransport') && window.confirm("Es tu sur de vouloir valider le transport ?")){

        const jobs = jobsContainer.querySelectorAll('.job');

        jobs.forEach(job=>{
            if(job.querySelector('.jobTransportCheckbox').checked){ 
                delJob(job);
            }
        });
        transportContainer.classList.add('hide');

    }
}); 

document.querySelector('.bntScTrade').addEventListener('click',event=>{
    window.open('https://sc-trade.tools/commodities', '_blank');
});


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
        ["100i",200,"https://robertsspaceindustries.com/pledge/ships/origin-100/100i"],
        ["125a",200,"https://robertsspaceindustries.com/pledge/ships/origin-100/125a"],
        ["325a",400,"https://robertsspaceindustries.com/pledge/ships/origin-300/325a"],
        ["350r",400,"https://robertsspaceindustries.com/pledge/ships/origin-300/350r"],
        ["135c",600,"https://robertsspaceindustries.com/pledge/ships/origin-100/135c"],
        ["300i",800,"https://robertsspaceindustries.com/pledge/ships/origin-300/300i"],
        ["315p",1200,"https://robertsspaceindustries.com/pledge/ships/origin-300/315p"],
        ["600i Touring",1600,"https://robertsspaceindustries.com/pledge/ships/600i/600i-Touring"],
        ["600i Explorer",4000,"https://robertsspaceindustries.com/pledge/ships/600i/600i-Explorer"],
        ["890 JUMP",95000,"https://robertsspaceindustries.com/pledge/ships/890-jump/890-Jump"],
        ["A2 Hercules",23400,"https://robertsspaceindustries.com/pledge/ships/crusader-starlifter/A2-Hercules"],
        ["Apollo Medivac",2800,"https://robertsspaceindustries.com/pledge/ships/rsi-apollo/Apollo-Triage"],
        ["Apollo Triage",2800,"https://robertsspaceindustries.com/pledge/ships/rsi-apollo/Apollo-Triage"],
        ["Aurora CL",600,"https://robertsspaceindustries.com/pledge/ships/rsi-aurora/Aurora-CL"],
        ["Aurora MR",300,"https://robertsspaceindustries.com/pledge/ships/rsi-aurora/Aurora-MR"],
        ["Avenger Titan Renegade",800,"https://robertsspaceindustries.com/pledge/ships/aegis-avenger/Avenger-Titan-Renegade"],
        ["Bengal",1500000,""],
        ["C2 Hercules",62400,"https://robertsspaceindustries.com/pledge/ships/crusader-starlifter/C2-Hercules"],
        ["C8 Pisces",400,"https://robertsspaceindustries.com/pledge/ships/anvil-pisces/C8-Pisces"],
        ["Carrack",45600,"https://robertsspaceindustries.com/pledge/ships/carrack/Carrack-Expedition"],
        ["Caterpillar",56400,"https://robertsspaceindustries.com/pledge/ships/drake-caterpillar/Caterpillar-Best-In-Show-Edition"],
        ["Constellation ",9600,"https://robertsspaceindustries.com/pledge/ships/rsi-constellation/Constellation-Andromeda"],
        ["Constellation Phoenix",8000,"https://robertsspaceindustries.com/pledge/ships/rsi-constellation/Constellation-Phoenix"],
        ["Constellation Taurus",17400,"https://robertsspaceindustries.com/pledge/ships/rsi-constellation/Constellation-Taurus"],
        ["Corsair",7200,"https://robertsspaceindustries.com/pledge/ships/drake-corsair/Corsair"],
        ["Crucible",23000,"https://robertsspaceindustries.com/pledge/ships/crucible/Crucible"],
        ["Cutlass Black",4600,"https://robertsspaceindustries.com/pledge/ships/drake-cutlass/Cutlass-Black"],
        ["Cutlass Blue",1200,"https://robertsspaceindustries.com/pledge/ships/drake-cutlass/Cutlass-Blue"],
        ["Cutlass Red",1200,"https://robertsspaceindustries.com/pledge/ships/drake-cutlass/Cutlass-Red"],
        ["Endeavor",50000,"https://robertsspaceindustries.com/pledge/ships/misc-endeavor/Endeavor"],
        ["F7C Hornet",200,"https://robertsspaceindustries.com/pledge/ships/anvil-hornet/F7C-Hornet-Wildfire"],
        ["Freelancer",6600,"https://robertsspaceindustries.com/pledge/ships/misc-freelancer/Freelancer"],
        ["Freelancer DUR",2800,"https://robertsspaceindustries.com/pledge/ships/misc-freelancer/Freelancer-DUR"],
        ["Freelancer MAX", 	12200,"https://robertsspaceindustries.com/pledge/ships/misc-freelancer/Freelancer-MAX"],
        ["Freelancer MIS",2800,"https://robertsspaceindustries.com/pledge/ships/misc-freelancer/Freelancer-MIS"],
        ["Genesis Starliner",30000,"https://robertsspaceindustries.com/pledge/ships/misc-freelancer/Freelancer-MIS"],
        ["Hammerhead",4000,"https://robertsspaceindustries.com/pledge/ships/hammerhead/Hammerhead"],
        ["Hull A",4800,"https://robertsspaceindustries.com/pledge/ships/hull/Hull-A"],
        ["Hull B",38400,"https://robertsspaceindustries.com/pledge/ships/hull/Hull-B"],
        ["Hull C",38400,"https://robertsspaceindustries.com/pledge/ships/hull/Hull-C"],
        ["Hull D",2073600,"https://robertsspaceindustries.com/pledge/ships/hull/Hull-D"],
        ["Hull E",9830400,"https://robertsspaceindustries.com/pledge/ships/hull/Hull-E"],
        ["Idris-M",83100,"https://robertsspaceindustries.com/pledge/ships/aegis-idris/Idris-M"],
        ["Idris-P",99500,"https://robertsspaceindustries.com/pledge/ships/aegis-idris/Idris-P"],
        ["Javelin",540000,"https://robertsspaceindustries.com/pledge/ships/aegis-javelin/Javelin"],
        ["Kraken",379200,"https://robertsspaceindustries.com/pledge/ships/drake-kraken/Kraken-Privateer"],
        ["M2 Hercules",46800,"https://robertsspaceindustries.com/pledge/ships/crusader-starlifter/M2-Hercules"],
        ["MPUV Cargo",200,"https://robertsspaceindustries.com/pledge/ships/argo/MPUV-Cargo"],
        ["Merchantman ",358400,"https://robertsspaceindustries.com/pledge/ships/merchantman/Merchantman"],
        ["Mercury Star Runner",11400,"https://robertsspaceindustries.com/pledge/ships/merchantman/Merchantman"],
        ["Mustang Alpha",600,"https://robertsspaceindustries.com/pledge/ships/mustang/Mustang-Alpha"],
        ["Nautilus",6400,"https://robertsspaceindustries.com/pledge/ships/aegis-nautilus/Nautilus"],
        ["Nomad",2400,"https://robertsspaceindustries.com/pledge/ships/nomad/Nomad"],
        ["Perseus",5000,"https://robertsspaceindustries.com/pledge/ships/perseus/Perseus"],
        ["Pioneer",60000,"https://robertsspaceindustries.com/pledge/ships/pioneer/Pioneer"],
        ["Polaris",21600,"https://robertsspaceindustries.com/pledge/ships/polaris/Polaris"],
        ["Reclaimer",18000,"https://robertsspaceindustries.com/pledge/ships/reclaimer/Reclaimer"],
        ["Reliant Kore",400,"https://robertsspaceindustries.com/pledge/ships/reliant/Reliant-Kore"],
        ["Reliant Sen",200,"https://robertsspaceindustries.com/pledge/ships/reliant/Reliant-Sen"],
        ["SRV",1000,"https://robertsspaceindustries.com/pledge/ships/argo-srv/SRV"],
        ["Starfarer",19500,"https://robertsspaceindustries.com/pledge/ships/misc-starfarer/Starfarer"],
        ["Vulcan",1200,"https://robertsspaceindustries.com/pledge/ships/vulcan/Vulcan"],
        ["Vulture",1200,"https://robertsspaceindustries.com/pledge/ships/drake-vulture/Vulture"],
    ];

    ships = ships.sort(ComparatorShips);

    let images={
        "100i":"https://starcitizen.tools/images/thumb/5/5a/100i_Microtech.jpg/400px-100i_Microtech.jpg",      
        "125a":"https://starcitizen.tools/images/thumb/1/1e/125a_-_Shooting_-_Fly_though_debris.png/400px-125a_-_Shooting_-_Fly_though_debris.png",
        "135c":"https://starcitizen.tools/images/thumb/c/c6/Orig-135c-3.11-space-flight.jpg/400px-Orig-135c-3.11-space-flight.jpg",
        "300i":"https://starcitizen.tools/images/thumb/4/48/300i_-_Flying_over_cloudtops.jpg/400px-300i_-_Flying_over_cloudtops.jpg",
        "315p":"https://starcitizen.tools/images/thumb/b/ba/315p_-_Flying_high_over_clouds.jpg/400px-315p_-_Flying_high_over_clouds.jpg",
        "325a":"https://starcitizen.tools/images/thumb/7/71/325a_-_Flying_fast_over_clouded_mountains.jpg/400px-325a_-_Flying_fast_over_clouded_mountains.jpg",
        "350r":"https://starcitizen.tools/images/thumb/5/5f/350r_-_Flying_over_Daymar_x2.jpg/400px-350r_-_Flying_over_Daymar_x2.jpg",
        "600i Touring":"https://starcitizen.tools/images/thumb/4/45/600i_inside_hangar.png/400px-600i_inside_hangar.png",
        "600i Explorer":"https://starcitizen.tools/images/thumb/4/45/600i_inside_hangar.png/400px-600i_inside_hangar.png",
        "890 JUMP":"https://starcitizen.tools/images/thumb/7/76/890_Jump_Leaving_Hurston_3.6.png/400px-890_Jump_Leaving_Hurston_3.6.png",
        "A2 Hercules":"https://starcitizen.tools/images/thumb/9/9b/Hercules_A2_-_Flying_and_firing_over_bombed_Area_18.jpg/400px-Hercules_A2_-_Flying_and_firing_over_bombed_Area_18.jpg",
        "Apollo Medivac":"https://starcitizen.tools/images/thumb/8/89/Medivac_-_Under_attack_above_world_while_rescuing_with_drone_-_Rear_Starboard.jpg/400px-Medivac_-_Under_attack_above_world_while_rescuing_with_drone_-_Rear_Starboard.jpg",
        "Apollo Triage":"https://starcitizen.tools/images/thumb/1/18/Apollos_InFlight_Concept.jpg/400px-Apollos_InFlight_Concept.jpg",
        "Aurora CL":"https://starcitizen.tools/images/thumb/a/ac/Aurora_CL_in_black_room_-_Isometric.png/200px-Aurora_CL_in_black_room_-_Isometric.png",
        "Aurora MR":"https://starcitizen.tools/images/thumb/3/34/Aurora_MR_flying_over_Daymar.jpg/171px-Aurora_MR_flying_over_Daymar.jpg",
        "Avenger Titan":"https://starcitizen.tools/images/thumb/4/4b/Avenger_Titan_3.2_sale_Titan_01-Squashed.jpg/400px-Avenger_Titan_3.2_sale_Titan_01-Squashed.jpg",
        "Bengal":"https://starcitizen.tools/images/thumb/6/6a/Bengal_-_In_space_upper_portside.jpg/400px-Bengal_-_In_space_upper_portside.jpg",
        "C2 Hercules":"https://starcitizen.tools/images/thumb/c/cc/C2_Feature_Style_clouds.jpg/400px-C2_Feature_Style_clouds.jpg",
        "C8 Pisces":"https://starcitizen.tools/images/thumb/a/a8/EXT_Pisces_Cave_112019-Min.jpg/400px-EXT_Pisces_Cave_112019-Min.jpg",
        "Carrack":"https://starcitizen.tools/images/thumb/9/92/Carrack_over_microTech_3.8.png/400px-Carrack_over_microTech_3.8.png",
        "Caterpillar":"https://starcitizen.tools/images/thumb/8/8b/Caterpillar_firing_guns_-_Front_Port.jpg/400px-Caterpillar_firing_guns_-_Front_Port.jpg",
        "Constellation ":"https://starcitizen.tools/images/thumb/1/17/Constellation-phoenix-flyby-01.jpg/400px-Constellation-phoenix-flyby-01.jpg",
        "Constellation Phoenix":"https://starcitizen.tools/images/thumb/1/17/Constellation-phoenix-flyby-01.jpg/400px-Constellation-phoenix-flyby-01.jpg",
        "Constellation Taurus":"https://starcitizen.tools/images/thumb/1/17/Constellation-phoenix-flyby-01.jpg/400px-Constellation-phoenix-flyby-01.jpg",
        "Corsair":"https://starcitizen.tools/images/thumb/d/dd/DRAK_Corsair_promo_shot05.jpg/400px-DRAK_Corsair_promo_shot05.jpg",
        "Crucible":"https://starcitizen.tools/images/thumb/4/40/Crucible_Repairs.jpg/400px-Crucible_Repairs.jpg",
        "Cutlass Black":"https://starcitizen.tools/images/thumb/8/87/CutlassBlack_TouchingDown.png/400px-CutlassBlack_TouchingDown.png",
        "Cutlass Blue":"https://starcitizen.tools/images/thumb/d/d4/SKU_Cutlass_Blue.jpg/400px-SKU_Cutlass_Blue.jpg",
        "Cutlass Red":"https://starcitizen.tools/images/thumb/a/ac/Cutlass_Red_Squad_Concept.jpg/400px-Cutlass_Red_Squad_Concept.jpg",
        "Endeavor":"https://starcitizen.tools/images/thumb/d/d6/Endeavor.jpg/400px-Endeavor.jpg",
        "F7C Hornet":"https://starcitizen.tools/images/thumb/b/b6/F7C_-_Landed_in_Area18_hangar_-_Front_Port.jpg/400px-F7C_-_Landed_in_Area18_hangar_-_Front_Port.jpg",
        "Freelancer":"https://starcitizen.tools/images/thumb/9/9f/Freelancer.jpg/400px-Freelancer.jpg",
        "Freelancer DUR":"https://starcitizen.tools/images/thumb/9/98/MISC-freelancer-dur-side-3.4.1.jpg/400px-MISC-freelancer-dur-side-3.4.1.jpg",
        "Freelancer MAX":"https://starcitizen.tools/images/thumb/9/96/Freelancer_MAX_-_flying_above_grey_clouds.jpg/400px-Freelancer_MAX_-_flying_above_grey_clouds.jpg",
        "Freelancer MIS":"https://starcitizen.tools/images/thumb/1/14/Freelancer_MIS_3.4.png/400px-Freelancer_MIS_3.4.png",
        "Genesis Starliner":"https://starcitizen.tools/images/thumb/f/f0/Genesis_Starliner_-_Flying_away_from_Terra_Prime.jpg/400px-Genesis_Starliner_-_Flying_away_from_Terra_Prime.jpg",
        "Hammerhead":"https://starcitizen.tools/images/thumb/c/c8/Ext_03_03-Min.png/400px-Ext_03_03-Min.png",
        "Hull A":"https://starcitizen.tools/images/thumb/a/a8/HullAInFlight.jpg/400px-HullAInFlight.jpg",
        "Hull B":"https://starcitizen.tools/images/thumb/a/af/HullBLoaded.jpg/400px-HullBLoaded.jpg",
        "Hull C":"https://starcitizen.tools/images/thumb/c/c1/Hull-C_over_moon_-_Port.jpg/400px-Hull-C_over_moon_-_Port.jpg",
        "Hull D":"https://starcitizen.tools/images/thumb/8/8d/Hull_D_-_Docked_at_large_station.jpg/400px-Hull_D_-_Docked_at_large_station.jpg",
        "Hull E":"https://starcitizen.tools/images/thumb/0/06/HullEFront.jpg/400px-HullEFront.jpg",
        "Idris-M":"https://starcitizen.tools/images/thumb/8/8a/UEES_Stanton_-_Isometric.jpg/400px-UEES_Stanton_-_Isometric.jpg",
        "Idris-P":"https://starcitizen.tools/images/thumb/8/8a/UEES_Stanton_-_Isometric.jpg/400px-UEES_Stanton_-_Isometric.jpg",
        "Javelin":"https://starcitizen.tools/images/thumb/8/86/Javelin-fireworks-invictus-2950.jpg/400px-Javelin-fireworks-invictus-2950.jpg",
        "Kraken":"https://starcitizen.tools/images/thumb/0/03/Kraken_AboveShipMisty_Concept.jpg/400px-Kraken_AboveShipMisty_Concept.jpg",
        "M2 Hercules":"https://starcitizen.tools/images/thumb/8/8e/M2_Gallery_Fly_Front.jpg/400px-M2_Gallery_Fly_Front.jpg",
        "MPUV Cargo":"https://starcitizen.tools/images/thumb/7/7a/MPUV_1C_-_flying_over_world.jpg/400px-MPUV_1C_-_flying_over_world.jpg",
        "Merchantman ":"https://starcitizen.tools/images/thumb/8/8c/Merchantman_Concept_-_Citizen_Con_2021.png/400px-Merchantman_Concept_-_Citizen_Con_2021.png",
        "Mercury Star Runner":"https://starcitizen.tools/images/thumb/b/b8/Mercury_Star_Runner_over_Hurston.png/400px-Mercury_Star_Runner_over_Hurston.png",
        "Mustang Alpha":"https://starcitizen.tools/images/thumb/2/2b/Mustang_Alpha_x2_in_formation_moving_fast_through_field.jpg/400px-Mustang_Alpha_x2_in_formation_moving_fast_through_field.jpg",
        "Nautilus":"https://starcitizen.tools/images/thumb/7/7c/Nautilus_-_Deploying_mines_-_Front_Starboard.png/400px-Nautilus_-_Deploying_mines_-_Front_Starboard.png",
        "Nomad":"https://starcitizen.tools/images/thumb/5/59/Nomad_Flying_Concept.jpg/400px-Nomad_Flying_Concept.jpg",
        "Perseus":"https://starcitizen.tools/images/thumb/3/3b/RSI-Perseus-promo_01.jpg/400px-RSI-Perseus-promo_01.jpg",
        "Pioneer":"https://starcitizen.tools/images/thumb/2/2a/Pioneer_Side_Concept.jpg/400px-Pioneer_Side_Concept.jpg",
        "Polaris":"https://starcitizen.tools/images/thumb/d/d7/Ship-polaris-landed.jpg/400px-Ship-polaris-landed.jpg",
        "Reclaimer":"https://starcitizen.tools/images/thumb/f/f5/Reclaimer_-_Near_world_lookings_at_wreckage.jpg/400px-Reclaimer_-_Near_world_lookings_at_wreckage.jpg",
        "Reliant Kore":"https://starcitizen.tools/images/thumb/b/ba/Reliant_Kore_Landing_in_New_Babbage_Alpha_3.9.jpg/200px-Reliant_Kore_Landing_in_New_Babbage_Alpha_3.9.jpg",
        "Reliant Sen":"https://starcitizen.tools/images/thumb/2/2f/Reliant_Sen_Formation_Alpha_3.9.jpg/200px-Reliant_Sen_Formation_Alpha_3.9.jpg",
        "SRV":"https://starcitizen.tools/images/thumb/a/ae/EriCitySeverus.png/400px-EriCitySeverus.png",
        "Starfarer":"https://starcitizen.tools/images/thumb/f/fc/Starfarer_-_Flying_over_Lorville_with_traffic.jpg/400px-Starfarer_-_Flying_over_Lorville_with_traffic.jpg",
        "Vulcan":"https://starcitizen.tools/images/thumb/c/c3/Vulcan_-_Flying_repairing_Eclipse_with_drones.jpg/400px-Vulcan_-_Flying_repairing_Eclipse_with_drones.jpg",
        "Vulture":"https://starcitizen.tools/images/thumb/e/e0/Vulture_Flying_Concept.jpg/400px-Vulture_Flying_Concept.jpg",
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

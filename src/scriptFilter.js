/**
* Ajoute l'écoute sur l'input de filtre, si il est focus ca affiche la div de choix
*/
customSelect.addEventListener('focus',event=>{
    customFilterData.classList.remove('hide');
})

/**
* Ajoute sur l'input de filtre, s'il n'est plus focus ca cache la div de choix
*/
document.querySelector('body').addEventListener('click',event=>{
    const target = event.target;
    if(!target.classList.contains('customFilterData')&& !target.classList.contains('customSelect')){
        customFilterData.classList.add('hide');
    }
    
})

customFilterData.addEventListener('click',event=>{
    const target= event.target;
    if(target.classList.contains('filterData')){     
        customSelect.value=target.innerHTML;
        filtrage();
    }
})

// Update du Filtre -----------------------------------------------------------
selectFiltre.addEventListener("input", filtrage);
function filtrage() {
    const jobs = jobsContainer.querySelectorAll(".job");
    const filter = selectFiltre.value;
    let i = 0;
    jobs.forEach(job => {
        // Endroits (divs) où faire la recherche 
        // Le regex pour que la recherche soit insensible à la casse
        const lieu = job.querySelector('label.Raffinery').innerText.match(new RegExp(`${filter}`, "gi"));
        const mineraiCont = job.querySelector('.listeMinerais').innerText.match(new RegExp(`${filter}`, "gi"));
        const title = job.querySelector("label.titleJob");

        // Affichage ou non en fonction des constantes
        if (lieu || mineraiCont) {
            // Trouvé !
            job.classList.remove("hide");
            // console.log(job);

        } else {
            // Pas trouvé 
            job.classList.add("hide");
            const checkbox = job.querySelector("input.jobTransportCheckbox");
            checkbox.checked = false;
            job.classList.remove("shadowChecked");
        }
    });

    // jobs.forEach(job => {
    //     if (!job.classList.contains("hide")) {
    //         title.innerText = i--;
            
    //     }
    // });



    // Calculs
    initiateCalculateValue();

    updateCheckboxs();

    // Setup du cookie
    $.ajax({
        url:"./src/connect.php",
        method: "POST",
        async: true,
        data: {filter: filter},
        success: function(res) {
        }
    });
}

xSelect.addEventListener("click", () => {
    selectFiltre.value = "";
    filtrage();
});

/**
 * Fonction qui va update le temps restant des labels qui en ont besoin à chaque secondes
 */
setInterval(updateTime, 1000);
function updateTime() {
    
    const jobs = jobsContainer.querySelectorAll(".job");
    jobs.forEach(jobAct => {
        const tProgress = jobAct.querySelector(".tProgress");
        const label = jobAct.querySelector("label.heurePlace");
        const bar = label.parentNode.querySelector(".tProgress");

        if (Number(delUnit(tProgress.style.width, 1)) !== 100 && tProgress.style.width !== "") {
            let time = label.innerHTML.split(":");

            // console.log(time[0] === '00', time[1] === '00', time[2] === '00');
            // Vérif si c'est fini ou pas
            if (time[0] === '00' && time[1] === '00' && time[2] === '00') {
                label.innerHTML = "Terminé !";
                bar.style.width = "100%";
                bar.style.backgroundColor = "#05c14ea3";

            } else {
                // Calcul de pourcentage pour la barre de progression
                let percentBase = Number(delUnit(bar.style.width, 1));
                percentBase = 100 - percentBase;
                let valPart = 0;
                valPart += Number(time[2]);
                valPart += Number(time[1]) * 60;
                valPart += Number(time[0]) * 3600;
                let pTotal = (valPart * 100) / percentBase;

                // Récup du texte du label et décrémentation du temps
                time[2] = Number(time[2]) - 1;
                if (time[2] < 0) {
                    time[1] = Number(time[1]) - 1;
                    time[2] = 59;

                    if (time[1] < 0) {
                        time[0] = Number(time[0]) - 1;
                        time[1] = 59;
                    }
                }

                // Vérif de s'il y a un nombre sans son 0 (9 et pas 09)
                for (let i = 0; i < time.length; i++) {
                    time[i] = String(time[i]);
                    if (time[i].length < 2) {
                        time[i] = "0" + String(time[i])
                    }
                }

                // Progression de la barre via calcul de pourcentage
                let valPart2 = 0;
                valPart2 += Number(time[2]);
                valPart2 += Number(time[1]) * 60;
                valPart2 += Number(time[0]) * 3600;
                let nextPercent = (valPart2 * 100) / pTotal;
                nextPercent = 100 - nextPercent;

                // Affichage
                label.innerHTML = time.join(":");
                bar.style.width = nextPercent + '%';
            }
        } else if (Number(delUnit(tProgress.style.width, 1)) === 100) {
            label.innerHTML = "Terminé !";
            bar.style.width = "100%";
            bar.style.backgroundColor = "#05c14ea3";
        }
    });
}
 

const labelAide = document.querySelector('.labelAide');

labelAide.addEventListener('click',event=>{
    const aideContainer = document.querySelector('.aideContainer');
    aideContainer.classList.remove('hide');

    aideContainer.addEventListener("click", e => {
        //console.log(e.target);
        if (e.target.classList.contains("aideContainer") || e.target.classList.contains("btnCloseAide")) {

            aideContainer.classList.add('hide');
        }
    });
})

const statLabel = document.querySelector('.labelStat');

statLabel.addEventListener('click',event=>{
    const statistiqueContainer = document.querySelector('.statistiqueContainer');
    statistiqueContainer.classList.remove('hide');

    statistiqueContainer.addEventListener("click", e => {
        //console.log(e.target);
        if (e.target.classList.contains("statistiqueContainer") || e.target.classList.contains("btnCloseStat")) {

            statistiqueContainer.classList.add('hide');
        }
    });
})
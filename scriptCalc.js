const scrollContainer = document.querySelector('.jobsContainer');

scrollContainer.addEventListener('wheel',event=>{
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
})

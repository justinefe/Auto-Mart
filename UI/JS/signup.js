const navmenu = document.querySelector(".navmenu");
const navul = document.querySelector("nav ul");

navmenu.addEventListener('click', event => {
   
    if(navmenu.classList.contains('close')) {
        navmenu.classList.remove("close");
        navul.classList.remove('shownav');
    }
    else {
        navmenu.classList.add("close");
        navul.classList.add('shownav');
    }
})
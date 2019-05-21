const navmenu = document.querySelector(".navmenu");
const navul = document.querySelector("nav ul");
const view = document.querySelectorAll('.carCard');

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

// view.forEach(card => {
//     card.addEventListener('click', () => {
//         window.location = 'login.html';
//     })
// })
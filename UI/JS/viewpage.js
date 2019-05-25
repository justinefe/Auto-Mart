const viewPage = document.querySelector('#view');
const carCard = document.querySelectorAll('.carCard');
const hide = document.querySelector('.hide');
const purchase = document.querySelector('#purchase');
const continues = document.querySelector('#continue');
const confirm = document.querySelector('#confirmpu');


carCard.forEach(del => {
    del.addEventListener('click', (e) => {
        hide.style.display = "none";
        viewPage.showModal();
    });
});

continues.addEventListener('click', (event) => {
    viewPage.close();
})

confirm.addEventListener('click', (event) => {
    viewPage.close();
})

purchase.addEventListener('click',(event) => {
    if(hide.style.display === "none"){
        hide.style.display = "block";
    }
    else{
        hide.style.display = "none";
    }
})
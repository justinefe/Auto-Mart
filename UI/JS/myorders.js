const myOdersDialog = document.querySelector('#updateme');
const myOrderUpdateButton = document.querySelectorAll('.updates-btn');
const confirmButton = document.querySelector('.delete-btn');
const cancelButton = document.querySelector('.cancel-btn');

myOrderUpdateButton.forEach(del => {
    del.addEventListener('click', (e) => {
        myOdersDialog.showModal();
    });
});

confirmButton.addEventListener('click', (e) => {
    myOdersDialog.close();
});

cancelButton.addEventListener('click', (e) => {
    myOdersDialog.close();
});
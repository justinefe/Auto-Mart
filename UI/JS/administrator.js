const deletes = document.querySelectorAll('.delete');
const adminBox = document.querySelector('.admin');
const updateButton = document.querySelector('.delete-btn');
const cancelButton = document.querySelector('.cancel-btn');


deletes.forEach(del => {
    del.addEventListener('click', (e) => {
        adminBox.showModal();
    });
});


updateButton.addEventListener('click', (e) => {
    adminBox.close();
});

cancelButton.addEventListener('click', (e) => {
    adminBox.close();
});

const deletes = document.querySelectorAll('.delete');
const update = document.querySelectorAll('#update');
const solds = document.querySelectorAll('#sold')
const icon = document.querySelector('#icon');
const nocon = document.querySelector('#nocon');
const updateButton = document.querySelector('.update-btn');
const soldButton = document.querySelector('.sold-btn');
const cancelButton = document.querySelector('.cancel-btn');
const cancelSoldButton = document.querySelector('.cancelsold-btn');




deletes.forEach(del => {
    del.addEventListener('click', (e) => {
        icon.showModal();
    });
});

update.forEach(del => {
    del.addEventListener('click', (e) => {
        icon.showModal();
    });
});

solds.forEach(del => {
    del.addEventListener('click', (e) => {
        nocon.showModal();
    });
});


updateButton.addEventListener('click', (e) => {
    icon.close();
});

cancelButton.addEventListener('click', (e) => {
    icon.close();
});

soldButton.addEventListener('click', (e) => {
    nocon.close();
});

cancelSoldButton.addEventListener('click', (e) => {
    nocon.close();
});
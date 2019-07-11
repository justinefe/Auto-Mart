/* eslint-disable no-undef */
const form = document.querySelector('form');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const loader = document.querySelector('.loader');

const person = () => {
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const password = document.querySelector('#password').value;
  const details = {
    firstName, lastName, email, address, password,
  };
  return details;
};
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  loader.style.display = 'block';


  const userDetails = person();
  const { responseObj, statusCode } = await fetchCall(`${applocal}auth/signup`, 'post', userDetails);
  if (statusCode === 201) {
    loader.style.display = 'none';
    success.textContent = 'Succesfull';
    window.location = 'userprofile.html';
  }
  if (responseObj.error) {
    loader.style.display = 'none';
    result.textContent = 'Oops!';
    error.textContent = responseObj.error;
  }

  console.log(responseObj);
});
form.addEventListener('click', () => {
  error.textContent = '';
  result.textContent = '';
});

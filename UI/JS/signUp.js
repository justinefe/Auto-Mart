/* eslint-disable no-undef */
const form = document.querySelector('form');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const loader = document.querySelector('.loader');

const getSignUpInfo = () => {
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
const getLoginInfo = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const details = {
    email, password,
  };
  return details;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let userDetails;
  loader.style.display = 'block';
  const thisForm = event.target;
  const thisFormId = thisForm.id;
  if (thisFormId === 'loginform') userDetails = getLoginInfo();
  else userDetails = getSignUpInfo();
  const url = (thisFormId === 'loginform') ? `${applocal}auth/signin` : `${applocal}auth/signup`;
  const { responseObj, statusCode } = await fetchCall(url, 'post', userDetails);
  if (statusCode === 201 || statusCode === 200) {
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

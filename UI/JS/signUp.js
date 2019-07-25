/* eslint-disable camelcase */
/* eslint-disable no-undef */
const form = document.querySelector('form');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const loader = document.querySelector('.loader');

const getSignUpInfo = () => {
  const first_name = document.querySelector('#firstName').value;
  const last_name = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const password = document.querySelector('#password').value;
  const details = {
    first_name, last_name, email, address, password,
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
  const url = (thisFormId === 'loginform') ? `${appurl}auth/signin` : `${appurl}auth/signup`;
  const { responseObj, statusCode } = await fetchCall(url, 'post', userDetails);
  if (statusCode === 201 || statusCode === 200) {
    loader.style.display = 'none';
    success.textContent = 'Succesfull';
    const { token, is_admin } = responseObj.data;
    localStorage.setItem('token', token);
    const webpage = is_admin ? `${githubPage}/administrator.html` : `${githubPage}/viewpage.html`;
    window.location.replace(webpage);
  }
  if (responseObj.error) {
    loader.style.display = 'none';
    result.textContent = 'Oops!';
    error.textContent = responseObj.error;
  }
});
form.addEventListener('click', () => {
  error.textContent = '';
  result.textContent = '';
});

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let token;
const appurl = 'https://justinefeautomart.herokuapp.com/api/v1/';
const applocal = 'http://localhost:3001/api/v1/';
const githubPage = 'https://justinefe.github.io/Auto-Mart/UI';

const fetchCall = async (url, method, body = undefined) => {
  const object = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      token,
    }),
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, object);
    const statusCode = response.status;
    const responseObj = await response.json();
    console.log(responseObj);
    return { responseObj, statusCode };
  } catch (err) {
    const error = true;
    return { error };
  }
};

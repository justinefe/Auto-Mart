/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { token } = localStorage;
const app = 'https://justinefeautomart.herokuapp.com/api/v1/';
const applocal = 'http://localhost:3001/api/v1/';
const githubPage = 'https://github.com/justinefe/Auto-Mart/UI';
const website = githubPage;
const appurl = app;

const fetchCall = async (url, method, body = undefined) => {
  // removeNetErr();
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
    // networkErr();
    const error = true;
    return { error };
  }
};

// fetchCall(`${applocal}`, 'get');
/* eslint-disable eol-last */
const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
const signupForm = document.querySelector('#signup-form');
const profile = document.querySelector('#userProfile');
const loginForm = document.querySelector('#login-form');



/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const otherName = document.querySelector('#other-name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const phonenumber = document.querySelector('#phone-number').value;
    const passportUrl = document.querySelector('#passport').value;
    const inputValue = {
      firstName, lastName, email, password, passportUrl, phonenumber, otherName,
    };
    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          window.sessionStorage.token = data.data[0].token;
          // window.localStorage.user = data.data[0].user;
          const userData = [];
          userData.push(data.data[0].user);
          sessionStorage.setItem('userData', JSON.stringify(userData));
          document.querySelector('#signup-form')
            .innerHTML = `<div class="on-signup">
                           <h2>Signup successful</h2>
                           <h3>Welcome</h3> 
                           <p>${data.data[0].user.fullName}</p>
                          </div>`;
          setTimeout(() => {
            window.location.replace('profilepage.html');
          }, 5000);
        } else {
          let output = '<h3>Error<h3/>';
          Object.keys(data.data[0]).forEach((key) => {
            output += `<p>${data.data[0][key]}<p/>`;
          });
          document.querySelector('#signup-form')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
            <h3>${error}<h3/>`;
      });
  });
}


const getUser = () => {
  const userProfile = JSON.parse(sessionStorage.getItem('userData'));
  profile.innerHTML = userProfile[0].fullName;
};

if (profile) {
  profile.addEventListener('load', getUser());
}

/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
const authLogin = () => {
  const userProfile = JSON.parse(sessionStorage.getItem('userData'));
  const role = userProfile[0].isAdmin;
  if (role === false) window.location.replace('profilepage.html');
  if (role === true) {
    window.location.replace('adminpage.html');
  }
};


/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          window.sessionStorage.token = data.data[0].token;
          const userData = [];
          userData.push(data.data[0].user);
          sessionStorage.setItem('userData', JSON.stringify(userData));
          document.querySelector('#login-form')
            .innerHTML = `<div class="on-signup">
                        <h3>Welcome Back</h3> 
                        <p>${data.data[0].user.fullName}</p>
                        </div>`;
          setTimeout(() => {
            authLogin();
          }, 5000);
        } else {
          document.querySelector('#login-form')
            .innerHTML = `<h2>${data.data[0].errors.form}<h2/>
          <h3>Please check your login details<h3/>`;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
            <h3>${error}<h3/>`;
      });
  });
}
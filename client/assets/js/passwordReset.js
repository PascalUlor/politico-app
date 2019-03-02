/* eslint-disable eol-last */
const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
const passwordReset = document.querySelector('#reset-password');
const splitUrl = document.URL.split('?')[1];
const token = splitUrl.split('=')[1];


/**
 *Asigns event listener to reset password  form
 *@param {object} e -The event parameter
 *
 */
if (passwordReset) {
  passwordReset.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.querySelector('#password').value;
    const inputValue = { password };

    fetch(`${baseUrl}/auth/resetpassword?token=${token}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json, text/plain */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          const userData = [];
          userData.push(data.message);
          sessionStorage.setItem('userData', JSON.stringify(userData));
          document.querySelector('#reset-password')
            .innerHTML = `<div class="on-signup">
                                 <h2>${data.message}</h2>
                            </div>`;
        } else {
          let output = '<h3>Error<h3/>';
          output += `<p>${data.message}<p/>`;
          document.querySelector('#reset-password')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
                <h3>${error}<h3/>`;
      });
  });
}
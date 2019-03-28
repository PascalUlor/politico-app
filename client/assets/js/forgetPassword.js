const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
const forgetPassword = document.querySelector('#forgot-password');

/**
 *Asigns event listener to forgot password  form
 *@param {object} e -The event parameter
 *
 */
if (forgetPassword) {
  forgetPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const inputValue = { email };

    fetch(`${baseUrl}/auth/forgotpassword`, {
      method: 'POST',
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
          document.querySelector('#forgot-password')
            .innerHTML = `<div class="on-signup">
                             <h2>${data.message}</h2>
                        </div>`;
        } else {
          let output = '<h3>Error<h3/>';
          output += `<p>${data.message}<p/>`;
          document.querySelector('#forgot-password')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
            <h3>${error}<h3/>`;
      });
  });
}

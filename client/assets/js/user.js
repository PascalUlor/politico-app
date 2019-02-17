const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
const signupForm = document.querySelector('#signup-form');


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
          window.localStorage.token = data.data[0].token;
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

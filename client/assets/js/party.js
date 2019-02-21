const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
const token = `${sessionStorage.token}`;
const createPartytForm = document.querySelector('#myparty');
const partyTable = document.querySelector('#body');


/*
* Adds an eventListener with a callback to GET all parties for a logged in user
*/
const getParty = () => {
  fetch(`${baseUrl}/parties`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    //   'x-access-token': token,
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (sessionStorage.getItem('parties') === null || sessionStorage.getItem('parties') !== data) {
          const parties = [];
          parties.push(data.data);
          sessionStorage.setItem('parties', JSON.stringify(parties));
        } else {
          const parties = JSON.parse(sessionStorage.getItem('parties'));
          parties.push(data.data);
          sessionStorage.setItem('parties', JSON.stringify(parties));
        }

        const userData = JSON.parse(sessionStorage.getItem('parties'));
        const newParty = document.querySelector('#table');

        newParty.innerHTML = '';
        for (let n = 0; n <= Object.keys(userData[0]).length - 1; n += 1) {
          const id = `${userData[0][n].id}`;
          const createdat = `${userData[0][n].createdat}`;
          const name = `${userData[0][n].name}`;
          newParty.innerHTML += `<tr>
          <td>${n + 1}</td>
          <td onclick="toggleModal('party-details', 'modal')">${name}</td>
          <td>${id}</td>
          <td>${createdat}</td>
          </tr>`;
        }
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};

/*
* Adds an eventListener with a callback to create a party inputs
*
* @param {object} submitEvent - The submitEvent
*/
if (createPartytForm) {
  createPartytForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const hqAddress = document.querySelector('#hqAddress').value;
    const email = document.querySelector('#email').value;
    const logoUrl = document.querySelector('#logoUrl').value;
    const phonenumber = document.querySelector('#phonenumber').value;
    const about = document.querySelector('#about').value;

    fetch(`${baseUrl}/parties`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        name, hqAddress, email, logoUrl, phonenumber, about,
      }),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          document.querySelector('#myparty')
            .innerHTML = `
                        <div class="on-signup">
                        <h2>${data.message}</h2>
                        </div>`;
          setTimeout(() => {
            window.location.replace('politicalparties.html');
          }, 5000);
        } else {
          let output = '<h3>Error</h3>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}</p>`;
          });
          document.querySelector('#party')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error</h2>
            <h3>${error}</h3>`;
      });
  });
}

if (partyTable) {
  partyTable.addEventListener('load', getParty());
}

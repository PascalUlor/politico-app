// const baseUrl = 'https://the-politico.herokuapp.com/api/v1'; // Heroku
const baseUrl = 'http://localhost:3001/api/v1'; // localhost
const token = `${sessionStorage.token}`;
const createPartytForm = document.querySelector('#myparty');
const partyPage = document.querySelector('#body');
const adminPage = document.querySelector('#admin-party');


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

        const partyData = JSON.parse(sessionStorage.getItem('parties'));
        const newParty = document.querySelector('#table');
        const adminTable1 = document.querySelector('#admin-table-1');
        const partyInfo = newParty || adminTable1;
        partyInfo.innerHTML = '';
        if (partyPage) {
          for (let n = 0; n <= Object.keys(partyData[0]).length - 1; n += 1) {
            const id = `${partyData[0][n].id}`;
            const createdat = `${partyData[0][n].createdat}`;
            const name = `${partyData[0][n].name}`;

            partyInfo.innerHTML += `<tr class="view">
          <td>${n + 1}</td>
          <td>${name}</td>
          <td>${id}</td>
          <td>${createdat}</td>
          </tr>`;
          }
        }
        if (adminPage) {
          for (let n = 0; n <= Object.keys(partyData[0]).length - 1; n += 1) {
            const createdat = `${partyData[0][n].createdat}`;
            const name = `${partyData[0][n].name}`;
            partyInfo.innerHTML += `<tr>
        <td>${n + 1}</td>
        <td>Party</td>
        <td  class="view">${name}</td>
        <td>${createdat}</td>
        <td><i class="fas fa-edit table-icon editData"></i></td>
        <td><i onclick="toggleModal('party-delete', 'delete')" class="fas fa-trash-alt table-icon"></i></td>
        </tr>`;
          }
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
    const formData = new FormData(createPartytForm);

    fetch(`${baseUrl}/parties`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-access-token': token,
      },
      body: formData,
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          document.querySelector('#myparty')
            .innerHTML = `
                        <div class="on-signup">
                        <h2>${data.message}</h2>
                        </div>`;
          setTimeout(() => {
            window.location.replace('adminpage.html');
          }, 5000);
        } else {
          let output = '<h3>Error</h3>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}</p>`;
          });
          document.querySelector('#myparty')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error</h2>
            <h3>${error}</h3>`;
      });
  });
}

if (partyPage) {
  partyPage.addEventListener('load', getParty());
}

if (adminPage) {
  adminPage.addEventListener('load', getParty());
}

const baseUrl = 'https://the-politico.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:3001/api/v1'; // localhost
const token = `${sessionStorage.token}`;
const createOffice = document.querySelector('#myOffice');
const officeTable = document.querySelector('#body');


/*
* Adds an eventListener with a callback to GET all offices for a logged in user
*/
const getOffice = () => {
  fetch(`${baseUrl}/offices`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    //   'x-access-token': token,
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (sessionStorage.getItem('offices') === null || sessionStorage.getItem('offices') !== data) {
          const offices = [];
          offices.push(data.data);
          sessionStorage.setItem('offices', JSON.stringify(offices));
        } else {
          const offices = JSON.parse(sessionStorage.getItem('offices'));
          offices.push(data.data);
          sessionStorage.setItem('offices', JSON.stringify(offices));
        }

        const userData = JSON.parse(sessionStorage.getItem('offices'));
        const newParty = document.querySelector('#table');

        newParty.innerHTML = '';
        for (let n = 0; n <= Object.keys(userData[0][0]).length - 1; n += 1) {
          const type = `${userData[0][0][n].type}`;
          const createdat = `${userData[0][0][n].createdat}`;
          const name = `${userData[0][0][n].name}`;
          newParty.innerHTML += `<tr>
          <td>${n + 1}</td>
          <td onclick="toggleModal('office-details', 'modal')">${name}</td>
          <td>${type}</td>
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
if (createOffice) {
  createOffice.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const type = document.querySelector('#type').value;
    const about = document.querySelector('#about').value;

    fetch(`${baseUrl}/offices`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        name, type, about,
      }),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          document.querySelector('#myOffice')
            .innerHTML = `
                        <div class="on-signup">
                        <h2>${data.message}</h2>
                        </div>`;
          setTimeout(() => {
            window.location.replace('viewOffices.html');
          }, 5000);
        } else {
          let output = '<h3>Error</h3>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}</p>`;
          });
          document.querySelector('#myOffice')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error</h2>
            <h3>${error}</h3>`;
      });
  });
}

if (officeTable) {
  officeTable.addEventListener('load', getOffice());
}

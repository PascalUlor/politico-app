const baseUrl = 'https://the-politico.herokuapp.com/api/v1'; // Heroku
// const baseUrl = 'http://localhost:3001/api/v1'; // Localhost
const token = `${sessionStorage.token}`;
const candidatePage = document.querySelector('#candidate-apply');
const candidateForm = document.querySelector('#candidate-form');
const viewCandidate = document.querySelector('#body');
const adminCandidate = document.querySelector('#admin-candidate');
const statusUpdate = document.querySelector('#status');

const populate = () => {
  const userOffices = JSON.parse(sessionStorage.getItem('offices'));
  const userParty = JSON.parse(sessionStorage.getItem('parties'));
  const selectOffice = document.querySelector('#candidate-office');
  const selectParty = document.querySelector('#candidate-party');
  selectOffice.innerHTML = '';
  selectParty.innerHTML = '';

  for (let n = 0; n <= Object.keys(userOffices[0][0]).length - 1; n += 1) {
    // create an <option> to add the <select>
    const childOffice = document.createElement('option');

    // assign values to the <option>
    childOffice.textContent = `${userOffices[0][0][n].name}`;
    childOffice.value = `${userOffices[0][0][n].id}`;

    // attach the mew <option> to the <selection>
    selectOffice.appendChild(childOffice);
  }

  for (let n = 0; n <= Object.keys(userParty[0]).length - 1; n += 1) {
    // create an <option> to add the <select>
    const childParty = document.createElement('option');

    // assign values to the <option>
    childParty.textContent = `${userParty[0][n].name}`;
    childParty.value = `${userParty[0][n].id}`;

    // attach the mew <option> to the <selection>
    selectParty.appendChild(childParty);
  }
};

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
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};

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
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};


if (candidatePage) {
  getOffice();
  getParty();
  candidatePage.addEventListener('load', populate());
}

/*
* Adds an eventListener with a callback to create a party inputs
*
* @param {object} submitEvent - The submitEvent
*/
if (candidateForm) {
  candidateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const office = document.querySelector('#candidate-office').value;
    const party = document.querySelector('#candidate-party').value;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const { userId } = userData[0];

    fetch(`${baseUrl}/office/${userId}/apply`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        office, party,
      }),
    }).then(res => res.json())
      .then((data) => {
        if (data) {
          document.querySelector('#candidate-form')
            .innerHTML = `
                        <div class="on-signup">
                        <h2>Applicaton Successfull</h2>
                        </div>`;
          setTimeout(() => {
            window.location.replace('candidates.html');
          }, 5000);
        } else {
          let output = '<h3>Error</h3>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}</p>`;
          });
          document.querySelector('#candidate-form')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error</h2>
            <h3>${error}</h3>`;
      });
  });
}

/*
* Adds an eventListener with a callback to GET all parties for a logged in user
*/
const getCandidates = () => {
  fetch(`${baseUrl}/candidates`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    //   'x-access-token': token,
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (sessionStorage.getItem('candidates') === null || sessionStorage.getItem('candidates') !== data) {
          const candidates = [];
          candidates.push(data.data);
          sessionStorage.setItem('candidates', JSON.stringify(candidates));
        } else {
          const candidates = JSON.parse(sessionStorage.getItem('candidates'));
          candidates.push(data.data);
          sessionStorage.setItem('candidates', JSON.stringify(candidates));
        }

        const candidateData = JSON.parse(sessionStorage.getItem('candidates'));
        const newCandidate = document.querySelector('#table');
        const adminTable1 = document.querySelector('#admin-table-1');
        const candidateInfo = newCandidate || adminTable1;
        candidateInfo.innerHTML = '';
        if (viewCandidate) {
          for (let n = 0; n <= Object.keys(candidateData[0]).length - 1; n += 1) {
            const name = `${candidateData[0][n].firstname} ${candidateData[0][n].lastname}`;
            const party = `${candidateData[0][n].partyname}`;
            const office = `${candidateData[0][n].officename}`;

            candidateInfo.innerHTML += `<tr class="candidate">
          <td>${n + 1}</td>
          <td>${name}</td>
          <td>${party}</td>
          <td>${office}</td>
          <td>${candidateData[0][n].registered === true ? 'Approved' : 'Pending'}</td>
          </tr>`;
          }
        }


        if (adminCandidate) {
          for (let n = 0; n <= Object.keys(candidateData[0]).length - 1; n += 1) {
            const name = `${candidateData[0][n].firstname} ${candidateData[0][n].lastname}`;
            const party = `${candidateData[0][n].partyname}`;
            const office = `${candidateData[0][n].officename}`;

            candidateInfo.innerHTML += `<tr class="candidate">
        <td>${n + 1}</td>
        <td>${name}</td>
        <td>${party}</td>
        <td>${office}</td>
        <td><button>${candidateData[0][n].registered === true ? 'Approved' : 'Pending'}</button></td>
        <td><i class="fas fa-trash-alt table-icon deleteData"></i></td>
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

if (viewCandidate) {
  viewCandidate.addEventListener('load', getCandidates());
}

if (adminCandidate) {
  adminCandidate.addEventListener('load', getCandidates());
}

if (statusUpdate) {
  statusUpdate.addEventListener('click', (e) => {
    e.preventDefault();
    const queryId = document.querySelector('.candidate-id').innerHTML;
    fetch(`${baseUrl}/office/${parseInt(queryId, 10)}/register`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 200) {
          // eslint-disable-next-line no-alert
          alert('Candidate Approvall Sucessfull');
          setTimeout(() => { window.location.reload(); }, 1000);
        } else {
          // eslint-disable-next-line no-alert
          alert('Candidate Approvall Sucessfull');
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
      });
  });
}

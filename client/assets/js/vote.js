// const baseUrl = 'https://the-politico.herokuapp.com/api/v1'; // Heroku
const baseUrl = 'http://localhost:3001/api/v1'; // Localhost
const token = `${sessionStorage.token}`;
const votePage = document.querySelector('#vote-body');
const voteForm = document.querySelector('#vote-form');

const selectOffice = document.querySelector('#run-office');
const selectCandidate = document.querySelector('#candidate');

const populate = () => {
  const userOffices = JSON.parse(sessionStorage.getItem('offices'));

  //   const selectOffice = document.querySelector('#run-office');
  //   const selectCandidate = document.querySelector('#candidate');
  selectOffice.innerHTML = '<option value="">-- Select Office --</option>';


  for (let n = 0; n <= Object.keys(userOffices[0][0]).length - 1; n += 1) {
    // create an <option> to add the <select>
    const childOffice = document.createElement('option');

    // assign values to the <option>
    childOffice.textContent = `${userOffices[0][0][n].name}`;
    childOffice.value = `${userOffices[0][0][n].id}`;

    // attach the mew <option> to the <selection>
    selectOffice.appendChild(childOffice);
  }
};


const findCandidates = (item, index) => {
  if (selectOffice.options[selectOffice.selectedIndex].text === item.officename) {
    //   return item.candidateid;
    const childCandidate = document.createElement('option');
    childCandidate.textContent = `${item.firstname}`;
    childCandidate.value = `${item.candidateid}`;
    selectCandidate.appendChild(childCandidate);
  }
};

const runningCandidates = () => {
  // console.log(userCandidate[0]);
  selectCandidate.innerHTML = '<option value="">-- Select Candidate --</option>';
  const userCandidate = JSON.parse(sessionStorage.getItem('candidates'));
  userCandidate[0].map(findCandidates);
};

selectOffice.addEventListener('change', (e) => {
  e.preventDefault();
  runningCandidates();
});

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
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};


if (votePage) {
  getOffice();
  getParty();
  getCandidates();
  populate();
  voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const office = document.querySelector('#run-office').value;
    const candidate = document.querySelector('#candidate').value;

    fetch(`${baseUrl}/votes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ office, candidate }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          const userVotes = [];
          userVotes.push(data.data[0]);
          sessionStorage.setItem('userVotes', JSON.stringify(userVotes));
          document.querySelector('#vote-form')
            .innerHTML = `
                        <div class="on-signup">
                        <h2>You have Successfully Voted</h2>
                        </div>`;
          setTimeout(() => {
            window.location.replace('profilepage.html');
          }, 5000);
        } else {
          let output = '<h3>Error</h3>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}</p>`;
          });
          document.querySelector('#vote-form')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
            <h3>${error}<h3/>`;
      });
  });
}

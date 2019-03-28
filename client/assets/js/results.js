const baseUrlR = 'https://the-politico.herokuapp.com/api/v1';
// const baseUrlR = 'http://localhost:3001/api/v1'; // localhost
const tokenR = `${sessionStorage.token}`;
const resultDropDown = document.querySelector('.dropdown');


/*
* Adds an eventListener with a callback to GET all offices for a logged in user
*/
const getOffice = () => {
  fetch(`${baseUrlR}/offices`, {
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
        const officeResult = document.querySelector('.dropdown');

        officeResult.innerHTML = '';
        for (let n = 0; n <= Object.keys(userData[0][0]).length - 1; n += 1) {
          const name = `${userData[0][0][n].name}`;
          const officeId = `${userData[0][0][n].id}`;
          officeResult.innerHTML += `<li>
                                    <a href="#" id="${officeId}" onClick="officeSelect(event);">${name}</a>
                                    </li>`;
        }
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};

/*
* Adds an eventListener with a callback to GET all results by offices for a logged in user
*/

const officeSelect = (event) => {
  const officeId = event.target.getAttribute('id');
  fetch(`${baseUrlR}/office/${parseInt(officeId, 10)}/result`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': tokenR,
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (sessionStorage.getItem('electionResults') === null || sessionStorage.getItem('electionResults') !== data) {
          const results = [];
          results.push(data.data);
          sessionStorage.setItem('electionResults', JSON.stringify(results));
        } else {
          const results = JSON.parse(sessionStorage.getItem('electionResults'));
          results.push(data.data);
          sessionStorage.setItem('electionResults', JSON.stringify(results));
        }
        setTimeout(() => {
          window.location.replace('resultspage.html');
        }, 2000);
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
                      <h3>${error}<h3/>`;
    });
};


if (resultDropDown) {
  getOffice();
}

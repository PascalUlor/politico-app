const resultPage = document.querySelector('#result-page');


/*
* Adds an eventListener with a callback to GET all results by offices for a logged in user
*/

const officeSelect = () => {
  const userOffices = JSON.parse(sessionStorage.getItem('electionResults'));
  const resultTable = document.querySelector('#result-table');
  resultTable.innerHTML = '';

  for (let n = 0; n <= Object.keys(userOffices[0]).length - 1; n += 1) {
    const officename = `${userOffices[0][n].office_name}`;
    const votesTally = `${userOffices[0][n].election_results}`;
    const candidatename = `${userOffices[0][n].candidate_name}`;
    resultTable.innerHTML += `<tr>
    <td>${n + 1}</td>
    <td>${candidatename}</td>
    <td>Andela</td>
    <td>${officename}</td>
    <td>${votesTally}</td>
    </tr>`;
  }
};


if (resultPage) {
  resultPage.addEventListener('load', officeSelect());
}

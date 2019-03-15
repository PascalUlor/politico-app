/**
 * Display Modal
 * @param {string} id - The id of the modal
 * @param {string} modal - The id of the modal container
 */
const toggleModal = (id, modal) => {
  if (document.getElementById(modal).style.display === 'block') {
    document.getElementById(modal).style.display = 'none';
    document.getElementById(id).style.display = 'none';
  } else {
    document.getElementById(modal).style.display = 'block';
    document.getElementById(id).style.display = 'block';
  }
};

/**
 * Display details of each party in a modal
 */
setTimeout(() => {
  const popup = document.querySelectorAll('.view');
  const partyData = JSON.parse(sessionStorage.getItem('parties'));

  for (let i = 0; i < popup.length; i += 1) {
    popup[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleModal('party-details', 'modal');
      const modalName = document.querySelector('.modalName');
      const modalAbout = document.querySelector('.modalAbout');
      const modalDate = document.querySelector('.modalDate');
      const modalImage = document.querySelector('.modalImage');

      modalName.innerHTML = `${partyData[0][i].name}`;
      modalAbout.innerHTML = `${partyData[0][i].about}`;
      modalDate.innerHTML = `${partyData[0][i].createdat}`;
      modalImage.innerHTML = `<img src=${partyData[0][i].logourl} alt="party logo" class="party-logo">`;
    });
  }
}, 5000);

/**
 * Edit details of each party
 */
setTimeout(() => {
  const popup = document.querySelectorAll('.editData');
  const partyData = JSON.parse(sessionStorage.getItem('parties'));

  for (let i = 0; i < popup.length; i += 1) {
    popup[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleModal('party-edit', 'edit');
      const editName = document.querySelector('#edit-name');
      const editPhone = document.querySelector('#phonenumber');
      const editAddress = document.querySelector('#hqAddress');
      const editEmail = document.querySelector('#email');
      const editAbout = document.querySelector('#about');
      const editId = document.querySelector('.edit-id');

      editName.value = `${partyData[0][i].name}`;
      editPhone.value = `${partyData[0][i].phonenumber}`;
      editAddress.value = `${partyData[0][i].hqaddress}`;
      editEmail.value = `${partyData[0][i].email}`;
      editAbout.value = `${partyData[0][i].about}`;
      editId.innerHTML = `${partyData[0][i].id}`;
    });
  }
}, 5000);


/*
*DIsplay Backdrop when mobile side bar is toggled
*
*/
const backdrop = document.querySelector('.backdrop');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');


const backDrop = () => {
  backdrop.classList.remove('open');
};
const mobileButton = () => {
  mobileNav.classList.add('open');
  backdrop.classList.add('open');
};
const removeBackDrop = () => {
  mobileNav.classList.remove('open');
  backDrop();
};

const animate = () => {
  toggleButton.addEventListener('click', mobileButton);
  backdrop.addEventListener('click', removeBackDrop);
};

animate().then(() => {
  backdrop.removeEventListener('click', removeBackDrop);
  toggleButton.removeEventListener('click', mobileButton);
});

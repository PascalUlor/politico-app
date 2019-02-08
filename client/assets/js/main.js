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

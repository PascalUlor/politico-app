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

const toggle = document.querySelector('.contact-toggle');
const panel = document.querySelector('.contact-panel');
const closeButton = document.querySelector('.contact-close');
const form = document.querySelector('#contact-form');
const status = document.querySelector('#contact-status');
function setOpen(open) {
  panel.inert = !open;
  panel.setAttribute('aria-hidden', String(!open));
  toggle.setAttribute('aria-expanded', String(open));
  panel.classList.toggle('is-open', open);
  if (open) document.querySelector('#contact-email').focus({preventScroll:true});
  else toggle.focus({preventScroll:true});
}
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
closeButton.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
});
form.addEventListener('submit', event => {
  event.preventDefault();
  form.reset();
  status.textContent = 'submited';
});
form.addEventListener('input', () => { status.textContent = ''; });

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

  if (open) {

    document
      .querySelector('#contact-email')
      .focus({ preventScroll: true });

  } else {

    hideSubmitStatus();

    toggle.focus({ preventScroll: true });
  }
}

toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
closeButton.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
});

const statusMessage = status.querySelector('.contact-status__message');

let submitTimer;


function hideSubmitStatus() {
  clearTimeout(submitTimer);

  status.classList.remove('is-visible');
  statusMessage.textContent = '';
}


form.addEventListener('submit', event => {
  event.preventDefault();

  form.reset();

  clearTimeout(submitTimer);

  statusMessage.textContent = 'submitted';

  /*
   * На случай, если пользователь очень быстро
   * вызовет submit повторно — сбрасываем старую анимацию.
   */
  status.classList.remove('is-visible');

  void status.offsetWidth;

  status.classList.add('is-visible');


  /*
   * Через 1.8 секунды сообщение плавно исчезнет.
   */
  submitTimer = setTimeout(() => {
    hideSubmitStatus();
  }, 1800);
});


form.addEventListener('input', () => {
  hideSubmitStatus();
});
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  let { delay, step, amount } = evt.currentTarget.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }

  evt.currentTarget.reset();
}

formEl.setAttribute(
  'style',
  'display: flex; flex-direction: column; align-items: center; gap: 15px;'
);

const submitBtnEl = document.querySelector('.form button');
submitBtnEl.setAttribute('style', 'margin-left: auto; margin-right: auto;');

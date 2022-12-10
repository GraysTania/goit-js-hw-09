import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', startPromises);

function startPromises(event) {
  event.preventDefault();
  const inputElements = event.currentTarget.elements;
  let delay = Number(inputElements.delay.value);
  let step = Number(inputElements.step.value);
  let amount = Number(inputElements.amount.value);

  for (let position = 1; position <= amount; position++) {
    function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 7000,
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 7000,
        });
      });
    delay += step;
  }
}

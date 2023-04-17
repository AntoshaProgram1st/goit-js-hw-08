import throttle from '../../node_modules/lodash.throttle/index.js';

const storageKey = 'feedback-form-state';
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const form = document.querySelector('form');

const saveStateToStorage = () => {
  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(feedbackFormState));
};

emailInput.addEventListener('input', throttle(saveStateToStorage, 500));
messageInput.addEventListener('input', throttle(saveStateToStorage, 500));

const loadStateFromStorage = () => {
  const feedbackFormState = JSON.parse(localStorage.getItem(storageKey));
  if (feedbackFormState) {
    emailInput.value = feedbackFormState.email;
    messageInput.value = feedbackFormState.message;
  }
};

document.addEventListener('DOMContentLoaded', loadStateFromStorage);

const handleSubmit = event => {
  event.preventDefault();

  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(feedbackFormState);

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('submit', handleSubmit);

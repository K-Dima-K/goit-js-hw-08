import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

populateForm();

const formData = {};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    refs.email.value = parsedData.email;
    refs.message.value = parsedData.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const submitFormData = {};
  submitFormData.email = refs.email.value;
  submitFormData.message = refs.message.value;
  console.log(submitFormData);

  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

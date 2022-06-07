'use strict'
const form = document.querySelector('#form')
const submit = document.querySelector('#submit')
const usernameInput = document.querySelector('#username')
const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
const usernameDiv = form.querySelector(`.username`)
const passwordDiv = form.querySelector(`.password`)
const nameDiv = form.querySelector(`.name`)
const telDiv = form.querySelector(`.tel`)
const emailDiv = form.querySelector(`.email`)
const requiredForms = [usernameDiv, passwordDiv, nameDiv]
const allForms = form.querySelectorAll("input")



const errorFuncs = {
  persianNameGen(sectionName) {
    switch (sectionName) {
      case 'username': return 'نام کاربری'
      case 'password': return 'رمزعبور'
      case 'name': return 'اسم'
      case 'tel': return 'شماره تلفن'
      case 'email': return "ایمیل"

    }
  },

  requieredError(value, errorArr) {
    if (!value.value) {
      errorArr.push('لطفا خالی نگذارید'); return false;
    }

  },

  lengthLimit(value, minLength, Maxlegth, errorArr) {
    let sectionName = value.name
    if ((!!value.value) && value.value.length <= minLength) { errorArr.push(` ${this.persianNameGen(sectionName)} باید بیش از ${minLength} حرف داشته باشد`) }
    if (value.value.length > Maxlegth) { errorArr.push(`${this.persianNameGen(sectionName)} باید کمتر از ${Maxlegth} حرف داشته باشد`) };

  },
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  emailFormatcheck(emailElem, errorArr) {
    if (!this.emailRegex.test(emailElem.value)) { errorArr.push('لطفا ایمیل معتبری وارد کنید') }

  },
  telRegex: /^(\+98|0098|98|0)?9\d{9}$/,
  telFormatCheck(telElem, errorArr) {
    if (!this.telRegex.test(telElem.value)) errorArr.push('لطفا شماره موبایل معتبری وارد کنید');
  }
}

const usernamecheck = function (usernameInput) {
  let usernameErrors = []


  errorFuncs.requieredError(usernameInput, usernameErrors);
  errorFuncs.lengthLimit(usernameInput, 8, 12, usernameErrors);


  if ((!!usernameInput.value) && !alphabet.split('').some(e => e === usernameInput.value.toLowerCase().split('')[0])) { usernameErrors.push('نام کاربری فقط با حروف انگلیسی شروع شود') }
  if (/[^\u0000-\u00ff]/.test(usernameInput.value)) { usernameErrors.push('لطفا از حروف غیر انگلیسی استفاده نکنید'); }

  printErrors(usernameDiv, usernameErrors);
  return usernameErrors

}

const passwordcheck = function (passwordInput) {
  let PasswordErrors = []
  errorFuncs.requieredError(passwordInput, PasswordErrors);
  errorFuncs.lengthLimit(passwordInput, 6, 20, PasswordErrors);
  printErrors(passwordDiv, PasswordErrors);
  return PasswordErrors

}
const namecheck = function (nameInput) {
  let nameErrors = []
  errorFuncs.requieredError(nameInput, nameErrors);
  errorFuncs.lengthLimit(nameInput, -1, 20, nameErrors)
  printErrors(nameDiv, nameErrors)
  return nameErrors

}

const emailcheck = function (emailInput) {
  let emailErrors = []
  emailInput.value && errorFuncs.emailFormatcheck(emailInput, emailErrors);
  printErrors(emailDiv, emailErrors);
  return emailErrors

}

const telcheck = function (telInput) {
  let telErrors = []
  telInput.value && errorFuncs.telFormatCheck(telInput, telErrors);
  printErrors(telDiv, telErrors)
  return telErrors

}

const printErrors = function (section, errors) {
  section.querySelector('.error').innerHTML = errors.join("<br>");




}

const checkFunc = function (input) {
  let sectionName = input.target.name;

  switch (sectionName) {
    case 'username': usernamecheck(usernameDiv.children[1]);
      break;
    case 'password': passwordcheck(passwordDiv.children[1]);
      break;
    case 'name': namecheck(nameDiv.children[1]);
      break;
    case 'tel': telcheck(telDiv.children[1]);
      break;
    case 'email': emailcheck(emailDiv.children[1]);

  }

}
const submitFunc = function (input) {
  input.preventDefault();


  let allReqErrors = [...usernamecheck(usernameDiv.children[1]) &&
    passwordcheck(passwordDiv.children[1]) &&
    namecheck(nameDiv.children[1])].join('')
  // check required inputs then if required forms have no error accept
  if (!allReqErrors) alert('accepted, hooray');



}

form.addEventListener('focusout', checkFunc)
form.addEventListener('input', checkFunc)
submit.addEventListener('click', submitFunc)
submit.addEventListener('keydown', (event) => { if (event.keyCode === 13) submitFunc(event) })


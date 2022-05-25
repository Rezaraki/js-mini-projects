'use strict';

let cpuGuess;
const initialMin = document.querySelector('#minInput');
const initialMax = document.querySelector('#maxInput');
const submit = document.querySelector('#subBtn')
const higher = document.querySelector('#b1');
const lower = document.querySelector('#b2');
const done = document.querySelector('#yay');
const range = document.querySelector('.range');
const question = document.querySelector('.question');
const GuessInHtml = document.querySelectorAll('.showguess');
const tabrik = document.querySelector('.finish');
const reload = document.querySelector('#again');

const printguess = (element) => {
  element.innerText = cpuGuess
}
const getRndInteger = function (min, max) { //min and max included
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const guessing = function () {
  let min = +initialMin.value;
  let max = +initialMax.value;
  range.classList.add('hide')
  question.classList.remove('hide')
  cpuGuess = getRndInteger(min, max);  /////////////////////
  printguess(GuessInHtml[0])
  console.log(cpuGuess);

  done.addEventListener('click', () => {
    printguess(GuessInHtml[1])
    tabrik.classList.remove('hide');
    question.classList.add('hide');
    reload.addEventListener('click', () => {
      console.log('oh');
      location.reload();
    })
  })

  const fork = () => {

    higher.addEventListener('click', () => {

      min = cpuGuess
      cpuGuess = getRndInteger(min, max)
      printguess(GuessInHtml[0])
    })

    lower.addEventListener('click', () => {

      max = cpuGuess
      cpuGuess = getRndInteger(min, max)
      printguess(GuessInHtml[0])
    })
  }
  fork();
}
submit.addEventListener('click', guessing)




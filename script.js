'use strict';

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const clearBtns = document.querySelectorAll('.clear-btn');
const resultBtn = document.getElementById('result');
const display = document.getElementById('display');

let currentNum = 0;
let isNewNumber = false;
let pendingOperation = '';

function numPress(e) {
    let num = e.target.textContent;
    if (isNewNumber) {
        display.value = num;
        isNewNumber = false;
    } else {
        (display.value === '0') ? display.value = num : display.value += num;
        currentNum = display.value;
    }
};

function operation(e) {
    const localCurrentNum = display.value;
    const operator = e.target.textContent;

    if (isNewNumber) {
        currentNum = display.value;
    } else {
        isNewNumber = true;
        if (operator === '+') {
            currentNum += display.value;
        }
        else if (operator === '-') {
            currentNum -= display.value;
        }
    }
};

function clear(e) {
    console.log('Клик по кнопке', e.target.textContent)
};

function decimal(e) {
    console.log('Клик по кнопке', e.target.textContent)
};

/*function result(e) {
    console.log('Клик по кнопке', e.target.textContent)
};*/


numbers.forEach(elem => elem.addEventListener('click', numPress));

operators.forEach(elem => elem.addEventListener('click', operation));

clearBtns.forEach(elem => elem.addEventListener('click', clear));

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result)

function numberPress() {

};

numberPress();
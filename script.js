'use strict';

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
let result = false;

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clear();
    }

    clear() {
        // Почему автор урока создал эти свойства не в конструкторе а методе?
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = 'undefined';
    }

    appendNumber(number) {
        if (result) {
            this.currentOperand = '';
            result = false;
        }
        if (number === '0' && this.currentOperand[0] === '0') {
            console.log(this.currentOperand, 'ololoooo')
            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            console.log(this.currentOperand)
            return;
        }
        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = 0 + number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        // Если первый операнд не выбран, мы не можем нажать операци.
        if (this.currentOperand === '') return;
        // Если оба операнда существуют...
        if (this.previousOperand !== '') {
            this.compute();
        }
        // Сохранит знак операции
        this.operation = operation;
        // Присвоить текущий опернанд в предыдущий ( т.е. закончили вводить число)
        this.previousOperand = this.currentOperand;
        // Очистить значение текущего операнда
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        console.log('Это текущий операнд', this.currentOperand);
        this.operation = 'undefined';
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.previousOperand !== '' && this.operation !== 'undefined') {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(elem => elem.addEventListener('click', function () {
    calculator.appendNumber(elem.textContent);
    calculator.updateDisplay();
}));

operationButtons.forEach(elem => elem.addEventListener('click', function () {
    calculator.chooseOperation(elem.textContent);
    calculator.updateDisplay();
}))

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    result = true;

})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
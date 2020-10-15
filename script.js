'use strict';

const numberButtons = document.querySelectorAll('[data-number]');
const decimalButton = document.querySelector('[data-decimal]');
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
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = 'undefined';
    }

    appendNumber(number) {
        if (result) {
            this.currentOperand = '';
            result = false;
        }

        if (this.currentOperand[0] === '0' && this.currentOperand[1] === '.') {
            this.currentOperand += number;
            return;
        }

        if (number === '0' && this.currentOperand[0] === '0') {
            return;
        }

        if (this.currentOperand[0] === '0') {
            this.currentOperand = '';
        }

        if (this.currentOperand[0] === '0' && this.currentOperand[1] === '.') {
            this.currentOperand = '0.';
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    appendDecimal(dec) {
        if (result) {
            this.currentOperand = '';
            result = false;
        }
        if (this.currentOperand.toString().includes(dec)) {
            return;
        }
        if (this.currentOperand[0] === undefined) {
            this.currentOperand = '0.';
        } else {
            this.currentOperand += dec;
        }
    };

    chooseOperation(operation) {
        if (operation === '-' && this.currentOperand === '') {
            this.currentOperand = operation + this.currentOperand;
            return;
        }
        if (operation === '√') {
            this.operation = operation;
            this.compute();
        } else {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let len = 1;

        if (prev.toString().includes('.') || current.toString().includes('.')) {
            len = prev.toString().length > current.toString().length ? prev.toString().length - 2 :
              current.toString().length - 2;
        }

        if (this.operation !== '√' && ( isNaN(prev) || isNaN(current)) ) return;

        switch (this.operation) {
            case '+':
                computation = this.round((prev + current), len);
                break;
            case '-':
                computation = this.round((prev - current), len);
                break;
            case '*':
                computation = this.round((prev * current), len);
                break;
            case '/':
                computation = prev / current;
                break;
            case '√':
                computation = Math.sqrt(current);
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = 'undefined';
        this.previousOperand = '';
    }

    updateDisplay() {
        if (calculator.currentOperand === 'NaN') {
            this.currentOperandTextElement.innerText = 'Ошибка';
            return;
        }
        if (this.currentOperand !== 0) {
            this.currentOperandTextElement.innerText = this.currentOperand;
        }
        if (this.previousOperand !== '' && this.operation !== 'undefined') {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
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

decimalButton.addEventListener('click', (e) => {
    calculator.appendDecimal(e.target.textContent);
    calculator.updateDisplay();
})

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
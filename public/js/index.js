"use strict";
class Calculator {
    // Methods
    constructor(previusNumberDisplayer, currentNumberDisplayer) {
        // Properties
        this.prevNumber = "";
        this.currentNumber = "";
        this.operator = "";
        this.operatorClicked = false;
        this.prevNumberDisplayer = previusNumberDisplayer;
        this.currentNumberDisplayer = currentNumberDisplayer;
    }
    clear() {
        this.currentNumber = "0";
        this.prevNumber = "";
        this.operator = "";
    }
    appendNumber(number) {
        if (number === "." && this.currentNumber.includes("."))
            return;
        if (this.currentNumber === "0" && currentNumberDisplayer.innerText === "0") {
            this.currentNumber = number;
            return;
        }
        this.currentNumber = this.currentNumber + number;
    }
    updateDisplay() {
        this.currentNumberDisplayer.innerText = this.currentNumber;
        this.prevNumberDisplayer.innerText = this.prevNumber;
    }
    chooseOperator(operator) {
        if (this.currentNumber === "")
            return;
        if (this.operatorClicked) {
            this.operator = operator;
            this.prevNumber = this.prevNumber.slice(0, -1) + this.operator;
            this.currentNumber = "0";
            return;
        }
        if (this.prevNumber !== "") {
            this.compute();
        }
        this.operator = operator;
        this.prevNumber = this.currentNumber + " " + this.operator;
        this.currentNumber = "0";
        this.operatorClicked = true;
    }
    compute() {
        let computation;
        const prev = parseFloat(this.prevNumber.split(" ")[0]);
        const current = parseFloat(this.currentNumber);
        console.log(prev, this.operator, current);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operator) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "x":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentNumber = computation.toString();
        this.operator = "";
        this.prevNumber = "";
        this.operatorClicked = false;
        // handle if the computation is a NaN
        if (isNaN(computation)) {
            this.currentNumber = "syntax error";
            this.prevNumber = "";
            this.operator = "";
            this.operatorClicked = false;
        }
    }
}
// grab the DOM elements
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll("#operator");
const numbers = document.querySelectorAll("#number");
const equal = document.querySelector("#equal");
const previousNumberDisplayer = document.querySelector(".previousNumber");
const currentNumberDisplayer = document.querySelector(".currentNumber");
// create a new instance of the Calculator class
const calculator = new Calculator(previousNumberDisplayer, currentNumberDisplayer);
// add event listeners to the DOM elements
// numbers
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    });
});
// clear
clear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});
// operators
operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        calculator.chooseOperator(operator.innerText);
        calculator.updateDisplay();
    });
});
// equal
equal.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

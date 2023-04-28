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

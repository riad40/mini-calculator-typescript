class Calculator {
    // Properties

    public prevNumber: string = ""
    public currentNumber: string = ""
    public operator: string = ""
    public operatorClicked: boolean = false
    public prevNumberDisplayer: HTMLDivElement
    public currentNumberDisplayer: HTMLDivElement

    // Methods
    constructor(previusNumberDisplayer: HTMLDivElement, currentNumberDisplayer: HTMLDivElement) {
        this.prevNumberDisplayer = previusNumberDisplayer
        this.currentNumberDisplayer = currentNumberDisplayer
    }

    clear() {
        this.currentNumber = "0"
        this.prevNumber = ""
        this.operator = ""
    }

    appendNumber(number: string) {
        if (number === "." && this.currentNumber.includes(".")) return
        if (this.currentNumber === "0" && currentNumberDisplayer.innerText === "0") {
            this.currentNumber = number
            return
        }
        this.currentNumber = this.currentNumber + number
    }

    updateDisplay() {
        this.currentNumberDisplayer.innerText = this.currentNumber
        this.prevNumberDisplayer.innerText = this.prevNumber
    }
}

// grab the DOM elements
const clear = document.querySelector("#clear") as HTMLButtonElement
const operators = document.querySelectorAll("#operator") as NodeListOf<HTMLButtonElement>
const numbers = document.querySelectorAll("#number") as NodeListOf<HTMLButtonElement>
const equal = document.querySelector("#equal") as HTMLButtonElement
const previousNumberDisplayer = document.querySelector(".previousNumber") as HTMLDivElement
const currentNumberDisplayer = document.querySelector(".currentNumber") as HTMLDivElement

// create a new instance of the Calculator class
const calculator = new Calculator(previousNumberDisplayer, currentNumberDisplayer)

// add event listeners to the DOM elements

// numbers
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})

// clear
clear.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

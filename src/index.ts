class Calculator {
    previousOperandTextElement: HTMLDivElement
    currentOperandTextElement: HTMLDivElement
    currentOperand: string = ""
    previousOperand: string = ""
    operation: string = ""

    constructor(previousOperandTextElement: HTMLDivElement, currentOperandTextElement: HTMLDivElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = ""
    }

    appendNumber(number: string) {
        if (number === "." && this.currentOperand?.includes(".")) return
        this.currentOperand = this.currentOperand?.toString() + number.toString()
    }

    chooseOperation(operation: string) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    calculate() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return
        }
        const result = computation.toString()
        this.currentOperand = result
        this.operation = ""
        this.previousOperand = ""
    }

    getDisplayNumber(number: string | number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay: string
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
                this.operation
            }`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
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
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        calculator.chooseOperation(operator.innerText)
        calculator.updateDisplay()
    })
})

equal.addEventListener("click", () => {
    calculator.calculate()
    calculator.updateDisplay()
})

clear.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

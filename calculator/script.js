add = (x, y) => {return x+y}
sub = (x, y) => {return x-y}
mul = (x, y) => {return x*y}
div = (x, y) => {return x/y}

const operations = {
    "+": add,
    "-": sub,
    "x": mul,
    "/": div,
}

function operate(operator, x, y) {
    return operations[operator](x, y)
}

function getBefore(index, array) {
    let prevChar

    for (let i = index; i > 0; i--) {
        prevChar = array[i];

        // if char is an operator, get charArray from current index to start
        if (prevChar in operations) {
            return [array.slice(0, i + 1).join(' '), i + 1]
        }
    }
    return [[""], index]
}

function getAfter(index, array) {
    let nextChar

    for (let i = index; i < array.length; i++) {
        if (i === index) continue
        nextChar = array[i];

        // if char is an operator, get charArray from current index to end
        if (nextChar in operations) {
            return [array.slice(i, array.length).join(' '), i]
        }
    }
    return [[""], index + 1]
}

function clearDisplay() {
    let display = document.querySelector("p")
    display.textContent = ""
}

function equate() {
    let display = document.querySelector("p").textContent
    let displayCharArray = display.split(' ')

    if (displayCharArray[0] in operations) displayCharArray.shift()
    if (displayCharArray[displayCharArray.length] in operations) displayCharArray.pop()

    let firstOperand
    let secondOperand
    let equation
    let result

    let beforeList
    let afterList
    let before
    let after
    let beforeIndex
    let afterIndex

    let char
    let character

    while (displayCharArray.includes("x") || displayCharArray.includes("/")){
        for (char in displayCharArray) {
            character = displayCharArray[char]

            if (character === "x" || character === "/") {
                // get characters before and after the equation and their index
                beforeList = getBefore(char - 1, displayCharArray)
                afterList = getAfter(char, displayCharArray)
                before = beforeList[0]
                after = afterList[0]
                beforeIndex = beforeList[1]
                afterIndex = afterList[1]

                // get between the before and after to find the binary equation
                equation = displayCharArray.slice(beforeIndex, afterIndex)

                // get operands
                firstOperand = parseInt(equation[0])
                secondOperand = parseInt(equation[2])
                // firstOperand = parseInt(equation.slice(0, equation.indexOf(character)).join(''))
                // secondOperand = parseInt(equation.slice(equation.indexOf(character) + 1, equation.length).join(''))

                // equate using the operands and operator found, join before, equation, and after, log it
                result = operate(character, firstOperand, secondOperand).toString()
                displayCharArray = `${before} ${result} ${after}`.split(' ')
                if (displayCharArray[0] === '') displayCharArray.shift()
                if (displayCharArray[displayCharArray.length - 1] === '') displayCharArray.pop()
                console.log(displayCharArray.join(' '))
                break
            }
        }
    }

    while (displayCharArray.includes("-") || displayCharArray.includes("+")){
        for (char in displayCharArray) {
            character = displayCharArray[char]

            if (character === "-" || character === "+") {
                // get characters before and after the equation
                beforeList = getBefore(char - 1, displayCharArray)
                afterList = getAfter(char, displayCharArray)
                before = beforeList[0]
                after = afterList[0]
                beforeIndex = beforeList[1]
                beforeIndex = (beforeIndex === 1) ? 0 : beforeIndex
                afterIndex = afterList[1]

                // get between the before and after to find the binary equation
                equation = displayCharArray.slice(beforeIndex, afterIndex)

                // get operands
                firstOperand = parseInt(equation[0])
                secondOperand = parseInt(equation[2])
                // firstOperand = parseInt(equation.slice(0, equation.indexOf(character)).join(''))
                // secondOperand = parseInt(equation.slice(equation.indexOf(character) + 1, equation.length).join(''))

                // equate using the operands and operator found, join before, equation, and after, log it
                result = operate(character, firstOperand, secondOperand).toString()
                displayCharArray = `${before} ${result} ${after}`.split(' ')
                if (displayCharArray[0] === '') displayCharArray.shift()
                if (displayCharArray[displayCharArray.length - 1] === '') displayCharArray.pop()
                console.log(displayCharArray.join(' '))
                break
            }
        }
    }

    document.querySelector("p").textContent = (displayCharArray.join('') === "NaN") ? "ERROR" : displayCharArray.join('')
}

function updateDisplay(val) {
    let display = document.querySelector("p")
    display.textContent += val
}

let numbers = document.getElementsByClassName("number")
let operators = document.getElementsByClassName("operator")
let clear = document.getElementsByClassName("clear")
let equals = document.getElementsByClassName("equals")
let negate = document.getElementsByClassName("negate")
let backspace = document.getElementsByClassName("backspace")

clear["0"].addEventListener('click', () => clearDisplay())
equals["0"].addEventListener('click', () => equate())
negate["0"].addEventListener('click', () => updateDisplay("-"))
backspace["0"].addEventListener('click', () => {
    let display = document.querySelector("p").textContent.split(" ")
    display.pop()
    document.querySelector("p").textContent = display.join(" ")
})

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => updateDisplay(numbers[i].innerHTML))
}
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', () => updateDisplay(operators[i].innerHTML))
}

window.addEventListener('keydown', (key) => {
    if (key.keyCode > 47 && key.keyCode < 58) updateDisplay(key.key)
    if (key.key in operations || key.key === "x" || key.key === "X") updateDisplay(` ${key.key} `)
    if (key.key === "c" || key.key === "C") clearDisplay()
    if (key.key === "_") updateDisplay("-")
    if (key.key === "Enter") equate()
    if (key.key === "Backspace") {
        let display = document.querySelector("p").textContent.split(" ")
        display.pop()
        document.querySelector("p").textContent = display.join(" ")
    }
})
let num1 = '';
let num2 = '';
let answer = '';
let operator = '';
// This is the initial value when no numbers are pressed
let defaultDisplayValue = ' '; /* &nbsp; value */

/* QUERY SELECTORS */
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const ac = document.querySelector('.all-clear');
const equals = document.querySelector('.equals');
const perc = document.querySelector('.percent');
const neg = document.querySelector('.negate');
const dec = document.querySelector('.decimal');
const back = document.querySelector('.backspace');

/* EVENT LISTENERS */
numbers.forEach(function(elem) {
    elem.addEventListener('click', saveNum);
});

operators.forEach(function(elem) {
    elem.addEventListener('click', saveOperator);
})

ac.addEventListener('click', clear);
equals.addEventListener('click', operate);
perc.addEventListener('click', percent);
neg.addEventListener('click', negate);
dec.addEventListener('click', decimal);
back.addEventListener('click', backspace);

/* DISPLAY AND CLEAR */

// Updates the display
function display() {
    const displayBox = document.querySelector('.display');
    const logBox = document.querySelector('.log');
    if (num1 !== '' && operator !== '' && logBox.textContent !== defaultDisplayValue) {
        logBox.textContent = `Ans = ${num1}`
    }

    // if-statement prevents the display box from being '' (empty)
    if (num1 === '') {
        displayBox.textContent = defaultDisplayValue;
    } else {
        displayBox.textContent = `${num1} ${operator} ${num2}`;
    }
}

// Saves the number for each calculation
function saveNum() {
    if (operator === '') {
        num1 += this.value;
    } else {
        num2 += this.value;
    }
    display(); 
}

// Saves the operator for each calculation
// saveOperator prevents adding an operator when num1 is empty and num2 is full (see negate(), percent())
function saveOperator() {
    if (num1 !== '' && num2 === '') {
        operator = this.value;
        display();
    }
}

// Clears everything including the display
function clear() {
    if(confirm("Are you sure you want to clear the calculator?\nThis action cannot be undone.")) {
        num1 = '';
        num2 = '';
        answer = '';
        operator = '';
    
        const displayBox = document.querySelector('.display');
        const logBox = document.querySelector('.log');
        displayBox.textContent = defaultDisplayValue;
        logBox.textContent = defaultDisplayValue;
    }
}

// Resets for the next calculation after operate runs
// Updates the log to be the previous calculation
function resetForNextCalculation() {
    const displayBox = document.querySelector('.display');
    const logBox = document.querySelector('.log');

    logBox.textContent = displayBox.textContent + " =";
    num1 = answer;
    num2 = '';
    answer = '';
    operator = '';
}

/* OPERATIONS */

// Operate function
function operate() {
    // Don't operate num1, operator, or num2 is empty
    if (num1 === '' || operator === '' || num2 === '') {
        alert("ERR: INVALID FORMAT USED");
        return;
    }

    let parsedNum1 = parseFloat(num1);
    let parsedNum2 = parseFloat(num2);

    // console.log(`Operated ${parsedNum1}, ${operator}, ${parsedNum2}`);
    if (operator === '+') {
        answer = add(parsedNum1, parsedNum2);
    } else if (operator === '-') {
        answer = subtract(parsedNum1, parsedNum2);
    } else if (operator === '*') {
        answer = multiply(parsedNum1, parsedNum2);
    } else if (operator === '/') {
        answer = divide(parsedNum1, parsedNum2);
    }

    // If the answer is a decimal, round it
    if (answer % 1 !== 0) {
        answer = roundDecimals(answer);
    }

    resetForNextCalculation();
    display();
}

// Round decimals and parses them as a float (strips 0's)
function roundDecimals(num) {
    return parseFloat((num).toFixed(10));
}

// Math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // If dividing by zero, alert an error
    if (b === 0) {
        alert("ERR: DIVIDE BY ZERO");
        return '';
    }
    return a / b;
}

// For percent, negate, decimal: 
// num1: num1 can't be empty and operator must be empty
// num2: num1 can't be empty (skip check b/c saveOperator() behavior) and operator can't be empty and num2 can't be empty
function percent() {
    if (num1 !== '' && operator === '') {
        num1 = num1 / 100;
    }
    if (operator !== '' && num2 !== '') {
        num2 = num2 / 100;
    }
    display();
}

function negate() {
    if (num1 !== '' && operator === '') {
        num1 = -num1;
    }
    if (operator !== '' && num2 !== '') {
        num2 = -num2;
    }
    display();
}

// Add a . (only works once)
// Turns the number into a string (may be an int if it was saved in ans) and checks if there is a '.'
function decimal() {
    if (num1 !== '' && operator === '') {
        if (!num1.toString().includes('.')) {
            num1 += ".";
        }
    }
    if (operator !== '' && num2 !== '') {
        if (!num2.toString().includes('.')) {
            num2 += ".";
        }
    }
    display();
}

// Check which one you are on and then slice the last one from that and save it back
function backspace() {
    if (num1 !== '' && operator === '') {
        num1 = num1.toString().slice(0, -1);
    } else if (operator !== '' && num2 === '') {
        operator = operator.toString().slice(0, -1);
    } else if (num2 !== '') {
        num2 = num2.toString().slice(0, -1);
    }
    display();
}

// Keyboard support
window.addEventListener('keydown', (event) => {
    if (event.defaultPrevented) return;

    let buttonPressed = document.querySelector(`button[value="${event.key}"]`);

    // Set the buttonPressed for all clear and equals buttons (they have two keys assigned to them)
    if (event.key === "a" || event.key === "c") {
        buttonPressed = document.querySelector('button[class="all-clear"]');
    }
    if (event.key === "Enter" || event.key === "=") {
        buttonPressed = document.querySelector('button[class="equals"]');
    }

    // If there is a button, then add a class that shows the button has been pressed
    if (buttonPressed) {
        buttonPressed.classList.add('button-pressed');
        // Remove the button-pressed class after a split second
        const time = 200;
        setTimeout(function() { buttonPressed.classList.remove('button-pressed') }, time);
    }

    // If there is no button and the user isn't asking for help, there's no need to go through the rest of the if-statements
    switch(event.key) {
        case "0":
        case "1": 
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (operator === '') {
                num1 += event.key;
            } else {
                num2 += event.key;
            }
            display();
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            if (num1 !== '' && num2 === '') {
                operator = event.key;
                display();
            }
            break;
        case "%":
            percent(); // %
            break;
        case ".":
            decimal(); // .
            break;
        case "Backspace": // ←
            backspace();
            break;
        case "n": // +/-
            negate();
            break;
        case "a": // AC
        case "c":
            clear();
            break;
        case "Enter": // =
        case "=":
            operate();
            break;
        case "h":
            alert("Keyboard Support Help Menu\nNote: Numbers, operators, decimal, and backspace are self-explanatory.\n\n(Button: Keyboard Key)\n\nAC (All Clear): A, C\n+/- (Negation): N\n= (Equals): Enter, =");
            break;
    }
});
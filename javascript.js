let num1 = '';
let num2 = '';
let answer = '';
let operator = '';
let executeSaveOperator = false;

// runs the event listeners
function run() {
    saveNum();
    clickOperate();
    clickAllClear();
}

/* EVENT LISTENERS */

// saves the number for each calculation
function saveNum() {
    const numbers = document.querySelectorAll('.numbers');
    numbers.forEach(function(elem) {
        elem.addEventListener('click', function() {
            if (operator === '') {
                num1 += elem.value;
            } else {
                num2 += elem.value;
            }

            // run the event listener only once (after the user enters a number)
            if(executeSaveOperator === false) {
                saveOperator();
                executeSaveOperator = true;
            }

            display();
        });
    });
}

// saves the operator for each calculation
function saveOperator() {
    if (num1 === '') {
        return;
    }

    const operators = document.querySelectorAll('.operators');
    operators.forEach(function(elem) {
        elem.addEventListener('click', function() {
            operator = elem.value;
            display();
        })
    });
}

// adds an event listener to AC (all clear)
function clickAllClear() {
    const ac = document.querySelector('.all-clear');
    ac.addEventListener('click', clear);
}

// adds an event listener to equals
function clickOperate() {
    const equals = document.querySelector('.equals');
    equals.addEventListener('click', operate);
}

/* DISPLAY AND CLEAR */

// updates the display
function display() {
    const displayBox = document.querySelector('.display');
    displayBox.textContent = `${num1} ${operator} ${num2}`;
    console.log("Displayed");
}

// clears everything including the display
function clear() {
    num1 = '';
    num2 = '';
    answer = '';
    operator = '';
    executeSaveOperator = false;

    const displayBox = document.querySelector('.display');
    const logBox = document.querySelector('.log');
    displayBox.textContent = '0';
    logBox.textContent = '';

    console.log("Cleared");
}

// resets for the next calculation after operate runs
// updates the log to be the previous calculation
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

// operate function
function operate() {
    if(num1 === '' || num2 === '' || operator === '') return;

    let parsedNum1 = parseInt(num1);
    let parsedNum2 = parseInt(num2);

    console.log(`Operated ${parsedNum1}, ${operator}, ${parsedNum2}`);
    if(operator === '+') {
        answer = add(parsedNum1, parsedNum2);
    } else if (operator === '-') {
        answer = subtract(parsedNum1, parsedNum2);
    } else if (operator === '*') {
        answer = multiply(parsedNum1, parsedNum2);
    } else if (operator === '/') {
        answer = divide(parsedNum1, parsedNum2);
    }

    resetForNextCalculation();
    display();
}

// math functions
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
    if(b === 0) {
        return "ERROR";
    }
    return a / b;
}

// runs this when page loads
run();
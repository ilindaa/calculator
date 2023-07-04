let num1 = '';
let num2 = '';
let answer = '';
let operator = '';
// this is the initial value when no numbers are pressed
let defaultDisplayValue = ' ';

// runs the event listeners
function run() {
    saveNum();
    saveOperator();
    clickOperate();
    clickAllClear();
    clickPercent();
    clickNegate();
    clickDecimal();
    clickBack();
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
            display();
        });
    });
}

// saves the operator for each calculation
// saveOperator prevents adding an operator when num1 is empty and num2 is full (see negate(), percent())
function saveOperator() {
    const operators = document.querySelectorAll('.operators');
    operators.forEach(function(elem) {
        elem.addEventListener('click', function() {
            if(num1 != '' && num2 == '') {
                operator = elem.value;
                display();
            }
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

// adds an event listener to percent (turns the number into a decimal)
function clickPercent() {
    const perc = document.querySelector('.percent');
    perc.addEventListener('click', percent);
}

// adds an event listener to negate (turns the number to negative/positive)
function clickNegate() {
    const neg = document.querySelector('.negate');
    neg.addEventListener('click', negate);
}

// adds an event listener to decimal "." (turn into a proper float)
function clickDecimal() {
    const dec = document.querySelector('.decimal');
    dec.addEventListener('click', decimal);
}

// adds an event listener to the backspace button
function clickBack() {
    const back = document.querySelector('.backspace');
    back.addEventListener('click', backspace);
}

/* DISPLAY AND CLEAR */

// updates the display
function display() {
    const displayBox = document.querySelector('.display');
    const logBox = document.querySelector('.log');
    if(num1 != '' && operator != '' && logBox.textContent != ' ') { /* &nbsp; */
        logBox.textContent = `Ans = ${num1}`
    }

    // if-statement prevents the display box from being '' (empty)
    if(num1 == '') {
        displayBox.textContent = defaultDisplayValue;
    } else {
        displayBox.textContent = `${num1} ${operator} ${num2}`;
    }
}

// clears everything including the display
function clear() {
    num1 = '';
    num2 = '';
    answer = '';
    operator = '';

    const displayBox = document.querySelector('.display');
    const logBox = document.querySelector('.log');
    displayBox.textContent = defaultDisplayValue;
    logBox.textContent = ' ';
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
    // don't operate num1, operator, or num2 is empty
    if(num1 == '' || operator == '' || num2 == '') {
        alert("ERR: INVALID FORMAT USED");
        return;
    }

    let parsedNum1 = parseFloat(num1);
    let parsedNum2 = parseFloat(num2);

    // console.log(`Operated ${parsedNum1}, ${operator}, ${parsedNum2}`);
    if(operator === '+') {
        answer = add(parsedNum1, parsedNum2);
    } else if (operator === '-') {
        answer = subtract(parsedNum1, parsedNum2);
    } else if (operator === '*') {
        answer = multiply(parsedNum1, parsedNum2);
    } else if (operator === '/') {
        answer = divide(parsedNum1, parsedNum2);
    }

    // if the answer is a decimal, round it
    if (answer % 1 != 0) {
        answer = roundDecimals(answer);
    }

    resetForNextCalculation();
    display();
}

// round decimals and parses them as a float (strips 0's)
function roundDecimals(num) {
    return parseFloat((num).toFixed(10));
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
    // if dividing by zero, alert an error
    if(b === 0) {
        alert("ERR: DIVIDE BY ZERO");
        return '';
    }
    return a / b;
}

// for percent, negate, decimal: 
// num1: num1 can't be empty and operator must be empty
// num2: num1 can't be empty (skip check b/c saveOperator() behavior) and operator can't be empty and num2 can't be empty
function percent() {
    if(num1 != '' && operator == '') {
        num1 = num1 / 100;
    }
    if(operator != '' && num2 != '') {
        num2 = num2 / 100;
    }
    display();
}

function negate() {
    if(num1 != '' && operator == '') {
        num1 = -num1;
    }
    if(operator != '' && num2 != '') {
        num2 = -num2;
    }
    display();
}

// add a . (only works once)
// turns the number into a string (may be an int if it was saved in ans) and checks if there is a '.'
function decimal() {
    if(num1 != '' && operator == '') {
        if(!num1.toString().includes('.')) {
            num1 += ".";
        }
    }
    if(operator != '' && num2 != '') {
        if(!num2.toString().includes('.')) {
            num2 += ".";
        }
    }
    display();
}

// check which one you are on and then slice the last one from that and save it back
function backspace() {
    if(num1 != '' && operator == '') {
        num1 = num1.toString().slice(0, -1);
    } else if(operator != '' && num2 == '') {
        operator = operator.toString().slice(0, -1);
    } else if(num2 != '') {
        num2 = num2.toString().slice(0, -1);
    }
    display();
}

// runs this when page loads
run();
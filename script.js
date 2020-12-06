const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn')

// Calculate first and secon nums depending on operator
const calc = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '/': (firstNumber, secondNumber) => secondNumber,
};

firstNum = 0;
operatorValue = '';
secondNum = false;

function sendNumberValue(number) {
    // replace current display value if first value is entered
    if (secondNum) {
        calcDisplay.textContent = number;
        secondNum = false;
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calcDisplay.textContent;
        calcDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator, don't add decimal
    if (secondNum) return;
    // If no decimal add one
    if (!calcDisplay.textContent.includes('.')) {
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
}



function useOperator(operator) {
    const currentValue = Number(calcDisplay.textContent);
    //Prevent multiple operators
    if (operatorValue && secondNum) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value 
    if (!firstNum) {
        firstNum = currentValue;
    } else {
        const calculation = calc[operatorValue](firstNum, currentValue);
        calcDisplay.textContent = calculation;
    }
    // ready for next value, storing operator 
    secondNum = true;
    operatorValue = operator;
}

// clear all display
function clearAll() {
    firstNum = 0;
    operatorValue = '';
    secondNum = false;
    calcDisplay.textContent = '0';
}

// Event Listners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Event Listner
clearBtn.addEventListener('click', clearAll);
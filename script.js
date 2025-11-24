const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += number;
}

function appendOperator(operator) {
    if (display.value === 'Error') return;
    const lastChar = display.value.slice(-1);
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '^'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function appendFunction(func) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += func;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        display.value = display.value.toString().slice(0, -1);
    }
}

function calculateResult() {
    try {
        if (display.value === '') return;

        let expression = display.value;

        // Replace visual symbols with JS math equivalents
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/π/g, 'Math.PI');
        expression = expression.replace(/e/g, 'Math.E');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');

        // Evaluate
        const result = eval(expression);

        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            // Limit decimal places for cleaner display if it's a long float
            display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/', '(', ')', '^'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        appendNumber('.');
    }
});

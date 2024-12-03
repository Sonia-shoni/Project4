const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result"); // Fixed method name

// Add event listeners to all buttons
for (let i = 0; i < buttonsEl.length; i++) {
    buttonsEl[i].addEventListener("click", () => {
        const buttonValue = buttonsEl[i].textContent;

        if (buttonValue === "C") {
            clearResult();
        } else if (buttonValue === "=") {
            calculateResult();
        } else {
            appendValue(buttonValue);
        }
    });
}

// Clear the input field
function clearResult() {
    inputFieldEl.value = "";
}

// Evaluate the expression and show result
function calculateResult() {
    try {
        // Use a safer evaluation approach
        let result = evaluateExpression(inputFieldEl.value);
        inputFieldEl.value = result;
    } catch (error) {
        // Handle any error in calculation (e.g., invalid input)
        inputFieldEl.value = "Error";
    }
}

// Append the value of the clicked button to the input field
function appendValue(buttonValue) {
    // Prevent multiple consecutive operators (e.g., "++", "--")
    const lastChar = inputFieldEl.value[inputFieldEl.value.length - 1];

    // Prevent appending operator if last character is already an operator
    if (["+", "-", "*", "/"].includes(buttonValue) && ["+", "-", "*", "/"].includes(lastChar)) {
        return;
    }

    // Prevent appending decimal if already present
    if (buttonValue === "." && lastChar === ".") {
        return;
    }

    inputFieldEl.value += buttonValue;
}

// A function to safely evaluate the expression (without using eval)
function evaluateExpression(expression) {
    // Remove any leading/trailing whitespaces
    expression = expression.trim();

    // Check if the expression is empty or invalid
    if (expression === "") {
        return "";
    }

    // Replace any "x" or "÷" symbols with * and / for calculation
    expression = expression.replace(/x/g, "*").replace(/÷/g, "/");

    // Try to calculate the result
    try {
        return new Function("return " + expression)();
    } catch (e) {
        throw new Error("Invalid expression");
    }
}

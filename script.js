// Calculator state
let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;

// DOM elements
const currentOperandElement = document.getElementById("current-operand");
const previousOperandElement = document.getElementById("previous-operand");

// Update the display
function updateDisplay() {
  currentOperandElement.textContent = formatDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandElement.textContent = `${formatDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandElement.textContent = "";
  }
}

// Format number for display (add thousand separators, keep decimals)
function formatDisplayNumber(number) {
  if (number === "Error") return number;
  const stringNumber = number.toString();
  const [integerPart, decimalPart] = stringNumber.split(".");
  const formattedInteger = Number(integerPart).toLocaleString("en", {
    maximumFractionDigits: 0,
  });
  if (decimalPart != null) {
    return `${formattedInteger}.${decimalPart}`;
  }
  return formattedInteger;
}

// Append a number
function appendNumber(number) {
  if (currentOperand === "Error") {
    clear();
  }
  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    // Prevent extremely long numbers
    if (currentOperand.replace(".", "").length >= 12) return;
    currentOperand += number;
  }
  updateDisplay();
}

// Append decimal point
function appendDecimal() {
  if (currentOperand === "Error") {
    clear();
  }
  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  }
  if (currentOperand.includes(".")) return;
  currentOperand += ".";
  updateDisplay();
}

// Choose an operator
function chooseOperation(op) {
  if (currentOperand === "Error") return;
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
  updateDisplay();
}

// Perform calculation
function compute() {
  if (operation == null || shouldResetScreen) return;

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "−":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operation = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Round to avoid floating point precision issues
  result = Math.round(result * 1e10) / 1e10;

  currentOperand = result.toString();
  operation = null;
  previousOperand = "";
  shouldResetScreen = true;
  updateDisplay();
}

// Clear everything
function clear() {
  currentOperand = "0";
  previousOperand = "";
  operation = null;
  shouldResetScreen = false;
  updateDisplay();
}

// Delete last character
function deleteNumber() {
  if (currentOperand === "Error") {
    clear();
    return;
  }
  if (shouldResetScreen) return;

  if (
    currentOperand.length === 1 ||
    (currentOperand.length === 2 && currentOperand.startsWith("-"))
  ) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

// Toggle positive/negative
function toggleSign() {
  if (currentOperand === "Error" || currentOperand === "0") return;
  if (shouldResetScreen) {
    shouldResetScreen = false;
  }
  if (currentOperand.startsWith("-")) {
    currentOperand = currentOperand.slice(1);
  } else {
    currentOperand = "-" + currentOperand;
  }
  updateDisplay();
}

// Percentage
function percentage() {
  if (currentOperand === "Error") return;
  const value = parseFloat(currentOperand);
  if (isNaN(value)) return;
  currentOperand = (value / 100).toString();
  shouldResetScreen = true;
  updateDisplay();
}

// Button click handler
function handleButtonClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const number = button.dataset.number;
  const operator = button.dataset.operator;

  if (number !== undefined) {
    appendNumber(number);
    return;
  }

  switch (action) {
    case "decimal":
      appendDecimal();
      break;
    case "operator":
      chooseOperation(operator);
      break;
    case "equals":
      compute();
      break;
    case "clear":
      clear();
      break;
    case "delete":
      deleteNumber();
      break;
    case "plus-minus":
      toggleSign();
      break;
    case "percent":
      percentage();
      break;
  }
}

// Keyboard support
function handleKeyboardInput(event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    event.preventDefault();
    appendNumber(key);
    return;
  }

  switch (key) {
    case ".":
    case ",":
      event.preventDefault();
      appendDecimal();
      break;
    case "+":
      event.preventDefault();
      chooseOperation("+");
      break;
    case "-":
      event.preventDefault();
      chooseOperation("−");
      break;
    case "*":
    case "x":
    case "X":
      event.preventDefault();
      chooseOperation("×");
      break;
    case "/":
      event.preventDefault();
      chooseOperation("÷");
      break;
    case "Enter":
    case "=":
      event.preventDefault();
      compute();
      break;
    case "Backspace":
      event.preventDefault();
      deleteNumber();
      break;
    case "Escape":
      event.preventDefault();
      clear();
      break;
    case "%":
      event.preventDefault();
      percentage();
      break;
  }
}

// Event listeners
document.querySelector(".buttons").addEventListener("click", handleButtonClick);
document.addEventListener("keydown", handleKeyboardInput);

// Initial display
updateDisplay();

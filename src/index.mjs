import "./styles.css";

// Initial setup
let inputArray = [];
let operatorArray = [];
let displayArray = [];
let hasDecimal = false;

function handleClick(event) {
  const buttonValue = event.target.textContent;
  const operators = ["+", "-", "*", "/"];

  // Handle number input and decimal input
  if (!isNaN(buttonValue) || (buttonValue === "." && !hasDecimal)) {
    handleNumberOrDecimal(buttonValue);
  }

  // Handle operator input
  else if (operators.includes(buttonValue)) {
    handleOperator(buttonValue);
  }

  // Handle equal button (calculate result)
  else if (buttonValue === "=") {
    calculateResult();
  }

  // Handle clear button
  else if (buttonValue === "C") {
    clearCalculator();
  }

  // Update the calculator display after every input
  updateDisplay();
}

// Handle the number or decimal input
function handleNumberOrDecimal(buttonValue) {
  if (operatorArray.length > 0) {
    inputArray = inputArray.concat(operatorArray);
    operatorArray = [];
  }

  if (buttonValue === ".") {
    hasDecimal = true;
  }

  inputArray.push(buttonValue);
  displayArray.push(buttonValue);
}

function handleOperator(buttonValue) {
  const operators = ["+", "-", "*", "/"];

  // If the operator array is empty push to 0
  if (operatorArray.length === 0) {
    operatorArray.push(buttonValue);
    displayArray.push(buttonValue);
  }

  // If the operator array has value and the button value is "-" push to 1
  else if (
    operatorArray.length === 1 &&
    operatorArray[0] !== "-" &&
    buttonValue === "-"
  ) {
    operatorArray.push(buttonValue);
    displayArray.push(buttonValue);
  }

  // If the operator array has two places and a new operatory is entered overwrite the array
  else if (
    operatorArray.length === 2 ||
    (operatorArray.length === 1 && buttonValue !== "-")
  ) {
    operatorArray = [buttonValue];
    displayArray[displayArray.length - 1] = buttonValue;
  }

  hasDecimal = false;
}

// Calculate the result of the current input
function calculateResult() {
  try {
    // Merge the arrays before calculation
    if (operatorArray.length > 0) {
      inputArray = inputArray.concat(operatorArray);
    }
    const result = eval(inputArray.join("")); // Calculate the expression
    inputArray = [result.toString()];
    displayArray = [result.toString()];
    operatorArray = [];
  } catch (error) {
    inputArray = []; // Clear input array in case of error
    displayArray = ["error"]; // Display error
  }
}

// Clear the calculator input and reset flags
function clearCalculator() {
  inputArray = [];
  operatorArray = [];
  displayArray = [];
  hasDecimal = false;
}

// Update the display of the calculator
function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayArray.length === 0 ? "0" : displayArray.join("");
}

// Event listener for buttons
document
  .querySelectorAll(".num-button, .mod-button, .cal-button")
  .forEach((button) => {
    button.addEventListener("click", handleClick);
  });

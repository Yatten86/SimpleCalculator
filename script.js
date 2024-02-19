// Select the calculator container element.
const myCalculator = document.querySelector(".myCalc");

// Define the keys for the calculator in a 2D array to represent the layout.
const myKeys = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "*"],
  ["C", "0", "=", "/"],
];

// Define the operators that the calculator will use.
const myOperators = ["+", "-", "*", "/"];

// Variable to store the output display element.
let myOutput;

// Wait for the DOM to fully load before executing the script.
document.addEventListener("DOMContentLoaded", function () {
  // Create and initialize the output display section of the calculator.
  myOutput = document.createElement("div");
  myOutput.innerHTML = "0"; // Default display value.
  myOutput.classList.add("output"); // Add styling class.
  myCalculator.appendChild(myOutput); // Append the output display to the calculator container.

  // Generate the calculator buttons based on the myKeys array.
  for (let i = 0; i < myKeys.length; i++) {
    let div = document.createElement("div");
    div.classList.add("row"); // Add styling class for a row of buttons.

    // Create each button in the current row.
    for (let x = 0; x < myKeys[i].length; x++) {
      let button = document.createElement("div");
      button.innerHTML = myKeys[i][x]; // Set button label.
      button.classList.add("button"); // Add styling class.
      button.addEventListener("click", buttonClicked); // Attach click event handler.

      div.appendChild(button); // Add the button to the current row.
    }

    myCalculator.appendChild(div); // Add the current row of buttons to the calculator.
  }
});

// Function to handle calculator button clicks.
function buttonClicked() {
  console.log(this.innerText); // Debugging: log clicked button.
  let value = this.innerText; // Get the value of the clicked button.
  let calculation = myOutput.innerText; // Get the current calculation string.

  // If the display shows "0", clear it.
  if (calculation == "0") {
    calculation = "";
  }

  // If the "=" button is clicked, evaluate the calculation.
  if (value == "=") {
    calculation = eval(calculation); // Use eval to calculate the string expression.
  } else {
    // If an operator is clicked, check conditions to replace or calculate.
    let lastChar = calculation.substring(calculation.length - 1); // Get the last character of the calculation.
    if (myOperators.includes(value)) {
      // If the last character is also an operator, replace it.
      if (myOperators.includes(lastChar)) {
        calculation = calculation.substring(0, calculation.length - 1);
      } else {
        // Otherwise, calculate the expression before adding the new operator.
        calculation = eval(calculation);
      }
    }
    // Append the clicked value to the calculation string.
    calculation += value;
  }

  // If the "C" button is clicked, reset the calculation to "0".
  if (value == "C") {
    calculation = "0";
  }

  // Update the display with the new or calculated value.
  myOutput.innerText = calculation;
}

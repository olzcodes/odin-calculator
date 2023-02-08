const add = function (number1, number2) {
  return number1 + number2;
};

const subtract = function (number1, number2) {
  return number1 - number2;
};

const multiply = function (number1, number2) {
  return number1 * number2;
};

const divide = function (number1, number2) {
  return number1 / number2;
};

const operate = function (operator, number1, number2) {
  return operator(number1, number2);
};

const displayEl = document.querySelector(".display");

let displayValue = "";

const updateDisplayValue = function (number) {
  displayValue = displayValue + number;
  // console.log(displayValue);
  displayEl.textContent = displayValue;
};

const buttonsContainer = document.querySelector(".buttons-container");

buttonsContainer.addEventListener("click", function (e) {
  console.log(e.target.textContent);
  console.log(e.target.classList.value.split(" ")[1]);
  const clicked = e.target.classList.value.split(" ")[1];
  if (clicked === "number") {
    updateDisplayValue(e.target.textContent);
  }
});

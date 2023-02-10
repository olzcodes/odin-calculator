const operate = {
  add: function (number1, number2) {
    return number1 + number2;
  },
  subtract: function (number1, number2) {
    return number1 - number2;
  },
  multiply: function (number1, number2) {
    return number1 * number2;
  },
  divide: function (number1, number2) {
    return number1 / number2;
  },
};

let displayValue = "";
let number1;
let number2;
let operator;
let result;

const clear = function () {
  displayValue = "";
  updateDisplayValue(0);
  displayValue = "";
  number1 = 0;
  number2 = 0;
  operator = "";
};

const displayEl = document.querySelector(".display");

const updateDisplayValue = function (number) {
  displayValue = displayValue + number;
  displayEl.textContent = displayValue;
};

const buttonsContainer = document.querySelector(".buttons-container");

buttonsContainer.addEventListener("click", function (e) {
  const clicked = e.target.classList.value.split(" ")[1];
  if (clicked === "number") {
    updateDisplayValue(e.target.textContent);
  }
  if (clicked === "operator") {
    number1 = displayValue;
    displayValue = "";
    operator = e.target.id;
  }
  if (clicked === "equal") {
    number2 = displayValue;
    result = operate[operator](parseInt(number1), parseInt(number2));
    displayValue = "";
    updateDisplayValue(result);
  }
  if (clicked === "clear") {
    clear();
  }
});

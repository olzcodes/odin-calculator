const displayInputEl = document.querySelector(".display-input");
const displayResultEl = document.querySelector(".display-result");
const buttons = document.querySelectorAll("button");
let displayInputValue = "";
let displayResultValue = "";

const newMemory = function () {
  return {
    temp: "",
    number1: 0,
    number2: 0,
    operator: "",
    result: 0,
  };
};

let memory = newMemory();

const processInput = function () {
  let inputType = this.classList.value.split(" ")[1];
  let inputValue = this.id;
  if (inputType === "number") inputNumber(inputValue);
  if (inputType === "operator") {
    let operatorSymbol = this.textContent;
    inputOperator(inputValue, operatorSymbol);
  }
  if (inputType === "equal") inputEqual(inputValue);
  if (inputType === "backspace") backspace();
  if (inputType === "clear") clear();
  console.log(inputValue);
  console.table(memory);
};

buttons.forEach((button) => button.addEventListener("click", processInput));

const invalidInput = function (inputValue) {
  // Prevent multiple decimal points in first number
  if (
    memory.temp.split(",")[0].includes(".") &&
    !memory.temp.includes(",") &&
    inputValue === "."
  )
    return true;
  // Prevent multiple decimal points in second number
  if (memory.temp.split(",")[1]?.includes(".") && inputValue === ".")
    return true;
};

const autoCorrectNumberInput = function (value) {
  const deletePreviousInput = function () {
    memory.temp = memory.temp.slice(0, -1);
    displayInputValue = displayInputValue.slice(0, -1);
  };
  // Delete leading zeroes in first number, if any
  if (memory.temp.slice(0) === "0" && !isNaN(value)) {
    deletePreviousInput();
  }
  if (memory.temp.slice(0) === "-0" && !isNaN(value)) {
    deletePreviousInput();
  }
  // Delete leading zeroes in second number, if any
  if (memory.temp.split(",")[1] === "0" && !isNaN(value)) {
    deletePreviousInput();
  }
  if (memory.temp.split(",")[1] === "-0" && !isNaN(value)) {
    deletePreviousInput();
  }
  // Add leading zeroes in front of decimals, if missing
  if (memory.temp.slice(0) === ".") {
    memory.temp = "0.";
    displayInputValue = "0.";
  }
  if (memory.temp.split(",")[1] === ".") {
    memory.temp = memory.temp.slice(0, -1);
    memory.temp += "0.";
    displayInputValue = displayInputValue.slice(0, -1);
    displayInputValue += "0.";
  }
  // Add leading zeroes in front of negative decimals, if missing
  if (memory.temp.slice(0) === "-.") {
    memory.temp = "-0.";
    displayInputValue = "-0.";
  }
  if (memory.temp.split(",")[1] === "-.") {
    memory.temp = memory.temp.slice(0, -2);
    memory.temp += "-0.";
    displayInputValue = displayInputValue.slice(0, -2);
    displayInputValue += "-0.";
  }
  // Delete minus sign if the first number is zero
  if (memory.temp.slice(0) === "-0,") {
    memory.temp = memory.temp.slice(-2);
    displayInputValue = displayInputValue.slice(-2);
  }
  // Delete decimal point if there is no number after
  if (memory.temp.slice(-2) === ".,") {
    memory.temp = memory.temp.slice(0, -2);
    memory.temp += ",";
    displayInputValue = displayInputValue.slice(0, -2);
    displayInputValue += value;
  }
  updateDisplayInput("");
};

const inputNumber = function (inputValue) {
  if (invalidInput(inputValue)) return;
  autoCorrectNumberInput(inputValue);
  updateDisplayInput(inputValue);
  memory.temp += inputValue;
  if (memory.temp.includes(",")) calculate();
};

const inputOperator = function (inputValue, operatorSymbol) {
  // Prevent input of operator for specific scenarios
  if (memory.temp === "-" || memory.temp === "-." || memory.temp === ".")
    return;

  // Allow input of minus sign in front of numbers
  if (memory.temp === "" || memory.temp.split(",")[1] === "") {
    if (operatorSymbol === "−") {
      memory.temp += "-";
      updateDisplayInput(operatorSymbol);
    }
    return;
  }

  if (memory.temp.split(",")[1] === "." || memory.temp.slice(-2) === ",-")
    return;

  if (memory.temp.includes(",")) {
    calculate("operator");
  }

  memory.temp += ",";
  memory.operator = inputValue;
  updateDisplayInput(operatorSymbol);
  autoCorrectNumberInput(operatorSymbol);
  displayResultValue = "";
};

const inputEqual = function () {
  if (!memory.temp.split(",")[1]) return;

  calculate("equal");
};

const backspace = function () {
  memory.temp = memory.temp.slice(0, -1);
  let newDisplayInputValue = displayInputValue.slice(0, -1);
  displayInputValue = "";
  updateDisplayInput(newDisplayInputValue);
  if (memory.operator) calculate();
};

const clear = function () {
  memory = newMemory();
  displayInputValue = "";
  updateDisplayInput("READY");
  displayInputValue = "";
  displayResultValue = "";
  updateDisplayResult("");
  console.clear();
};

const calculate = function (trigger) {
  memory.number1 = parseFloat(memory.temp.split(",")[0]);
  memory.number2 = parseFloat(memory.temp.split(",")[1]);
  memory.result = operate[memory.operator](memory.number1, memory.number2);
  displayResultValue = "";
  if (isNaN(memory.result)) {
    updateDisplayResult("");
  } else {
    updateDisplayResult(memory.result);
  }

  if (trigger === "operator" || trigger === "equal") {
    memory = newMemory();
    memory.temp = displayResultValue;
    displayInputValue = "";
    updateDisplayInput(displayResultValue);
    displayResultValue = "";
    updateDisplayResult("");
  }

  if (memory.result === Infinity) {
    displayResultValue = "";
    updateDisplayResult(atob("RnV0dXJlIHByaWNlIG9mIEJpdGNvaW4="));
  }
};

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

const updateDisplayInput = function (input) {
  displayInputValue += input;
  displayInputEl.textContent = displayInputValue;
};

const updateDisplayResult = function (number) {
  displayResultValue += number;
  displayResultEl.textContent = `= ${displayResultValue}`;
};

const useKeyboard = function () {
  window.addEventListener("keydown", function (e) {
    e.preventDefault();

    const findButtonById = function (id) {
      return Array.from(buttons).find((button) => button.id === id);
    };

    if (e.code === "NumpadEnter" || e.code === "Enter")
      processInput.bind(findButtonById("equal"))();
    if (e.code === "Backspace" || e.code === "Delete")
      processInput.bind(findButtonById("backspace"))();
    if (e.code === "Escape") processInput.bind(findButtonById("clear"))();

    if (e.code === "NumpadDivide")
      processInput.bind(findButtonById("divide"))();
    if (e.code === "NumpadMultiply")
      processInput.bind(findButtonById("multiply"))();
    if (e.code === "NumpadSubtract")
      processInput.bind(findButtonById("subtract"))();
    if (e.code === "NumpadAdd") processInput.bind(findButtonById("add"))();

    if (e.code === "NumpadDecimal") processInput.bind(findButtonById("."))();

    if (e.code === "Digit0" || e.code === "Numpad0")
      processInput.bind(findButtonById("0"))();
    if (e.code === "Digit1" || e.code === "Numpad1")
      processInput.bind(findButtonById("1"))();
    if (e.code === "Digit2" || e.code === "Numpad2")
      processInput.bind(findButtonById("2"))();
    if (e.code === "Digit3" || e.code === "Numpad3")
      processInput.bind(findButtonById("3"))();
    if (e.code === "Digit4" || e.code === "Numpad4")
      processInput.bind(findButtonById("4"))();
    if (e.code === "Digit5" || e.code === "Numpad5")
      processInput.bind(findButtonById("5"))();
    if (e.code === "Digit6" || e.code === "Numpad6")
      processInput.bind(findButtonById("6"))();
    if (e.code === "Digit7" || e.code === "Numpad7")
      processInput.bind(findButtonById("7"))();
    if (e.code === "Digit8" || e.code === "Numpad8")
      processInput.bind(findButtonById("8"))();
    if (e.code === "Digit9" || e.code === "Numpad9")
      processInput.bind(findButtonById("9"))();
  });
};

useKeyboard();

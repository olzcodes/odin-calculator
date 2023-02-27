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
  if (inputType === "clear") clear();
  console.log(inputValue);
  console.table(memory);
};

buttons.forEach((button) => button.addEventListener("click", processInput));

const inputNumber = function (inputValue) {
  updateDisplayInput(inputValue);
  memory.temp += inputValue;
  if (memory.temp.split(",").length > 1) calculate();
};

const inputOperator = function (inputValue, operatorSymbol) {
  if (
    memory.temp === "" ||
    memory.temp === "." ||
    memory.temp.split(",")[1] === ""
  ) {
    memory.operator = inputValue;
    updateDisplayInput(operatorSymbol);
    return;
  }

  if (memory.temp.split(",").length > 1) calculate("operator");

  updateDisplayInput(operatorSymbol);
  displayResultValue = "";
  memory.temp += ",";
  memory.operator = inputValue;
};

const inputEqual = function () {
  if (
    memory.temp.split(",").length < 2 ||
    memory.temp.split(",")[1] === "" ||
    memory.temp.split(",")[1] === "."
  )
    return;

  if (memory.temp.split(",").length > 1) calculate("equal");

  displayResultValue = "";
};

const clear = function () {
  displayInputValue = "";
  updateDisplayInput("");
  displayResultValue = "";
  updateDisplayResult(0);
  memory = newMemory();
  console.clear();
};

const calculate = function (trigger) {
  displayResultValue = "";
  memory.number1 = parseFloat(memory.temp.split(",")[0]);
  memory.number2 = parseFloat(memory.temp.split(",")[1]);
  memory.result = operate[memory.operator](memory.number1, memory.number2);
  updateDisplayResult(memory.result);

  if (trigger === "operator" || trigger === "equal") {
    memory = newMemory();
    memory.temp = displayResultValue;
    displayInputValue = "";
    updateDisplayInput(displayResultValue);
    displayResultValue = "";
    updateDisplayResult(0);
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
  displayInputValue = displayInputValue + input;
  displayInputEl.textContent = displayInputValue;
};

const updateDisplayResult = function (number) {
  displayResultValue = displayResultValue + number;
  displayResultEl.textContent = displayResultValue;
};

const useKeyboard = function () {
  window.addEventListener("keydown", function (e) {
    e.preventDefault();

    const findButtonById = function (id) {
      return Array.from(buttons).find((button) => button.id === id);
    };

    if (e.code === "NumpadEnter") processInput.bind(findButtonById("equal"))();
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

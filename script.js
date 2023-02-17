const displayEl = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let displayValue = "";
const displayMaxLength = 10;

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

const updateDisplayValue = function (number) {
  displayValue = displayValue + number;
  displayEl.textContent = displayValue;
};

const processInput = function () {
  let inputType = this.classList.value.split(" ")[1];
  let inputValue = this.id;
  if (inputType === "number") inputNumber(inputValue);
  if (inputType === "operator") inputOperator(inputValue);
  if (inputType === "equal") inputEqual(inputValue);
  if (inputType === "clear") clear();
  console.log(this);
  console.log(inputValue);
  console.table(memory);
};

const inputNumber = function (inputValue) {
  updateDisplayValue(inputValue);
  memory.temp += inputValue;
};

const inputOperator = function (inputValue) {
  if (
    memory.temp === "" ||
    memory.temp === "." ||
    memory.temp.split(",")[1] === ""
  ) {
    memory.operator = inputValue;
    return;
  }

  if (memory.temp.split(",").length > 1) {
    displayValue = "";
    memory.number1 = parseFloat(memory.temp.split(",")[0]);
    memory.number2 = parseFloat(memory.temp.split(",")[1]);
    memory.temp = "";
    memory.result = operate[memory.operator](memory.number1, memory.number2);
    updateDisplayValue(memory.result);
    memory.temp += memory.result;
  }

  displayValue = "";
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

  if (memory.temp.split(",").length > 1) {
    displayValue = "";
    memory.number1 = parseFloat(memory.temp.split(",")[0]);
    memory.number2 = parseFloat(memory.temp.split(",")[1]);
    memory.temp = "";
    memory.result = operate[memory.operator](memory.number1, memory.number2);
    updateDisplayValue(memory.result);
    memory.temp += memory.result;
  }

  displayValue = "";
};

const clear = function () {
  displayValue = "";
  updateDisplayValue(0);
  displayValue = "";
  memory = newMemory();
  console.clear();
};

buttons.forEach((button) => button.addEventListener("click", processInput));

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

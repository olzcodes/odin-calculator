const displayEl = document.querySelector(".display");
const buttonsContainer = document.querySelector(".buttons-container");
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

buttonsContainer.addEventListener("click", function (e) {
  const clicked = e.target.classList.value.split(" ")[1];
  if (clicked === "number") {
    updateDisplayValue(e.target.id);
    memory.temp += e.target.id;
  }
  if (clicked === "operator") {
    if (
      memory.temp === "" ||
      memory.temp === "," ||
      memory.temp.split(",")[1] === ""
    ) {
      memory.operator = e.target.id;
      return;
    }
    if (memory.operator && memory.temp.split(",").length > 1) {
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
    memory.operator = e.target.id;
  }
  if (clicked === "equal") {
    if (memory.temp.split(",").length < 2 || memory.temp.split(",")[1] === "")
      return;
    displayValue = "";
    memory.number1 = parseFloat(memory.temp.split(",")[0]);
    memory.number2 = parseFloat(memory.temp.split(",")[1]);
    memory.temp = "";
    memory.result = operate[memory.operator](memory.number1, memory.number2);
    updateDisplayValue(memory.result);
    memory.temp += memory.result;
    displayValue = "";
  }
  if (clicked === "clear") {
    clear();
    console.clear();
  }
  console.log(e.target.id);
  console.table(memory);
});

const clear = function () {
  displayValue = "";
  updateDisplayValue(0);
  displayValue = "";
  memory = newMemory();
};

const useKeyboard = function () {
  window.addEventListener("keydown", function (e) {
    if (e.code === "NumpadEnter") console.log(e.code);
    if (e.code === "Escape") console.log(e.code);

    if (e.code === "NumpadDivide") console.log(e.code);
    if (e.code === "NumpadMultiply") console.log(e.code);
    if (e.code === "NumpadSubtract") console.log(e.code);
    if (e.code === "NumpadAdd") console.log(e.code);

    if (e.code === "NumpadDecimal") console.log(e.code);

    if (e.code === "Digit0" || e.code === "Numpad0") console.log(e.code);
    if (e.code === "Digit1" || e.code === "Numpad1") console.log(e.code);
    if (e.code === "Digit2" || e.code === "Numpad2") console.log(e.code);
    if (e.code === "Digit3" || e.code === "Numpad3") console.log(e.code);
    if (e.code === "Digit4" || e.code === "Numpad4") console.log(e.code);
    if (e.code === "Digit5" || e.code === "Numpad5") console.log(e.code);
    if (e.code === "Digit6" || e.code === "Numpad6") console.log(e.code);
    if (e.code === "Digit7" || e.code === "Numpad7") console.log(e.code);
    if (e.code === "Digit8" || e.code === "Numpad8") console.log(e.code);
    if (e.code === "Digit9" || e.code === "Numpad9") console.log(e.code);
  });
};

useKeyboard();

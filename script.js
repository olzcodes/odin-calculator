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
let displayMaxLength = 10;

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

const clear = function () {
  displayValue = "";
  updateDisplayValue(0);
  displayValue = "";
  memory = newMemory();
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

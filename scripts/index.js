let num1 = "";
let num2 = "";
let action = "";
let result = "0";
let isFirstNumber = true;
let equalsPressed = true;

const COUNT_NUMBER_BTN = 10;

const MAX_RESULT_LENGTH = 13;
const MAX_ACTION_NUM_LENGTH = 13;
const MAX_NON_EXPONENT_NUM = 1.0e13;
const MIN_NON_EXPONENT_NUM = 1.0e-13;

const E = resultProcessing(Math.E);
const PI = resultProcessing(Math.PI);
const SQRT2 = resultProcessing(Math.SQRT2);
const SQRT3 = resultProcessing(Math.sqrt(3));

const inputNum1Block = document.querySelector(".input-num1");
const inputNum2Block = document.querySelector(".input-num2");
const inputActionBlock = document.querySelector(".action");
const resultBlock = document.querySelector(".result");
const numbersBtnArray = document.querySelectorAll(".btn-number");
const equalsBtn = document.querySelector(".btn-equals");
const allDoubleActionBtn = document.querySelectorAll(".btn-double-action");
const pointBtn = document.querySelector(".btn-point");
const allClearBtn = document.querySelector(".btn-clear-all");
const symbolClearBtn = document.querySelector(".btn-clear");
const plusMinusBtn = document.querySelector(".btn-plus-minus");
const sqrtBtn = document.querySelector(".btn-sqrt");
const factorialBtn = document.querySelector(".btn-factorial");
const lnBtn = document.querySelector(".btn-ln");
const eBtn = document.querySelector(".btn-e");
const piBtn = document.querySelector(".btn-pi");
const sqrt2Btn = document.querySelector(".btn-sqrt2");
const sqrt3Btn = document.querySelector(".btn-sqrt3");

function errorHandling() {
  num1 = "";
  num2 = "";
  action = "";
  result = "Error";
}

function resultProcessing(result) {
  if (
    (Math.abs(result) > MAX_NON_EXPONENT_NUM || Math.abs(result) < MIN_NON_EXPONENT_NUM) &&
    Number(result) !== 0
  ) {
    return String(Number(result).toExponential(3));
  }
  if (result === "Error") {
    return "Error";
  }
  return String(
    parseFloat(Number(Number(result).toFixed(MAX_RESULT_LENGTH)).toPrecision(MAX_RESULT_LENGTH))
  );
}

function doAction(num1, num2, action) {
  if (num1 === "") {
    return "0";
  }
  if (num2 === "") {
    return num1;
  }

  switch (action) {
    case "+":
      return String(Number(num1) + Number(num2));
    case "-":
      return String(num1 - num2);
    case "x":
      return String(num1 * num2);
    case "/":
      if (Math.abs(num1 / num2) === Infinity) {
        return "Error";
      }
      return String(num1 / num2);
    case "%":
      if (Math.abs(num1 / num2) === Infinity) {
        return "Error";
      }
      return String(num1 % num2);
    default:
      return num1;
  }
}

function changeInput(num1, num2, action, result) {
  inputNum1Block.innerHTML = num1;
  inputActionBlock.innerHTML = action;
  inputNum2Block.innerHTML = num2;
  resultBlock.innerHTML = "=" + result;
}

function changeFontSizeInInput() {
  if (equalsPressed) {
    inputNum1Block.classList.add("secondary-text");
    inputNum1Block.classList.remove("main-text");

    inputNum2Block.classList.add("secondary-text");
    inputNum2Block.classList.remove("main-text");

    inputActionBlock.classList.add("secondary-text");
    inputActionBlock.classList.remove("main-text");

    resultBlock.classList.add("main-text");
    resultBlock.classList.remove("secondary-text");
  } else {
    inputNum1Block.classList.remove("secondary-text");
    inputNum1Block.classList.add("main-text");

    inputNum2Block.classList.remove("secondary-text");
    inputNum2Block.classList.add("main-text");

    inputActionBlock.classList.remove("secondary-text");
    inputActionBlock.classList.add("main-text");

    resultBlock.classList.remove("main-text");
    resultBlock.classList.add("secondary-text");
  }
}

/* For numbers */
for (let i = 1; i <= COUNT_NUMBER_BTN; ++i) {
  numbersBtnArray[i - 1].addEventListener("click", () => {
    if (equalsPressed === true) {
      num1 = "";
      equalsPressed = false;
    }
    if (isFirstNumber && num1.length < MAX_ACTION_NUM_LENGTH) {
      if (num1 === "0") {
        num1 = "";
      }
      num1 += i % 10;
    } else if (num2.length < MAX_ACTION_NUM_LENGTH) {
      if (num2 === "0") {
        num2 = "";
      }
      num2 += i % 10;
    }

    changeFontSizeInInput();
    result = resultProcessing(doAction(num1, num2, action));
    changeInput(num1, num2, action, result);
  });
}

/*For double action*/
allDoubleActionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (result === "Error") {
      return;
    }

    if (num1 !== "") {
      if (equalsPressed) {
        equalsPressed = false;
      }
      if (action !== "" && btn.innerHTML === "-" && num2 === "") {
        num2 += "-";
      } else if (num1 !== "-") {
        action = btn.innerHTML;
        if (isFirstNumber) {
          isFirstNumber = false;
        } else {
          num1 = result;
          num2 = "";
        }
      }
    } else if (action === "" && isFirstNumber && btn.innerHTML === "-") {
      equalsPressed = false;
      num1 += "-";
    }
    changeFontSizeInInput();
    changeInput(num1, num2, action, result);
  });
});

/* point */
pointBtn.addEventListener("click", () => {
  if (isFirstNumber && !num1.includes(".")) {
    equalsPressed = false;
    if (num1.length === 0 || num1 === "-") {
      num1 += "0";
    }
    num1 += ".";
  } else if (!num2.includes(".") && num2.length === 0) {
    num2 = "0.";
  } else if (!num2.includes(".")) {
    num2 += ".";
  }
  result = resultProcessing(doAction(num1, num2, action));
  changeInput(num1, num2, action, result);
});

/* equals */
equalsBtn.addEventListener("click", () => {
  equalsPressed = true;
  changeFontSizeInInput();
  isFirstNumber = true;
  if (result === "Error") {
    num1 = "";
  } else {
    num1 = result;
  }
  num2 = "";
  action = "";
  changeInput("", num2, action, result);
});

/* Clear */
allClearBtn.addEventListener("click", () => {
  equalsPressed = true;
  changeFontSizeInInput();
  isFirstNumber = true;
  num1 = "";
  num2 = "";
  action = "";
  result = "0";
  changeInput(num1, num2, action, result);
});

symbolClearBtn.addEventListener("click", () => {
  if (result === "Infinity" || result === "-Infinity") {
    result = "";
    num1 = "";
    num2 = "";
    action = "";
  }
  if (isFirstNumber && num1.length !== 0) {
    num1 = String(num1).substring(0, String(num1).length - 1);
  } else if (num2.length !== 0) {
    num2 = String(num2).substring(0, String(num2).length - 1);
  } else {
    action = "";
    isFirstNumber = true;
  }

  if (num1 === "-") {
    num1 = "";
  }
  if (num2 === "-") {
    num2 = "";
  }
  if (num1 === "" && num2 === "" && action === "") {
    equalsPressed = true;
    changeFontSizeInInput();
  }
  result = resultProcessing(doAction(num1, num2, action));
  changeInput(num1, num2, action, result);
});

/* +/- */
plusMinusBtn.addEventListener("click", () => {
  if (result === "Error") {
    return;
  }
  equalsPressed = true;
  isFirstNumber = true;
  result = -result;
  num1 = result;
  num2 = "";
  action = "";
  changeInput(num1, num2, action, result);
});

/* sqrt */
function sqrtChangeInput() {
  if (num1 === "") {
    changeInput("√" + 0, num2, action, result);
  } else {
    changeInput("√" + num1, num2, action, result);
  }
}

sqrtBtn.addEventListener("click", () => {
  if (result === "Error") {
    return;
  }

  equalsPressed = true;
  changeFontSizeInInput();
  isFirstNumber = true;

  if (result >= 0) {
    result = resultProcessing(Math.sqrt(result));

    sqrtChangeInput();
    num1 = result;
    num2 = "";
    action = "";
    resultBlock.innerHTML = "=" + result;
  } else {
    errorHandling();
    changeInput(num1, num2, action, result);
  }
});

/* factorial */

function getFactorial(n) {
  if (n > 170) {
    return "Infinity";
  }
  let result = 1;
  for (let i = 2; i <= n; ++i) {
    result *= i;
  }
  return resultProcessing(result);
}

function factorialChangeInput() {
  if (num1 === "") {
    changeInput(0 + "!", num2, action, result);
  } else if (num2 === "") {
    changeInput(num1 + "!", num2, "", result);
  } else {
    changeInput(doAction(num1, num2, action) + "!", "", "", result);
  }
}

factorialBtn.addEventListener("click", () => {
  if (result === "Error") {
    return;
  }
  equalsPressed = true;
  changeFontSizeInInput();
  isFirstNumber = true;

  if (result === String(Math.trunc(result)) && result >= 0) {
    result = getFactorial(result);

    factorialChangeInput();

    num2 = "";
    action = "";
    num1 = result;
  } else {
    errorHandling();
    result = "Error";
    changeInput(num1, num2, action, result);
  }
});

/* ln */

lnBtn.addEventListener("click", () => {
  if (result === "Error") {
    return;
  }
  equalsPressed = true;
  changeFontSizeInInput();
  isFirstNumber = true;

  result = resultProcessing(Math.log2(result));
  if (result === Infinity || result === -Infinity || isNaN(result)) {
    errorHandling();
    changeInput(num1, num2, action, result);
  } else {
    num2 = "";
    action = "";
    changeInput("ln(" + num1 + ")", num2, action, result);
    num1 = result;
  }
});

/* Constant btns */

eBtn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = E;
    result = num1;
    changeInput(num1, num2, action, result);
  } else {
    num2 = E;
    result = resultProcessing(doAction(num1, num2, action));
    changeInput(num1, num2, action, result);
  }
});

piBtn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = PI;
    result = num1;
    changeInput(num1, num2, action, result);
  } else {
    num2 = PI;
    result = resultProcessing(doAction(num1, num2, action));
    changeInput(num1, num2, action, result);
  }
});

sqrt2Btn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = SQRT2;
    result = num1;
    changeInput(num1, num2, action, result);
  } else {
    num2 = SQRT2;
    result = resultProcessing(doAction(num1, num2, action));
    changeInput(num1, num2, action, result);
  }
});

sqrt3Btn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = SQRT3;
    result = num1;
    changeInput(num1, num2, action, result);
  } else {
    num2 = SQRT3;
    result = resultProcessing(doAction(num1, num2, action));
    changeInput(num1, num2, action, result);
  }
});

/* keyboard */

document.addEventListener("keydown", (event) => {
  let key = event.key;

  switch (key) {
    case "0":
      numbersBtnArray[9].click();
      break;
    case "1":
      if (!event.shiftKey) {
        numbersBtnArray[0].click();
      }
      break;
    case "2":
      if (!event.shiftKey) {
        numbersBtnArray[1].click();
      }
      break;
    case "3":
      if (!event.shiftKey) {
        numbersBtnArray[2].click();
      }
      break;
    case "4":
      numbersBtnArray[3].click();
      break;
    case "5":
      if (!event.shiftKey) {
        numbersBtnArray[4].click();
      }
      break;
    case "6":
      numbersBtnArray[5].click();
      break;
    case "7":
      numbersBtnArray[6].click();
      break;
    case "8":
      numbersBtnArray[7].click();
      break;
    case "9":
      numbersBtnArray[8].click();
      break;
    case "%": // remainder of div btn
      if (event.shiftKey) {
        allDoubleActionBtn[0].click();
      }
      break;
    case "/": // div btn
      allDoubleActionBtn[1].click();
      break;
    case "*": // mult btn
      allDoubleActionBtn[2].click();
      break;
    case "-": // minus btn
      allDoubleActionBtn[3].click();
      break;
    case "+": // plus btn
      allDoubleActionBtn[4].click();
      break;
    case ".": // point btn
      pointBtn.click();
      break;
    case "=": // equals first btn
      equalsBtn.click();
      break;
    case "Enter": // equals second btn
      equalsBtn.click();
      break;
    case "!": // factorial shift + 1 btn
      if (event.shiftKey) {
        factorialBtn.click();
      }
      break;
    case "Backspace": // clear 1 symbol btn
      symbolClearBtn.click();
      break;
    case "Delete": // clear all btn
      allClearBtn.click();
      break;
    case "e": // e btn
      eBtn.click();
      break;
    case "p": // pi btn
      piBtn.click();
      break;
    case "l": // ln btn
      lnBtn.click();
      break;
    case "@": //sqrt2 shift + 2
      if (event.shiftKey) {
        sqrt2Btn.click();
      }
      break;
    case "#": //sqrt3 shift + 3
      if (event.shiftKey) {
        sqrt3Btn.click();
      }
      break;
    case "\\": // +- btn
      plusMinusBtn.click();
      break;
  }
});

let num1 = "";
let num2 = "";
let action = "";
let result = "0";
let isFirstNumber = true;
let equalsPressed = false;

const MAX_RESULT_LENGTH = 14;
const MAX_ACTION_LENGTH = 18;
const MAX_NON_EXPONENT_NUM = 1.0e12;
const MIN_NON_EXPONENT_NUM = 1.0e-12;

const E = cutResult(Math.E);
const PI = cutResult(Math.PI);
const SQRT2 = cutResult(Math.SQRT2);
const SQRT3 = cutResult(Math.sqrt(3));

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

function cutResult(result) {
  if (
    String(result).length > MAX_RESULT_LENGTH &&
    (Math.abs(result) > MAX_NON_EXPONENT_NUM ||
      Math.abs(result) < MIN_NON_EXPONENT_NUM)
  ) {
    return Number(result).toExponential(3);
  }
  return String(result).substring(0, MAX_RESULT_LENGTH);
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
      if (Math.abs(num1 / num2) == Infinity) {
        return "Error";
      }
      return String(num1 / num2);
    case "%":
      return String(num1 % num2);
    default:
      return num1;
  }
}

function changeInput(num1, num2, action) {
  inputNum1Block.innerHTML = num1;
  inputActionBlock.innerHTML = action;
  inputNum2Block.innerHTML = num2;
}

/* For numbers */
for (let i = 1; i <= 10; ++i) {
  numbersBtnArray[i - 1].addEventListener("click", () => {
    if (equalsPressed == true) {
      num1 = "";
      equalsPressed = false;
    }
    if (isFirstNumber && num1.length < MAX_ACTION_LENGTH) {
      if (num1 == "0") {
        num1 = "";
      }
      num1 += i % 10;
    } else if (num2.length < MAX_ACTION_LENGTH) {
      if (num2 == "0") {
        num2 = "";
      }
      num2 += i % 10;
    }
    changeInput(num1, num2, action);
    result = cutResult(doAction(num1, num2, action));
    resultBlock.innerHTML = "=" + result;
  });
}

/*For double action*/
allDoubleActionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (result != "Error") {
      if (num1 !== "") {
        if (equalsPressed) {
          equalsPressed = false;
        }
        if (action != "" && btn.innerHTML == "-" && num2 == "") {
          num2 += "-";
        } else {
          action = btn.innerHTML;
          if (isFirstNumber) {
            isFirstNumber = false;
          } else {
            num1 = result;
            num2 = "";
          }
        }
      } else if (action == "" && isFirstNumber && btn.innerHTML == "-") {
        equalsPressed = false;
        num1 += "-";
      }
      changeInput(num1, num2, action);
    }
  });
});

/* point */
pointBtn.addEventListener("click", () => {
  if (isFirstNumber && !num1.includes(".")) {
    equalsPressed = false;
    if (num1.length == 0) {
      num1 += "0";
    }
    num1 += ".";
  } else if (!num2.includes(".")) {
    if (num2.length == 0) {
      num2 += "0";
    }
    num2 += ".";
  }
  result = cutResult(doAction(num1, num2, action));
  resultBlock.innerHTML = "=" + result;
  changeInput(num1, num2, action);
});

/* equals */
equalsBtn.addEventListener("click", () => {
  equalsPressed = true;
  isFirstNumber = true;
  num1 = result;
  num2 = "";
  action = "";
  changeInput("", num2, action);
  if (result == "Error") {
    num1 = "";
  }
});

/* Clear */
allClearBtn.addEventListener("click", () => {
  isFirstNumber = true;
  num1 = "";
  num2 = "";
  action = "";
  result = "0";
  changeInput(num1, num2, action);
  resultBlock.innerHTML = "=0";
});

symbolClearBtn.addEventListener("click", () => {
  if (isFirstNumber) {
    if (num1.length != 0) {
      num1 = num1.substring(0, num1.length - 1);
    }
  } else {
    if (num2.length != 0) {
      num2 = num2.substring(0, num2.length - 1);
    } else {
      action = "";
      isFirstNumber = true;
    }
  }
  changeInput(num1, num2, action);
  result = cutResult(doAction(num1, num2, action));
  resultBlock.innerHTML = "=" + result;
});

/* +/- */
plusMinusBtn.addEventListener("click", () => {
  if (result != "Error") {
    equalsPressed = true;
    isFirstNumber = true;
    result = -result;
    num1 = result;
    num2 = "";
    action = "";
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + result;
  }
});

/* sqrt */
sqrtBtn.addEventListener("click", () => {
  if (result != "Error") {
    equalsPressed = true;
    isFirstNumber = true;
    if (result >= 0) {
      result = cutResult(Math.sqrt(result));
      if (num1 == "") {
        changeInput("√" + 0, num2, action);
      } else {
        changeInput("√" + num1, num2, action);
      }
      num1 = result;
      num2 = "";
      action = "";
      resultBlock.innerHTML = "=" + result;
    } else {
      num1 = "";
      num2 = "";
      action = "";
      result = "Error";
      changeInput(num1, num2, action);
      resultBlock.innerHTML = "=Error";
    }
  }
});

/* factorial */

function getFactorial(n) {
  let result = 1;
  for (let i = 2; i <= n; ++i) {
    result *= i;
  }
  return result;
}

factorialBtn.addEventListener("click", () => {
  if (result != "Error") {
    equalsPressed = true;
    isFirstNumber = true;

    if (result == Math.trunc(result) && result >= 0) {
      num2 = "";
      action = "";
      if (num1 == "") {
        changeInput(0 + "!", num2, action);
      } else if (num1 == result) {
        changeInput(num1 + "!", num2, action);
      } else {
        changeInput(result + "!", num2, action);
      }

      if (result > 170) {
        result = Infinity;
      } else {
        result = getFactorial(result);
      }

      result = cutResult(result);
      num1 = result;
      resultBlock.innerHTML = "=" + result;
    } else {
      num1 = "";
      num2 = "";
      action = "";
      result = "Error";
      changeInput(num1, num2, action);
      resultBlock.innerHTML = "=Error";
    }
  }
});

/* ln */

lnBtn.addEventListener("click", () => {
  if (result != "Error") {
    equalsPressed = true;
    isFirstNumber = true;
    result = cutResult(Math.log2(result));
    if (result == Infinity || result == -Infinity || isNaN(result)) {
      num1 = "";
      num2 = "";
      action = "";
      result = "Error";
      changeInput(num1, num2, action);
      resultBlock.innerHTML = "=Error";
    } else {
      num2 = "";
      action = "";
      changeInput("ln(" + num1 + ")", num2, action);
      num1 = result;
      resultBlock.innerHTML = "=" + result;
    }
  }
});

/* Constant btns */

eBtn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = E;
    result = num1;
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  } else {
    num2 = E;
    result = cutResult(doAction(num1, num2, action));
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  }
});

piBtn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = PI;
    result = num1;
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  } else {
    num2 = PI;
    result = cutResult(doAction(num1, num2, action));
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  }
});

sqrt2Btn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = SQRT2;
    result = num1;
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  } else {
    num2 = SQRT2;
    result = cutResult(doAction(num1, num2, action));
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  }
});

sqrt3Btn.addEventListener("click", () => {
  if (isFirstNumber) {
    num1 = SQRT3;
    result = num1;
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
  } else {
    num2 = SQRT3;
    result = cutResult(doAction(num1, num2, action));
    changeInput(num1, num2, action);
    resultBlock.innerHTML = "=" + cutResult(result);
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
      if (event.shiftKey) {
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

    case "%":
      if (event.shiftKey) {
        allDoubleActionBtn[0].click();
      }
      break;
    case "/":
      allDoubleActionBtn[1].click();
      break;
    case "*":
      allDoubleActionBtn[2].click();
      break;
    case "-":
      allDoubleActionBtn[3].click();
      break;
    case "+":
      allDoubleActionBtn[4].click();
      break;

    case ".":
      pointBtn.click();
      break;
    case "=":
      equalsBtn.click();
      break;
    case "Enter":
      equalsBtn.click();
      break;
    case "!":
      if (event.shiftKey) {
        factorialBtn.click();
      }
      break;
    case "Backspace":
      symbolClearBtn.click();
      break;
    case "Delete":
      allClearBtn.click();
      break;
    case "e":
      eBtn.click();
      break;
    case "p":
      piBtn.click();
      break;
    case "l":
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
    case "\\":
      plusMinusBtn.click();
      break;
  }
});

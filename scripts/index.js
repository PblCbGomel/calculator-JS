let num1 = "";
let num2 = "";
let action = "";
let result = "0";
let isFirstNumber = true;
let equalsPressed = false;

const E = Math.E;
const PI = Math.PI;
const SQRT2 = Math.SQRT2;
const SQRT3 = Math.sqrt(3);

const actionBlock = document.querySelector(".input");
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

function doAction(num1, num2, action) {
  if (num1 === "") {
    return 0;
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
      return String(num1 / num2);
    case "%":
      return String(num1 % num2);
    default:
      return num1;
  }
}

/* For numbers */
for (let i = 1; i <= 10; ++i) {
  numbersBtnArray[i - 1].addEventListener("click", () => {
    if (equalsPressed == true) {
      num1 = "";
      equalsPressed = false;
    }
    if (isFirstNumber) {
      if (num1 == "0") {
        num1 = "";
      }
      num1 += i % 10;
    } else {
      if (num2 == "0") {
        num2 = "";
      }
      num2 += i % 10;
    }
    actionBlock.innerHTML = num1 + action + num2;
    result = doAction(num1, num2, action);
    resultBlock.innerHTML = "=" + result;
  });
}

/*For double action*/
allDoubleActionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (num1 !== "") {
      if (equalsPressed) {
        equalsPressed = false;
      }
      action = btn.innerHTML;
      if (isFirstNumber) {
        actionBlock.innerHTML = num1 + action;
        isFirstNumber = false;
      } else {
        num1 = result;
        num2 = "";
        actionBlock.innerHTML = num1 + action;
      }
    }
  });
});

/* point */
pointBtn.addEventListener("click", () => {
  if (isFirstNumber && !num1.includes(".")) {
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
  actionBlock.innerHTML = num1 + action + num2;
});

/* equals */
equalsBtn.addEventListener("click", () => {
  equalsPressed = true;
  actionBlock.innerHTML = "";
  num1 = result;
  num2 = "";
  action = "";
  isFirstNumber = true;
});

/* Clear */
allClearBtn.addEventListener("click", () => {
  isFirstNumber = true;
  num1 = "";
  num2 = "";
  action = "";
  result = 0;
  actionBlock.innerHTML = "";
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
  actionBlock.innerHTML = num1 + action + num2;
  result = doAction(num1, num2, action);
  resultBlock.innerHTML = "=" + result;
});

/* +/- */
plusMinusBtn.addEventListener("click", () => {
  equalsPressed = true;
  isFirstNumber = true;
  result = -result;
  num1 = result;
  num2 = "";
  action = "";
  actionBlock.innerHTML = "";
  resultBlock.innerHTML = "=" + result;
});

/* sqrt */
sqrtBtn.addEventListener("click", () => {
  equalsPressed = true;
  isFirstNumber = true;
  if (result >= 0) {
    result = Math.sqrt(result);
    num1 = result;
    num2 = "";
    action = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=" + result;
  } else {
    num1 = "";
    num2 = "";
    action = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=Error";
  }
});

/* factorial */

factorialBtn.addEventListener("click", () => {
  equalsPressed = true;
  isFirstNumber = true;
  if (result == Math.trunc(result) && result >= 0) {
    let n = result;
    result = 1;
    for (let i = 1; i <= n; ++i) {
      result *= i;
    }
    num1 = result;
    num2 = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=" + result;
  } else {
    num1 = "";
    num2 = "";
    action = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=Error";
  }
});

/* ln */

lnBtn.addEventListener("click", () => {
  equalsPressed = true;
  isFirstNumber = true;
  result = Math.log2(result);
  if (result == Infinity || result == -Infinity) {
    num1 = "";
    num2 = "";
    action = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=Error";
  } else {
    num1 = result;
    num2 = "";
    action = "";
    actionBlock.innerHTML = "";
    resultBlock.innerHTML = "=" + result;
  }
});
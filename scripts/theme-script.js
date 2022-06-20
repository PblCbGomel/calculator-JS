const ligthBtn = document.querySelector(".ligth-theme");
const darkBtn = document.querySelector(".dark-theme");
const calculatorWrapper = document.querySelector(".calculator-wrapper");
const actionWrapper = document.querySelector(".actions-wrapper");
const inputWrapper = document.querySelector(".input");
const btnsArray = document.querySelectorAll(".btn");

darkBtn.addEventListener("click", () => {
  calculatorWrapper.classList.remove("calculator-wrapper-ligth");
  calculatorWrapper.classList.add("calculator-wrapper-dark");
  actionWrapper.classList.remove("actions-wrapper-ligth");
  actionWrapper.classList.add("actions-wrapper-dark");
  inputWrapper.classList.remove("input-ligth");
  inputWrapper.classList.add("input-dark");

  btnsArray.forEach((btn) => {
    btn.classList.remove("btn-ligth");
    btn.classList.add("btn-dark");
  });
});

ligthBtn.addEventListener("click", () => {
  calculatorWrapper.classList.remove("calculator-wrapper-dark");
  calculatorWrapper.classList.add("calculator-wrapper-ligth");
  actionWrapper.classList.remove("actions-wrapper-dark");
  actionWrapper.classList.add("actions-wrapper-ligth");
  inputWrapper.classList.remove("input-dark");
  inputWrapper.classList.add("input-ligth");

  btnsArray.forEach((btn) => {
    btn.classList.remove("btn-dark");
    btn.classList.add("btn-ligth");
  });
});

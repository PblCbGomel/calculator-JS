const ligthBtn = document.querySelector(".ligth-theme");
const darkBtn = document.querySelector(".dark-theme");
const calculatorWrapper = document.querySelector(".calculator-wrapper");
const actionWrapper = document.querySelector(".actions-wrapper");
const inputWrapper = document.querySelector(".input");
const btnsWrapper = document.querySelector(".buttons-wrapper");

darkBtn.addEventListener("click", () => {
  calculatorWrapper.classList.remove("calculator-wrapper-ligth");
  calculatorWrapper.classList.add("calculator-wrapper-dark");
  actionWrapper.classList.remove("actions-wrapper-ligth");
  actionWrapper.classList.add("actions-wrapper-dark");
  inputWrapper.classList.remove("input-ligth");
  inputWrapper.classList.add("input-dark");
  btnsWrapper.classList.remove("wrapper-ligth");
  btnsWrapper.classList.add("wrapper-dark");
});

ligthBtn.addEventListener("click", () => {
  calculatorWrapper.classList.remove("calculator-wrapper-dark");
  calculatorWrapper.classList.add("calculator-wrapper-ligth");
  actionWrapper.classList.remove("actions-wrapper-dark");
  actionWrapper.classList.add("actions-wrapper-ligth");
  inputWrapper.classList.remove("input-dark");
  inputWrapper.classList.add("input-ligth");
  btnsWrapper.classList.remove("wrapper-dark");
  btnsWrapper.classList.add("wrapper-ligth");
});

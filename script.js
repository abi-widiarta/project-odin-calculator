const displayMain = document.querySelector(".calculator-display__main");
const displayHistory = document.querySelector(".calculator-display__history");
const btnSmall = document.querySelectorAll(".btn-num");
const btnClear = document.querySelector(".btn-clear");
const btnDelete = document.querySelector(".btn-delete");
const btnOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".btn-equal");

let displayNum = "";
let firstNum;
let secondNum;
let operatorInput;
let afterCleared = false;
let isWaitingSecondNum = false;

const add = (num1, num2) => {
  return num1 + num2;
};

const substract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const changeDisplayMain = () => {
  if (displayNum[0] == 0) {
    displayNum = displayNum.slice(1, -1);
    displayMain.textContent = "0";
  } else {
    displayMain.textContent = displayNum;
  }
};

const applyOperator = () => {};

Array.from(btnSmall).forEach((item) => {
  item.addEventListener("click", () => {
    if (afterCleared) {
      if (isWaitingSecondNum) {
        displayNum = item.textContent;
        secondNum = Number(displayNum);
      } else {
        displayNum = item.textContent;
      }
      afterCleared = false;
    } else if (isWaitingSecondNum) {
      displayNum += item.textContent;
      secondNum = Number(displayNum);
    } else {
      displayNum += item.textContent;
      firstNum = Number(displayNum);
    }

    console.log(displayNum);
    changeDisplayMain();
  });
});

btnClear.addEventListener("click", () => {
  displayNum = "0";
  displayHistory.textContent = "0";
  afterCleared = true;
  changeDisplayMain();
});
Array.from(btnOperator).forEach((item) => {
  item.addEventListener("click", () => {
    console.log(firstNum);
    if (firstNum != undefined) {
      isWaitingSecondNum = true;
      afterCleared = true;
      firstNum = Number(displayNum);
      operatorInput = item.textContent;
      displayHistory.textContent = `${displayNum} ${operatorInput} `;
    }
  });
});

const operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      displayNum = add(num1, num2);
      break;
    case "-":
      displayNum = substract(num1, num2);
      break;
    case "x":
      displayNum = multiply(num1, num2);
      break;
    case "/":
      displayNum = divide(num1, num2);
      break;
  }
};

btnEqual.addEventListener("click", () => {
  if (secondNum != undefined) {
    displayHistory.textContent = `${firstNum} ${operatorInput} ${secondNum} =`;
    operate(operatorInput, firstNum, secondNum);
    isWaitingSecondNum = false;
    displayMain.textContent = displayNum;
  }
});

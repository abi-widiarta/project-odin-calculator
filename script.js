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
let isWaitingForEqual = false;
let isStringOperator = false;

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
  if (displayNum[0] == "0") {
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
        console.log("display length : ", displayNum.length);

        displayNum = item.textContent;

        secondNum = Number(displayNum);
      } else {
        displayNum = item.textContent;
        firstNum = Number(displayNum);
      }
      afterCleared = false;
    } else if (isWaitingSecondNum) {
      displayNum += item.textContent;
      secondNum = Number(displayNum);
      isWaitingForEqual = true;
      console.log("tes1");
    } else {
      console.log("tes2");
      displayNum += item.textContent;
      firstNum = Number(displayNum);
    }

    console.log(displayNum);
    changeDisplayMain();
  });
});

btnClear.addEventListener("click", () => {
  displayNum = "0";
  firstNum = 0;
  secondNum = 0;
  isWaitingForEqual = false;
  isStringOperator = false;
  displayHistory.textContent = "0";
  afterCleared = true;
  changeDisplayMain();
});

Array.from(btnOperator).forEach((item) => {
  item.addEventListener("click", () => {
    if (firstNum != undefined) {
      if (displayNum == "" || displayNum == "0") {
        displayNum = 0;
        isWaitingSecondNum = true;
        afterCleared = true;
        firstNum = Number(displayNum);
        operatorInput = item.textContent;
        displayHistory.textContent = `${displayNum} ${operatorInput} `;
      }

      if (displayNum.length == 1) {
        operate(operatorInput, firstNum, secondNum);
      }

      if (isWaitingForEqual) {
        if (!isStringOperator) {
          operate(operatorInput, firstNum, secondNum);
        }
        operatorInput = item.textContent;
        // isStringOperator = true;
        afterCleared = true;
        console.log("masuk", displayNum);
        firstNum = Number(displayNum);
        displayHistory.textContent = `${displayNum} ${operatorInput} `;
        // changeDisplayMain();
      } else {
        operatorInput = item.textContent;
        isWaitingSecondNum = true;
        afterCleared = true;
        firstNum = Number(displayNum);
        displayHistory.textContent = `${displayNum} ${operatorInput} `;
      }

      changeDisplayMain();
    }
  });
});

const operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      displayNum = String(add(num1, num2));
      break;
    case "-":
      displayNum = String(substract(num1, num2));
      break;
    case "x":
      displayNum = String(multiply(num1, num2));
      break;
    case "/":
      if (secondNum == 0) {
        alert("Well as all of us has been taught, It's undefined");
        displayNum = 0;
        isWaitingSecondNum = true;
      } else {
        displayNum = String(divide(num1, num2));
      }
      break;
  }
};

btnEqual.addEventListener("click", () => {
  if (secondNum != undefined) {
    isWaitingSecondNum = false;
    isStringOperator = false;
    operate(operatorInput, firstNum, secondNum);

    if (operatorInput == "/" && secondNum == 0) {
      console.log("tes");
    } else {
      displayHistory.textContent = `${firstNum} ${operatorInput} ${secondNum} =`;
    }
    changeDisplayMain();
  }
});

btnDelete.addEventListener("click", () => {
  if (displayNum.length == 0 || displayNum.length == 1) {
    displayNum = "0";
  } else {
    displayNum = displayNum.slice(0, -1);
  }
  changeDisplayMain();
});

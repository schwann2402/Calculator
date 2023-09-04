
let currentNum ="";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector('.currentNumber')
const previousDisplayNumber = document.querySelector('.previousNumber')

window.addEventListener('keydown', handleKeyPress)


const equal = document.querySelector('.equal')
equal.addEventListener('click', ()=> {
    if (currentNum != "" && previousNum != "") {
        calculate()
    }
})

const percentage = document.querySelector('.percentage');
percentage.addEventListener('click', percentageFn)
   

function percentageFn() {
    currentNum /= 100;
   previousDisplayNumber.textContent ="";
   currentDisplayNumber.textContent = currentNum;
}

const calcDisplay = document.querySelector('.display')
const decimal = document.querySelector('.decimal')
decimal.addEventListener('click', decimalFn)
const numberButtons = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearCalc = document.querySelector('.clear')
clearCalc.addEventListener('click', clear)

const sign = document.querySelector('.sign')
sign.addEventListener('click', changeSign);


function changeSign() {
        currentNum = Math.abs(currentNum) * -1;
        currentDisplayNumber.textContent = currentNum;
    }


function decimalFn() {
    currentNum += '.';
    currentDisplayNumber.textContent = currentNum;
}

numberButtons.forEach((btn) => {btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
    })
})

function handleNumber(number) {
    if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
    }
}

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    })})

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        checkOp(op);
    } else if (currentNum === "") {
        checkOp();
    } else {
        calculate()
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
   
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentNum = "";
    currentDisplayNumber.textContent = "";
}
 
function checkOp(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum =""
}
function calculate() {

    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum = previousNum + currentNum;
        previousDisplayNumber.textContent="";
        currentDisplayNumber.textContent = previousNum
    }
    else if (operator === "-") {
        previousNum = previousNum-currentNum;
        previousDisplayNumber.textContent="";
        currentDisplayNumber.textContent = previousNum
    }
    else if (operator === "x") {
        previousNum = previousNum*currentNum;
        previousDisplayNumber.textContent="";
        currentDisplayNumber.textContent = previousNum;

    }  else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "ERROR";
            displayResults();
            return;
        }
    previousNum = previousNum/currentNum;
    previousDisplayNumber.textContent="";
    currentDisplayNumber.textContent = previousNum;
    } 
    
    previousNum = roundNum(previousNum)
    previousNum = previousNum.toString();
    displayResults();
}

function roundNum(num) {
    return Math.round(num * 100000)/100000;
}

function clear() {
    currentNum = "";
    previousNum = "";
    operator ="";
    previousDisplayNumber.textContent="";
    currentDisplayNumber.textContent="";
}

function displayResults () {
    previousDisplayNumber.textContent="";
    operator="";
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0,11) + "...";
    }
}


function handleKeyPress(e) { 
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9){
        handleNumber(e.key)
    } else if (e.key === "Enter" || 
   (e.key === "=" && currentNum != "" && previousNum != "")) {
    calculate()
   } else if (e.key === "/" || e.key==="+" || e.key === "/" ) {
    handleOperator(e.key)
   } else if (e.key === "*") {
    handleOperator("x");
   } else if (e.key === "Backspace") {
    clear()
   } else if (e.key ===".") {
    decimalFn()
   }
}

//Global variables
let num1 = '';
let num2 = '';
let operator = '';
let sum = '';
let resetScreen = false;
let equal = '';

//Calculator buttons
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calc-buttons");

//Number buttons
const btnNumber = document.querySelectorAll('[data-number]');

//Operator buttons
const btnOperator = document.querySelectorAll('[data-action]');

//Lower number display of the screen
const lowerDisplay = document.querySelector('.current-value'); 

//Upper number display of the screen
const upperDisplay = document.querySelector('.previous-value'); 

//Decimal
const decimalButton = document.querySelector('.decimal');

//AC button
const acButton = document.querySelector('.ac');

//Equal button
const equalButton = document.querySelector('.equal');

//Delete button
const deleteButton = document.querySelector('.delete');

//Listens to keyboard input
window.addEventListener('keydown', keyboardInput);

//Event listener for buttons
//Listens to ac button
acButton.addEventListener('click', ac);

//Listens to number button click
btnNumber.forEach((numberButton) =>
    numberButton.addEventListener('click', () => insertNumber(numberButton.textContent))
);

//Listens to operator button click
btnOperator.forEach((operatorButton) =>
    operatorButton.addEventListener('click', () => insertOperator(operatorButton.textContent))
);

//Listens to decimal button click
decimalButton.addEventListener('click', insertDecimal);


//Listens to equal button
equalButton.addEventListener('click', insertEqual);


//Listens to delete button
deleteButton.addEventListener('click', deleteNumber);


//FUNCTIONS

//Function to reset screen of the inputted value.
function ac() {
    lowerDisplay.textContent = '0';
    upperDisplay.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
}

//Function to display number on screen. "resetScreen" is to reset between number input 1  and number input two
function insertNumber(number) {

      
      if (lowerDisplay.textContent === '0' || resetScreen) {
          lowerDisplay.textContent = number;
          resetScreen = false;      
          upperDisplay.textContent += number;   
          
      } 
       else {
          lowerDisplay.textContent += number;
          upperDisplay.textContent += number;
         
      }
};


function deleteNumber() {
  lowerDisplay.textContent = lowerDisplay.textContent
    .toString()
    .slice(0, -1);

    upperDisplay.textContent = upperDisplay.textContent
    .toString()
    .slice(0, -1);

    if (lowerDisplay.textContent === '') 
        lowerDisplay.textContent = '0';
}



//Function to add decimal, should only add decimal if not added before
function insertDecimal() {
  if (!lowerDisplay.textContent.includes('.')) {
      lowerDisplay.textContent = lowerDisplay.textContent + '.';
      upperDisplay.textContent = upperDisplay.textContent + '.';
  } 
}

//Function to round the numbers otherwise 2.2-1 will be 1.20000000000000
function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

//Function for equal button, will add equal sign to upper screen before doing the calculation
function insertEqual () {

    //This is to prevent double input of equal sign
    if (!upperDisplay.textContent.includes('=')) {
        upperDisplay.textContent += '=';
        num1 = sumTotal();  
       
    }        

    //This is to enable continued calculations after equal sign have been pressed.
    if (upperDisplay.textContent.includes('='))
        upperDisplay.textContent = '';

    operator = '';
}

function sumTotal() {
   num2 = lowerDisplay.textContent;

  switch (operator) {
     
   
      case '+':
          sum = +num1 + +num2;    //+num1, +num2 the plus sign here is to convert string to number
          lowerDisplay.textContent = roundResult(sum);
          return sum;
      break;
      
      case '-':
          sum = +num1 - +num2;
          lowerDisplay.textContent = roundResult(sum);
          return sum;
      break;
     
      case '÷':
          sum = +num1 / +num2;
          if (num2 === '0') {
            alert("You can't divide by zero!");
            return;
          }
             
          lowerDisplay.textContent = roundResult(sum);
          return sum;
      break;
     
      case 'x':
          sum = +num1 * +num2;
          lowerDisplay.textContent = roundResult(sum);
          return sum;
      break;

      
  }
}


function keyboardInput(keyboard) {
    if (keyboard.key >= 0 && keyboard.key <= 9) 
        insertNumber(keyboard.key);

    if (keyboard.key === '.') 
        insertDecimal();

    if (keyboard.key === '=' || keyboard.key === 'Enter') 
        insertEqual();

    if (keyboard.key === '+' || keyboard.key === '-' || keyboard.key === '*' || keyboard.key === '/') {
        insertOperator(convertOperator(keyboard.key));
    }

    if (keyboard.key === 'Backspace')
        deleteNumber();
        
  }

  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }

//Function for operator input
function insertOperator(oper) {

      if (operator === '') {
          num1 = lowerDisplay.textContent;
          resetScreen = true;
          operator = oper;               
          
        //Here equal function will be called if user press another operation button. For example 12 + 7 - 5 * 3 = (should be 42) 
      } else  {
            if (oper === operator) //prevent same operator input twice
                return;

            
            num1 = sumTotal();
            resetScreen = true;
            operator = oper;
           
            
      }

      //Prevent multiple input of the operators
      if (!upperDisplay.textContent.includes(operator)) {
          upperDisplay.textContent = upperDisplay.textContent + operator;
      } 
      
      
     
};

    
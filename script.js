'use strict'

/* ----------------- Calculator ----------------- */
const keys = document.querySelectorAll('.key')
/* Calculator screen */
const preOperationEl = document.querySelector('.previous-operation');
const currentOperationEl = document.querySelector('.current-operation');
let operation;
let preOperation ;
let currentOperation;
let lastKeyIndex;
let lastKey;
let operationResult;

/* Keys click event */
let clickedKeyName;
keys.forEach(key => {
  key.addEventListener('click', () => {
    // console.log(currentOperationEl.textContent);
    clickedKeyName = key.dataset.keyname;
    lastKeyIndex = currentOperationEl.textContent.length - 1;
    lastKey = currentOperationEl.textContent[lastKeyIndex];
    populateScreen(clickedKeyName);
  })
})

// Populate the screen with keys that are clicked
function populateScreen(clickedKey) {

  if (clickedKey == '*' || clickedKey == '+' || clickedKey == '-' || 
      clickedKey == '/' || clickedKey == '=' || clickedKey == '%') 
  {

    // Not allowing to have more than one operation in a row
    
    if (lastKey != ' ') 
    {
      // Adding to pre operation
      preOperationEl.textContent += `${currentOperationEl.textContent} ${clickedKey}`; 
      currentOperationEl.textContent = " ";
    }
    if (clickedKey == '=') 
    {
      operation = preOperationEl.textContent

      operationResult = operate(operation)

      preOperationEl.textContent = ""
      currentOperationEl.textContent = operationResult;
    }
  }

  else if (clickedKey == 'del') 
  {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
  } 
  else if (clickedKey == 'reset') 
  {
    reset();
  }
  else {
    currentOperationEl.textContent += clickedKey;
  }
}


// calculation - input as string

function operate(operation) 
{
  // turning operation into an array
  operation = operation.split(' ')
  console.log(operation);

  let operationResult;
  // operation of '*' or '/' 
  while (operation.includes('/') || operation.includes('*') || operation.includes('%')) 
  {
    for (let i = 0; i < operation.length; i++) 
    {
      if (operation[i] == '*') 
      {
        operation[i] = operation[i - 1] * operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      else if (operation[i] == '/') 
      {
        operation[i] = operation[i - 1] / operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      else if (operation[i] == '%')   
      {
        operation[i] = operation[i - 1] % operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }

  // operation of - or + 
  while (operation.includes('+') || operation.includes('-')) 
  {
    for (let i = 0; i < operation.length; i++) 
    {
      if (operation[i] == '+') 
      {
        operation[i] = Number(operation[i + 1]) + Number(operation[i - 1]);
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] == '-') 
      {
        operation[i] = operation[i - 1] - operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }

  // Rounding up multiple decimal points to two decimal points 

  if (operation[0] % 1 != 0) 
  {
    operationResult = Math.round(operation[0] * 100) / 100;
  } 
  else 
  {
    operationResult = operation[0];
  }
  return operationResult;
}

// This function will reset everything 

function reset() 
{
  preOperationEl.textContent = ""
  currentOperationEl.textContent = "";
}

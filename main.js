function calculate(inputValue){
    const expression = /\+|\-|\*|\//;
    const numbers = inputValue.split(expression);

    const numberA = parseInt(numbers[0]);
    const numberB = parseInt(numbers[1]);

    const calculator = new Calculator();
    let result = calculator.add(numberA);
    const operation = inputValue.match(expression);

    if(Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null){
        updateResult('Operation not recognized');
        return;
    }
    switch (operation[0]) {
        case '+':
            result =  calculator.add(numberB);
            break;
        case '-':
            result =  calculator.substract(numberB);
            break;
        case '*':
            result =  calculator.multiply(numberB);
            break;
        case '/':
            result =  calculator.divide(numberB);
            break;
     }

     updateResult(result);
     //debugger;
     //throw new Error(`Unsupported operation:'${operation}' with input value:'${inputValue}'`);
    
}

function updateResult(result){
    const resultSpanEl = document.getElementById('result');
    resultSpanEl.innerHTML = result;
}

function showVersion() {
    const calculator = new Calculator();
    const verEl = document.getElementById('version');
    //verEl.innerText = calculator.version;
    //return Calculator.version;
    //Async version
    calculator.version.then(function(version){
            
            verEl.innerText = version;
        })
        .catch(function(error){
            verEl.innerText = error;
        });
  }
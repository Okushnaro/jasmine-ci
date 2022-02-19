function Calculator(){
    this.total = 0;
}

Calculator.prototype.add = function (number){
    return this.total += number;
}

Calculator.prototype.substract = function (number){
    return this.total -= number;
}


Calculator.prototype.multiply = function (number){
   //debugger;
    return this.total *= number;
}

Calculator.prototype.divide = function (number){
    if(number === 0){
        throw new Error(`Can't devide by zero!`);

    }
    return this.total /= number;
}


Object.defineProperty(Calculator.prototype, 'version', {
    get: function(){
        //debugger;
        //return '0.1';
        return fetch('http://127.0.0.1:5500/simple-calc/mydata.json')
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            return data.version;
          })
    },
    enumerable: true,
    configurable: true
})
describe('main.js', function(){
    describe('calculate()', function(){
        beforeAll(function(){
            // Execute just ONCE before all specs are executed
            const resultEl = document.createElement('div');
            resultEl.setAttribute('id', 'result');
            document.body.appendChild(resultEl);
            this.resultEl = resultEl;
        });
        afterAll(function(){
            //const element = document.getElementById('result');
            document.body.removeChild(this.resultEl);
        });
        it('valides expression when the first number is invalid', function(){
            // DON'T DO anything within updateResult() - suppress
            spyOn(window, 'updateResult').and.stub();
            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });
        it('valides expression when the second number is invalid', function(){
            // DON'T DO anything within updateResult() - suppress
            spyOn(window, 'updateResult');//.and.stub(); - is default, can be ommited!
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
        });
        it('valides expression when operation is invalid', function(){
            // DON'T DO anything within updateResult() - suppress
            spyOn(window, 'updateResult');//.and.stub(); - is default, can be ommited!
            calculate('a_3');
            expect(window.updateResult).toHaveBeenCalled();
        });
        it('calls add', function(){
            const spy = spyOn(Calculator.prototype, 'add');

            calculate('3+4');

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(4);
        });
        it('calls subtract', function(){
            const spy = spyOn(Calculator.prototype, 'substract');
            const spy2 = spyOn(Calculator.prototype, 'add');

            calculate('4-3');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy2).toHaveBeenCalledWith(4);
        });
        it('calls multiply', function(){
            const spy = spyOn(Calculator.prototype, 'multiply');

            calculate('3*4');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(4);
        });
        it('calls devide', function(){
            const spy = spyOn(Calculator.prototype, 'divide');

            calculate('12/3');

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(3);
        });
        it('calls updateResult (example using and.callThrough)', function(){
            spyOn(window, 'updateResult');
            //!!! Use callThrough if u want to test native real call(like String.split or similar) !!!
            spyOn(Calculator.prototype, 'multiply').and.callThrough();

            calculate('6*6');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(36);

        });
        it('calls updateResult (example using and.callFake)', function(){
            spyOn(window, 'updateResult');
            //!!! Use callThrough if u want to test native real call(like String.split or similar) !!!
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number){
                return 'it works';
            });

            calculate('6*6');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('it works');
            

        });
        it('calls updateResult (example using and.returnValue)', function(){
            spyOn(window, 'updateResult');
            // NOTE!!! Use it instead of callFake
            spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');

            calculate('6*6');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('it works');
            

        });
        it('calls updateResult (example using and.returnValues)', function(){
            spyOn(window, 'updateResult');
            //
            // NOTE!!! If you need multiple add methods to fake returns within
            // testing context we put comma separated values to control that.
            //
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'it works');

            calculate('6+6');

            expect(window.updateResult).toHaveBeenCalled();
            //This is second call will return
            expect(window.updateResult).toHaveBeenCalledWith('it works');
            

        });
        it('does not handle errors', function(){
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

            
            //
            // NOTE!!! As we are handling exception we need to wrap
            // throwing logic into a anonyous function so jasmin will 
            // expect it properly!
            //
            expect(function(){
                calculate('5*5');
            }).toThrowError('some error');
        });
    });

    describe('updateResult()', function(){
        //let resultEl;
        beforeAll(function(){
            // Execute just ONCE before all specs are executed
            const resultEl = document.createElement('div');
            resultEl.setAttribute('id', 'result');
            document.body.appendChild(resultEl);
            this.resultEl = resultEl;
        });
        afterAll(function(){
            //const element = document.getElementById('result');
            document.body.removeChild(this.resultEl);
        });
        it('adds result to DOM element', function(){
            
            updateResult(5);
            expect(this.resultEl.innerText).toBe('5');
        });

    });
    describe('showVersion()', function(){
        it('call calculator.version', function(){
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null,
            });
            
            //
            // NOTE!!! Save spyOnProperty as const to to use such in expectation to do not 
            // get the same spy using Object methods like Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get
            //
            //spyOnProperty(Calculator.prototype, 'version', 'get');
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
                Promise.resolve('{ "version": "0.1" }')
            );

            showVersion();
            //expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();
            expect(spy).toHaveBeenCalled;
        });

    });

    
});
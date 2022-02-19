describe('calculator.js', function(){
    let calculator;
    let calculator2;
    describe('Calculator', function(){
        beforeEach(function(){
            calculator = new Calculator();
            calculator2 = new Calculator();
        });
        afterEach(function(){
            //TODO
        });

        it('should initialize the total', function(){
            expect(calculator.total).toBe(0);
            expect(calculator.total).toBeFalsy();
        });
    
        it('has constructor', function(){
            expect(calculator).toEqual(calculator2);
        });
    
        it('can be instatiated', function(){
            //Registering our custom Matcher
            jasmine.addMatchers(customMatchers);
    
            expect(calculator).toBeCalculator(); //custom!
            expect(calculator).toBeTruthy();
            expect(calculator2).toBeTruthy();
            expect(calculator.constructor.name).toContain('Calc');
    
        });
    
        it('instatiates unique object', function(){
            expect(calculator).not.toBe(calculator2);
        });
    
        it('has common operations', function(){
            expect(calculator.add).toBeDefined();
            expect(calculator.substract).not.toBeUndefined();
            expect(calculator.multiply).not.toBeUndefined();
            expect(calculator.divide).not.toBeUndefined();
        });
    
        it('can overwrite total', function(){
            calculator.total = null;
            expect(calculator.total).toBeNull();
        });
    

        describe('add()', function(){
            it('should add numbers to total', function(){
                //expect 5 + 5 to be 10
                
                calculator.add(5);
                expect(calculator.total).toBe(5);
            });
            it('returns total', function(){
                calculator.total = 50;
        
                expect(calculator.add(20)).toBe(70);
                expect(calculator.total).toMatch(/-?\d+/);
                //Jasmine custom matchers
                expect(calculator.total).toBeNumber();
                
                expect(typeof calculator.total).toMatch('number');
                // asymmetric matchers!
                // not equal in each side!
                expect(calculator.total).toEqual(jasmine.anything());
                expect(function(){}).toEqual(jasmine.anything());
            });
        });

        describe('subtract()', function(){
            it('should subtract numbers from total', function(){
                //expect 10 - 5 to be 5
                calculator.total = 10;
                calculator.substract(5);
                expect(calculator.total).toBe(5);
            });
        });

        describe('multiply()', function(){
            it('should multiply total by number', function(){
                calculator.total = 10;
                calculator.multiply(5);
                expect(calculator.total).toBe(50);
            });

            it('does not handle NaN', function(){
                calculator.total = 20;
                calculator.multiply('a');
        
                expect(calculator.total).toBeNaN();
            });
        });

        describe('devide()', function(){
            it('should devide total by number', function(){
                calculator.total = 100;
                calculator.divide(5);
                expect(calculator.total).toBe(20);
            });
            it('handles devide by zero', function(){
                calculator.total = 20;
                
                expect(function(){
                    calculator.divide(0);
                }).toThrow();
        
                expect(function(){
                    calculator.divide(0);
                }).toThrowError(Error);
        
                expect(function(){
                    calculator.divide(0);
                }).toThrowError(Error, `Can't devide by zero!`);
            });
        });
        describe('get version', function(){
            it('fetches version from external source', async function () {
                
                //
                // NOTE!!! spyOn with fetch will avoid of real file fetching
                // so it will be isolated by returnValue.
                // Also, always use done(); method even if you mocked with returnValue
                // Async expect === done() method!!!!!
                //
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response('{"version":"0.1"}')
                ));

                const version = await calculator.version
                expect(version).toBe('0.1'); 
                
                
            });
        });

 
    });
    
});
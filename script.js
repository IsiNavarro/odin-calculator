const sampleString = "-12+23+34*4.5^56/5";

//Need to make sure you can't type operands where they don't belong.
//String has to come in perfect format. Input has to be clean.

//format output so it doesn't have a ton of decimals

function getOperandsAndNumbers(str){
    let numString = "";
    let operands = [];
    let numbers = [];


    for(let i = 0; i < str.length; i++){

        //checks if first number is negative
        if (i == 0){
            if (str[i] == "-"){
                numString ="-";
                i ++;
            }
        }

        /*checks if it's not a number
            if it's a "." in fact it's just a decimal so it should be added to the string
            everything else is an operand*/    
        if (isNaN(parseInt(str[i]))){
            
            if(str[i] == "."){                  //decimal
                numString = numString+str[i];
            }

            else{                               //operands (means up until then it was all a number)
                if (str[i] == "^") {
                    operands.push("**");
                } else{
                    operands.push(str[i]);
                }
                numbers.push(parseFloat(numString));
                numString = "";
            } //then add every other number
        } else {
            numString = numString+str[i]
        };
    } numbers.push(parseFloat(numString));

    return [operands, numbers];
}

function operate(str){
    let [operands, numbers] = getOperandsAndNumbers(str);
    console.log(operands, numbers)

    let a;
    let b;
    let index;

    /*Hierarchy:-Power
                -Multiplication & Division
                -Sum*/

    while (operands.findIndex(operand => operand == "**") != -1){
        index = operands.findIndex(operand => operand == "**");
        a = numbers.splice(index, 1);
        b = numbers[index];
        numbers.splice(index, 1, power(a, b)); //deletes both numbers and inserts result at index

        operands.splice(index, 1);
    }
    for(let index = 0; index<operands.length; index++){
        if (operands[index] == "*"){
            a = numbers.splice(index, 1);
            b = numbers[index];
            numbers.splice(index, 1, multiply(a, b));

            operands.splice(index, 1);
            index -= 1;
        } else if (operands[index] == "/"){
            a = numbers.splice(index, 1);
            b = numbers[index];
            numbers.splice(index, 1, divide(a, b));

            operands.splice(index, 1);
            index -= 1;
        }
    }
    for(let index = 0; index<operands.length; index++){
        if (operands[index] == "+"){
            a = numbers.splice(index, 1);
            console.log(typeof a);
            b = numbers[index];
            numbers.splice(index, 1, sum(a, b));

            operands.splice(index, 1);
            index -= 1;
        } else if (operands[index] == "-"){
            a = numbers.splice(index, 1);
            b = numbers[index];
            numbers.splice(index, 1, rest(a, b));

            operands.splice(index, 1);
            index -= 1; // deleted one element so length is now shorter. Need to readjust index.
        }
    }
    

    return [numbers, operands];
}

function power(a, b){
    return a**b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if (b === "0"){
        return alert("Can't divide by 0");
    }else{
        return a/b;
    }
}

function sum(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return a+b;
}
function rest(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return a-b;
}



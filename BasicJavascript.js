console.log("Hello World");

//Return type is not required for storing value in variable --> but we need to tell it is a variable for that we can give var,let,const

let a=4;
console.log(typeof(a));
let b=10;
console.log(b);
/*let c="Aishwarya S";
console.log(typeof(c));*/
//We cannot redeclare variable with let keyword but possible with var
/* if we redeclare with let it will throw error
let c=a+b;
console.log(c);
*/
//Var allows redeclaring and reassigning
var c= "Aishwarya S";
console.log(typeof(c));
var c=a+b;
console.log(c);

//let does not allow redeclaring but it allows reassigning only declared


//conditional (if,else, else if)
const flag=false;
if(flag == true){
    console.log("condition satisfied");
}else{
    console.log("Not satisfied");
}
//Now to check with Negation operation
if(!flag){
    console.log("Negation satisfied");
}else{
    console.log("Condition Satisfied");
}

//Loop Condition

//While Loop -->In JavaScript, a while loop executes a block of code as long as a specified condition evaluates to true. It is an entry-controlled loop, meaning the condition is evaluated before the code block runs. If the condition is false initially, the loop will never run. 

let i=0;
while(i<10){
    i++;
    console.log(i);
}

//Do While Loop -->In JavaScript, the do...while loop is an exit-controlled loop that executes a block of code at least once, regardless of whether the condition is true or false. After the first iteration, it evaluates the condition and repeats as long as that condition remains true.

do{
    i++;
    console.log("DO While loop : ",i);
}while(i<10);

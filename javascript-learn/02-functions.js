//function declaration

function sum(x, y) {
    return x + y;
}

console.log(sum(12, 13));
//function expression (more general)

const sum2 = function (x, y) {
    return x + y;
}

console.log(sum2(1, 2));

//IIFE - immediately invoked function expression
//1. it does not have a name - it's an anonymous function
//2. we enclose it inside parenthesis and invoke it immediately after declaring it
(function() {console.log("Hello from IIFE")})();
//or
(function() {console.log("Hello from IIFE2")}());
// we use iife to avoid global variables


//functional programming is not class based. It's where functions have a lot of power. You can return object or functions from a function. Functions are first class citizens similar to what objects are in java or any procedural language.
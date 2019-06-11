var product = (x, y) => x * y;

console.log(product.call(null, 2, 3));
console.log(product.apply(null, [4, 5]));
var multiply = product.bind(null, 6, 7);
console.log(multiply ());






// var details = {
//     number: 42,
//     operation: function () {
//         return () => console.log(this.number);
//     }
// };
// var details2 = {
//     number: 84
// };

// details.operation().bind(details2)();


// function Employee(firstName, department, salary) {
//     this.firstName = firstName;
//     this.department = department;
//     this.salary = salary;
//     this.getInfo = function () {
//         // outer function context = Employee object
//         // return function () {
//         //     // inner function context = Global object
//         //     console.log(this.firstName + " from " +
//         //         this.department + " earns " + this.salary);
//         // };

//         return () => {
//             // inner function context = surrounding context = Employee object
//             console.log(this.firstName + " from " +
//             this.department + " earns " + this.salary);
//             };
//     }
// }

// let jim = new Employee('Jim', 'Finance', 5200);

// let printInfo = jim.getInfo();

// printInfo();

// let btn = document.getElementById('button'); 

// // btn.onclick = function() {
// //     console.log(this);
// // };

// btn.onclick = (event) => {
//     console.log(this);
// };
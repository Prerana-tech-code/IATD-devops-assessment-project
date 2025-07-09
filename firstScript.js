import readlineSync from "readline-sync";
console.log("Hello");
let myname = readlineSync.question("What is your name?");
let num1 = 2;
let num2 = 3;
let Total = num1 + num2;
console.log(myname);
console.log(Total);
console.log("Hello," + myname + "!");
console.log("Total is:" + Total);
let userReply = readlineSync.question("How do you feel today?");
console.log("You said:" + userReply);
if (userReply.length > 10) {
  console.log("Wow, such a long response!");
} else {
  console.log("Nice and concise!");
}
let meals = ["Bread", "Egg", "juice"];
console.log(meals[0]);
console.log(meals[1]);
console.log(meals[2]);
meals.push("Dinner");
console.log(meals[3]);
let answers = [];
for (let i = 0; i < 3; i++) {
  let answer = readlineSync.question("Enter something:");
  answers[i] = answer;
}
console.log("You entered," + answers);
let answers1 = [];
let i = 0;

while (i < 3) {
  let answer = readlineSync.question("Enter something: ");
  answers1[i] = answer;
  i++;
}

console.log("You entered:", answers1);

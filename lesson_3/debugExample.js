// debug.js

let counter = 1;

const mult3 = (n) => {
  const num = n * 3;
  return num;
}

while (counter <= 5) {
  console.log(counter);
  debugger;
  mult3(counter);
  counter += 1;
}

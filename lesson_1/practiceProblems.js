{
  /** 1
   * What is the return value of the filter method call below? Why?
   * [1, 2, 3].filter(num => 'hi');
   * 
   * A: num is not being compared to 'hi', and 'hi' is truthy, so a copy of the entire array [1, 2, 3] is returned
   */
}
{
  /** 2
   * What is the return value of map in the following code? Why?
   * 
   * [undefined, undefined, undefined] because the result of num * num is not returned
   */
  // [1, 2, 3].map(num => {
  //   num * num;
  // });
}
{
  /** 3
   * The following code differs slightly from the above code. What is the return value of map in this case? Why?
   * 
   * [1, 4, 9] because of implicit return
   */
  // [1, 2, 3].map(num => num * num);
}
{
  /** 4
   * What is the return value? Why?
   * 
   * 11
   * Pop removes and returns the last element of the array; String.length is then used to return 11
   */
  // ['ant', 'bear', 'caterpillar'].pop().length;
}
{
  /** 5
   * What is the callback's return value in the following code? Also, what is the return value of every in this code?
   * 
   * It returns false, because not every element in the array is equal to itself times two.
   * Wrong! It reassigns num instead of comparing for equality; since reassignment returns the new value, and none of the new values are falsy, it returns true.
   */
  // [1, 2, 3].every(num => {
  //   return num = num * 2;
  // });
}
{
  /** 6
   * How does Array.prototype.fill work? Is it destructive? How can we find out?
   * 
   * It replaces the values at indices 1 until 5 with '1', resulting in [1, 1, 1, 1, 1]
   */
  // let arr = [1, 2, 3, 4, 5]
  // arr.fill(1, 1, 5);
}
{
  /** 7
   * What is the return value of map in the following code? Why?
   * 
   * It filters the array for strings longer than 3 characters, returning [undefined, 'bear']
   */

  // ['ant', 'bear'].map(elem => {
  //   if (elem.length > 3) {
  //     return elem;
  //   }
  // });
}
{
  /** 8
   * Write a program that uses this array to create an object where the names are the keys and the values are the positions in the array:
   */

  // let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
  // const expectedOutput = { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 };

  // const observedOutput = flintstones.reduce((output, element, index) => Object.assign(output, {[element]: index}), {});
  // console.log(observedOutput);
}
{
  /** 9
   * Add all the ages from the Munster family object
   */
  // let ages = {
  //   Herman: 32,
  //   Lily: 30,
  //   Grandpa: 5843,
  //   Eddie: 10,
  //   Marilyn: 22,
  //   Spot: 237
  // };
  // console.log(Object.values(ages).reduce((acc, current) => acc + current, 0));
}
{
  /** 10
   * Pick out the minimum age:
   *
   * Alternative solution: Math.min(...Object.values(ages))
   */
  // console.log(Object.values(ages).reduce((max, age) => age > max ? age : max, 0));
}
{
  /** 11
   * Problem:
   * Create an object that expresses the frequency with which each letter occurs in this string:
   * 
   * inputs: string
   * output: object of number of occurrences of each letter
   * 
   * clarifying questions:
   * - does case matter? Seems so from the example
   * 
   * Data structure: object
   * Algorithm:
   * - split the string into characters
   * - remove all non-letter characters from the array
   * - create an output object
   * - iterate over the array, checking if the output object has the current character as a property
   *   - if it does, increment the value
   *   - if it doesn't add the property with a value of 1
   * - return the output object
   */
  let statement = "The Flintstones Rock";
  // const expectedOutput = { T: 1, h: 1, e: 2, F: 1, l: 1, ... };

  function countLetters(str) {
    const chars = str.split('');
    const lettersOnly = chars.filter(char => /^[a-z]$/i.test(char));
    return lettersOnly.reduce((output, char) => {
      output[char] = Object.hasOwn(output, char) ? output[char] + 1 : 1;
      return output;
    }, {});
  }

  console.log(countLetters(statement));
}
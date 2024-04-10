{
  /** 1
   * Order the following array of number strings by descending numeric value
   */
  let arr = ['10', '11', '9', '7', '8'];
  const descendingValue = arr.map(Number).sort((a, b) => b - a).map(String);
  const descendingValueAlt = arr.sort((a, b) => Number(b) - Number(a));
}
{
  /** 2
   * How would you order the following array of objects based on the year of publication of each book, ascending?
   */
  let books = [
    { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
    { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
    { title: 'Ulysses', author: 'James Joyce', published: '1922' },
    { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
  ];

  const ascending = books.sort((a, b) => Number(a.published) - Number(b.published));
}
{
  /** 3
   * For each of these collections, access the letter 'g'
   */
  let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
  const arr1g = arr1[2][1][3];
  let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
  const arr2g = arr2[1].third[0];
  let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
  const arr3g = arr3[2].third[0][0];
  let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
  const obj1g = obj1.b[1];
  let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
  const obj2g = Object.keys(obj2.third)[0];
}
{
  /** 4
   * For each collection, demonstrate how you would change the value of 3 to 4
   */
  let arr1 = [1, [2, 3], 4];
  arr1[1][1] = 4;
  let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
  arr2[2] = 4;
  let obj1 = { first: [1, 2, [3]] };
  obj1.first[2][0] = 4;
  let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
  obj2.a.a[2] = 4;
}
{
  /** 5
   * Consider the following nested object. Compute and display the total age of the male members of the family
   */
  let munsters = {
    Herman: { age: 32, gender: 'male' },
    Lily: { age: 30, gender: 'female' },
    Grandpa: { age: 402, gender: 'male' },
    Eddie: { age: 10, gender: 'male' },
    Marilyn: { age: 23, gender: 'female'}
  };

  // const maleAgeSum = Object.entries(munsters)
  //   .reduce((sum, current) => current[1].gender === 'male' ? sum + current[1].age : sum, 0);
  // console.log({maleAgeSum});
}
{
  /** 6
   * Print the name, age, and gender of each family member in the form
   * (Name) is a (age)-year-old (male or female).
   */
  let munsters = {
    herman: { age: 32, gender: 'male' },
    lily: { age: 30, gender: 'female' },
    grandpa: { age: 402, gender: 'male' },
    eddie: { age: 10, gender: 'male' },
    marilyn: { age: 23, gender: 'female'}
  };

  // Object.entries(munsters).forEach(munster => console.log(`${munster[0]} is a ${munster[1].age}-year-old ${munster[1].gender}`));
}
{
  /** 7
   * What will the final values of `a` and `b` be?
   * 
   * a: 2 because reassigning arr[0] doesn't affect a; its value was passed when arr was initialized to [a, b]
   * b: [3, 8]
   */
  let a = 2;
  let b = [5, 8];
  let arr = [a, b];

  arr[0] += 2;
  arr[1][0] -= a;
}
{
  /** 8
   * Output all vowels from the strings in the arrays without using `for` or `while` loops
   */
  let obj = {
    first: ['the', 'quick'],
    second: ['brown', 'fox'],
    third: ['jumped'],
    fourth: ['over', 'the', 'lazy', 'dog'],
  };

  // Object.values(obj).forEach(arr => {
  //   arr.forEach(word => {
  //     const vowels = word.split('').filter(char => /[aeiou]/i.test(char));
  //     vowels.forEach(vowel => console.log(vowel));
  //   })
  // })
}
{
  /** 9
   * Given the following data structure, return a new array with the values in each subarray in ascending order
   * 
   * Algorithm
   * - mapping the array:
   *  - toSorted each subarray:
   *    - if the array contains strings, sort on (a > b - 0.5)
   *    - if the array contains numbers, sort on a - b
   */
  let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

  // const ascending = arr.map(subarr => subarr.toSorted((a, b) => {
  //   if (typeof a === 'string') return (Number(a > b) - 0.5);
  //   else return a - b;
  // }));

  const ascending = arr.map(subarr => typeof subarr[0] === 'string' ? subarr.toSorted() : subarr.toSorted((a, b) => a - b));
  // console.log({ascending});

  /** 10
   * Sort the elements in descending order
   */
  const descending = arr.map(subarr => typeof subarr[0] === 'string' ? subarr.toSorted((a, b) => (Number(b > a) - 0.5)) : subarr.toSorted((a, b) => b - a));
  // console.log({descending});
}
{
  /** 11
   * Use `map` to immutably create a new array with every number incremented by 1
   */
  let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
  const incrementedArr = arr.map(subObj => {
    const newObj = {...subObj};
    for (const key in newObj) {
      newObj[key] += 1;
    }
    return newObj;
  });
  // console.log({incrementedArr});
}
{
  /** 12
   * Deep copy the following nested array
   */
  const arr = [
    ['b', 'c', 'a'],
    ['blue', 'black', 'green'],
    { b: [2, 4, 6], c: [3, 6], d: [4] },
    { e: [8], f: [6, 10] },
  ];
  const deepCopy = JSON.parse(JSON.stringify(arr));
}
{
  /** 13
   * Deep copy the following nested object
   */
  const truthiness = {
    falsy: [ null, undefined, '', false, NaN, 0 ],
    truthy: ['everything else...']
  };

  /**
   * Recursively copy an object to arbitrary depth
   * 
   * Algorithm:
   * Given an object `obj`,
   * - for each key of `obj`:
   *   - if the key holds an object, create a matching key on `copy` recurse passing the object and `copy[key]`
   *   - if the key holds a primitive, assign it to `copy[key]`
   * - return `copy`
   */
  const deepCopyObject = (obj, copy = {}) => {
    for (const key in obj) {
      const keyHoldsObject = obj[key] !== null && typeof obj[key] === 'object';
      if (keyHoldsObject) {
        copy[key] = deepCopyObject(obj[key], copy[key]);
      } else {
        copy[key] === obj[key];
      }
    }
    return copy;
  }

  const deepCopy = JSON.parse(JSON.stringify(truthiness));
  const deepCopy2 = deepCopyObject(truthiness);
  const deepCopy3 = {};
  for (const key in truthiness) {
    deepCopy3[key] = [...truthiness[key]];
  }
  // console.log({deepCopy3, duplicated: deepCopy3 !== truthiness})
}
{
  /** 14
   * Given the following data structure, use a combination of methods, including filter, to return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.
   * 
   * Algorithm:
   * - mapping the array:
   *  - filtering each subarray:
   *    - filter for elements such that element % 3 === 0
   */
  let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

  const MultiplesOf3 = arr.map(subarr => subarr.filter(num => num % 3 === 0));
  // console.log(MultiplesOf3);
}
{
  /** 15
   * Given the following data structure, sort the array so that the sub-arrays are ordered based on the sum of the odd numbers that they contain.
   * 
   * Assumption: ascending
   * 
   * algo:
   * sorting the array:
   *  sort on subarr a sum of odds - subarr b sum of odds
   */
  let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

  const sortedByOddSum = arr.toSorted((a, b) => {
    const oddSum = (arr) => arr.reduce((sum, current) => current % 2 === 0 ? sum : sum + current, 0);
    return oddSum(a) - oddSum(b);
  });
  // console.log(sortedByOddSum);
  // [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]
}
{
  /** 16
   * Given the following data structure write some code to return an array containing the colors of the fruits and the sizes of the vegetables. The sizes should be uppercase, and the colors should be capitalized.
   * 
   * Algo:
   * Get an array of the object's entries
   * mapping over entries:
   * - access the object entry[1]:
   *   - if entry[1].type === 'fruit':
   *     - get its colors array
   *     - map the colors array to capitalize each color
   *     - return the colors array
   *   - else if its type is 'vegetable':
   *     - get its size
   *     - uppercase the size and return it
   */
  let obj = {
    grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
    carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
    apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
    apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
    marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
  };

  const colorsOrSize = Object.entries(obj).map(entry => {
    if (entry[1].type === 'fruit') {
      return entry[1].colors.map(color => color[0].toUpperCase() + color.slice(1));
    } else if (entry[1].type === 'vegetable') {
      return entry[1].size.toUpperCase();
    }
  });
  // console.log({colorsOrSize});
  // [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]
}
{
  /** 17
   * Given the array below, return an array which contains only the objects where all the numbers are even
   * 
   * Algorithm:
   * filtering the array:
   * - get element.a and check if every value within is even, then return the result
   */
  let arr = [
    { a: [1, 2, 3] },
    { b: [2, 4, 6], c: [3, 6], d: [4] },
    { e: [8], f: [6, 10] },
  ];

  const allEvens = arr.filter(subObj => {
    const allValues = [].concat(...Object.values(subObj));
    // console.log(allValues);
    return allValues.every(num => num % 2 === 0)
  });

  // alternative solution using nested .every():
  arr.filter(obj => {
    return Object.values(obj).every(subArr => {
      return subArr.every(num => num % 2 === 0);
    });
  });
  
  // => [ { e: [ 8 ], f: [ 6, 10 ] } ]
  // console.log({allEvens});
}
{
  /** 18
   * Given the following data structure, write some code that defines an object where the key is the first item in each subarray, and the value is the second.
   * 
   * input: array of 2-tuples
   * output: object of {[firstItem]: value} pairs
   */
  let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

  const objFromArr = Object.fromEntries(arr);

  // alternative:

  const objFromArr2 = arr.reduce((obj, pair) => Object.assign(obj, {[pair[0]]: pair[1]}), {});
  // console.log({objFromArr});
  // console.log({objFromArr2});
  // expected value of object
  // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }
}
{
  /** 19
   * Create a deep copy of `munsters` with immutable nested objects
   * 
   * output: same object copied with Object.freeze() called on each value
   * 
   * Algorithm:
   * - get an array of the object's entries
   * - reduce the array to an object:
   *   - for each 2-tuple, assign {[tuple[0]]: Object.freeze(tuple[1])} to the output object
   */
  let munsters = {
    herman: { age: 32, gender: 'male' },
    lily: { age: 30, gender: 'female' },
    grandpa: { age: 402, gender: 'male' },
    eddie: { age: 10, gender: 'male' },
    marilyn: { age: 23, gender: 'female'}
  };

  const frozenCopy = Object.entries(munsters).reduce((obj, tuple) => {
    const pair = { [tuple[0]]: Object.freeze(tuple[1]) };
    return Object.assign(obj, pair);
  }, {});

  // console.log({
  //   frozenCopy, 
  //   duplicated: frozenCopy !== munsters, 
  //   frozen: Object.values(frozenCopy).every(obj => Object.isFrozen(obj))
  // });

  // alternative soln:
  const munstersIndestructible = JSON.parse(
    JSON.stringify(munsters),
    (munster, info) => Object.freeze(info)
  );
}
{
  /** 20
   * Write a function that takes no arguments and returns a string that contains a UUID. A UUID is a string of 8-4-4-4-12 hexadecimal characters (0 - 9, a - f)
   * 
   * Algorithm:
   * - create an array of 32 random hex characters
   * - insert hyphens at indices 8, 12, 16, 20, making sure not to overwrite
   * - join the array and return it
   */

  const getUUID = () => self.crypto.randomUUID();

  function getUUID2() {
    const UUID_STRING_LENGTH = 32;
    const SEPARATOR = '-';
    const SEPARATOR_INDICES = [8, 12, 16, 20];
    let chars = [];

    const randomHexChar = () => {
      const randomInt = Math.floor(Math.random() * 16);
      const hexLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
      return randomInt >= 10 ? hexLetters[randomInt - 10] : randomInt;
    }

    while (chars.length < UUID_STRING_LENGTH) {
      chars.push(randomHexChar());
    }
    SEPARATOR_INDICES.toReversed().forEach(idx => {
      chars.splice(idx, 0, SEPARATOR);
    });

    return chars.join('');
  }

  console.log({uuid: getUUID2()})
}
{
  /** 21
   * Identify the higher-order functions and callbacks in this code
   * 
   * higher-order functions: scream, map
   * callbacks: the callback inside map, exclamate
   */
  function scream(message, helper) {
    const shout = () => message.toUpperCase();
  
    return helper(shout());
  }
  
  const exclamate = str => str + "!!!";
  
  const foo = ["heLp", "Boo", "arGH", "Oh no"];
  const FOO = foo.map(word => scream(word, exclamate));
}
/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
const { printTestResults } = require('../../js-120/testing/testingFunctions');

{
  /** 1
   * Create a function that takes an array of numbers as an argument.
   * For each number, determine how many numbers in the array are smaller than it,
   * and place the answer in an array. Return the resulting array.
   *
   * When counting numbers, only count unique values.
   * That is, if a number occurs multiple times in the array, it should only be counted once.
   * Input: array of numbers
   * Output: array of numbers
   *
   * Assumptions:
   *
   * Data structure:
   * a set of the numbers in the input array to compare each number against.
   *
   * Algorithm:
   * - Take an array of numbers
   * - Store the numbers in a set `uniqueNums`
   * - mapping the input array, for current number `x`:
   *   - filter `uniqueNums` for numbers less than `x`: subprocess valuesLessThan
   *   - return the length of the filtered set
   * - return the mapped array
   *
   * - ValuesLessThan:
   * - take a set of numbers and a comparison number `x`
   * - spread the set into an array
   * - filter the array for values less than `x`, then return it
   */

  function valuesLessThan(uniqueNums, num) {
    const uniquesArr = [...uniqueNums];
    return uniquesArr.filter((unique) => unique < num);
  }

  function smallerNumbersThanCurrent(numArr) {
    const uniqueNums = new Set(numArr);
    const smallerNumbersThanEach = numArr.map((num) => {
      const lesserNumbers = valuesLessThan(uniqueNums, num);
      return lesserNumbers.length;
    });
    return smallerNumbersThanEach;
  }

  const examples = [
    {
      in: [[8, 1, 2, 2, 3]],
      out: [3, 0, 1, 1, 2],
    },
    {
      in: [[7, 7, 7, 7]],
      out: [0, 0, 0, 0],
    },
    {
      in: [[6, 5, 4, 8]],
      out: [2, 1, 0, 3],
    },
    {
      in: [[1]],
      out: [0],
    },
  ];

  // printTestResults(examples, smallerNumbersThanCurrent);
}
{
  /** 2
   * Create a function that takes an array of integers as an argument. 
   * The function should return the minimum sum of 5 consecutive numbers in the array. 
   * If the array contains fewer than 5 elements, the function should return null.
   * 
   * input: array of integers
   * output: null or a number (the smallest sum of five consecutive integers in the array)
   * 
   * Algorithm:
   * - Take an array as input
   * - if the input is not an array or if array.length < 5, return null
   * - create a new array `sums`
   * - iterating over the input from the start to the fifth-last number:
   *   - take the sum of the current element and the next four
   *   - push the sum to `sums`
   * - return the smallest value in the array
   */

  function minimumSum(intArr) {
    if (!Array.isArray(intArr) || intArr.length < 5) return null;
    const consecutiveIntegers = 5;
    const sums = intArr.slice(0, -(consecutiveIntegers - 1))
      .map((num, idx) => intArr
        .slice(idx, idx + consecutiveIntegers)
        .reduce((sum, current) => sum + current, 0));
    return Math.min(...sums);
  }

  const examples = [
    {
      in: [[1, 2, 3, 4]],
      out: null,
    },
    {
      in: [[1, 2, 3, 4, 5, -5]],
      out: 9,
    },
    {
      in: [[1, 2, 3, 4, 5, 6]],
      out: 15,
    },
    {
      in: [[55, 2, 6, 5, 1, 2, 9, 3, 5, 100]],
      out: 16,
    },
    {
      in: [[-1, -5, -3, 0, -1, 2, -4]],
      out: -10,
    },
  ];
  // printTestResults(examples, minimumSum);
}
{
  /** 3
   * Create a function that takes a string argument and returns a copy of the string
   * with every second character in every third word converted to uppercase.
   * Other characters should remain the same.
   * 
   * input: a string
   * output: a string of each second char of every third uppercased.
   * 
   * Assumptions:
   * - All characters are letters
   * - If a letter is already uppercase, it should remain so
   * 
   * Algorithm:
   * - split the string on spaces into an array wordArr
   * - map over wordArr, with an element `word` and index `idx`:
   *   - if (`idx` + 1) % 3 !== 0, return word
   *   - else return everySecondUpperCased(word)
   * - join the mapped array using spaces, and return it.
   * 
   * everySecondUpperCased:
   * - take a string as input
   * - split the string into characters
   * - map the character array, with element `char` and index `idx`:
   *   - if (`idx` + 1) % 2 === 0, return char.toUpperCase()
   *   - else return char
   * - join and return the mapped array
   */

  const everySecondUpperCased = (str) => {
    const words = str.split('');
    const isOdd = (idx) => idx % 2 !== 0;
    return words
      .map((char, idx) => (isOdd(idx) ? char.toUpperCase() : char))
      .join('');
  };

  function toWeirdCase(str) {
    const wordArr = str.split(' ');
    const isThirdIndex = (idx) => (idx + 1) % 3 === 0;
    const weirdCased = wordArr
      .map((word, idx) => (isThirdIndex(idx) ? everySecondUpperCased(word) : word));
    return weirdCased.join(' ');
  }

  const examples = [
    {
      in: ['Lorem Ipsum is simply dummy text of the printing world'],
      out: 'Lorem Ipsum iS simply dummy tExT of the pRiNtInG world',
    },
    {
      in: ['It is a long established fact that a reader will be distracted'],
      out: 'It is a long established fAcT that a rEaDeR will be dIsTrAcTeD',
    },
    {
      in: ['aaA bB c'],
      out: 'aaA bB c',
    },
    {
      in: ["Mary Poppins' favorite word is supercalifragilisticexpialidocious"],
      out: "Mary Poppins' fAvOrItE word is sUpErCaLiFrAgIlIsTiCeXpIaLiDoCiOuS",
    },
  ];
  // printTestResults(examples, toWeirdCase);
}
{
  /** 4
   * Take an array of integers and return 
   * an array of two numbers that are closest together in value.
   * If multiple pairs are equally close, return the pair that occurred first.
   * 
   * input: array of integers
   * output: double of the integers with smallest absolute difference
   * 
   * Assumptions:
   * - No duplicate numbers occur (or duplicates don't affect the result)
   * 
   * Algorithm:
   * - take an array of integers
   * - get an array of doubles of each possible combination of integers
   * - map the `doubles` array:
   *   - return an object of form {double, sum}
   * - sort the mapped array on element.sum
   * - return the double at sortedArr[0]
   * 
   * getDoubles:
   * - take an array of integers
   * - reduce the array to an array of combinations given current element `current` and index `idx:
   *   - slice the array from idx + 1
   *   - map the slice from secondNum to [current, secondNum]
   *   - concat the mapped arr to output
   * - return the array of unique doubles
   */
  function getDoubles(intArr) {
    return intArr.reduce((output, current, idx) => {
      const subsequents = intArr.slice(idx + 1);
      const doublesWithCurrent = subsequents.map((secondNum) => [current, secondNum]);
      return output.concat(doublesWithCurrent);
    }, []);
  }

  const getAbsoluteDiff = (double) => Math.abs(double[0] - double[1]);

  function closestNumbers(intArr) {
    const doubles = getDoubles(intArr);

    const mapped = doubles.map((currentDouble) => ({ 
      double: currentDouble, 
      diff: getAbsoluteDiff(currentDouble),
    }));

    const sorted = mapped.sort((a, b) => a.diff - b.diff);
    return sorted[0].double;
  }

  const p = console.log;
  const eq = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

  // p(eq(closestNumbers([5, 25, 15, 11, 20]), [15, 11]));
  // p(eq(closestNumbers([19, 25, 32, 4, 27, 16]), [25, 27]));
  // p(eq(closestNumbers([12, 22, 7, 17]), [12, 7]));
}
{
  /** 5
   * Create a function that takes a string argument and 
   * returns the character that returns the most often in the string.
   * If there are multiple characters, return the one that appears first.
   * Consider uppercase and lowercase versions the same.
   * 
   * input a string of letters
   * output: the single most common letter
   * 
   * Assumptions:
   * - treat uppercase letters as lowercase ones, per the test cases
   * 
   * Data structure: array of characters reduced to an object of letter: frequency pairs
   * 
   * Algorithm:
   * - split the string into characters and filter for letters
   * - reduce letterArray to an object `frequencies`, given `char`:
   *   - if frequencies already has a property `char`, increment its value
   *   - else assign [char]: 0 to frequency
   *   - return frequency
   * - get an array of the entries of frequency
   * - sort the entries array by the frequency (descending)
   * - return sorted[0][0];
   */
  function mostCommonChar(str) {
    const letterArr = str.split('').filter((char) => /[a-z]/i.test(char));
    const frequencies = letterArr.reduce((freqs, letter) => {
      const lowerCased = letter.toLowerCase();
      freqs[lowerCased] = Object.hasOwn(freqs, lowerCased) ? freqs[lowerCased] + 1 : 1;
      return freqs;
    }, {});
    const sortedEntries = Object.entries(frequencies)
      .sort(([firstKey, firstVal], [secondKey, secondVal]) => secondVal - firstVal);
    return sortedEntries[0][0];
  }

  const examples = [
    {
      in: ['Hello World'],
      out: 'l',
    },
    {
      in: ['Mississippi'],
      out: 'i',
    },
    {
      in: ['Happy birthday!'],
      out: 'h',
    },
    {
      in: ['aaaaaAAAA'],
      out: 'a',
    },
    {
      in: ['Peter Piper picked a peck of pickled peppers.'],
      out: 'p',
    },
    {
      in: ['Peter Piper repicked a peck of repickled peppers. He did! Peter Piper repicked a peck of repickled peppers. He did!'],
      out: 'e',
    },
  ];
  // printTestResults(examples, mostCommonChar);
}
{
  /** 6
   * Create a function that takes a string argument 
   * and returns a hash in which the keys represent the lowercase letters in the string 
   * and the values represent how often the corresponding letter occurs in the string.
   * 
   * input: string
   * output: an object of lowercaseLetter: frequency key-value pairs
   * 
   * Algorithm
   * - split the string into characters and remove all characters except lowercase letters
   * - reduce the array to an object `output`:
   *   - if `output` has a key for the current letter, increment it by 1
   *   - else set that property to 1
   * - return the output object
   */
  function countLetters(str) {
    const letterArr = str.split('').filter((char) => /[a-z]/.test(char));
    return letterArr.reduce((output, current) => {
      output[current] = Object.hasOwn(output, current) ? output[current] + 1 : 1; 
      return output;
    }, {});
  }

  const p = console.log;
  const objeq = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (! keys2.includes(key)) {
        return false;
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  let expected = { w: 1, o: 2, e: 3, b: 1, g: 1, n: 1 };
  p(objeq(countLetters('woebegone'), expected));

  expected = { l: 1, o: 1, w: 1, e: 4, r: 2,
              c: 2, a: 2, s: 2, u: 1, p: 2};
  // p(objeq(countLetters('lowercase/uppercase'), expected));

  expected = { u: 1, o: 1, i: 1, s: 1 };
  // p(objeq(countLetters('W. E. B. Du Bois'), expected));

  // p(objeq(countLetters('x'), { x: 1 }));
  // p(objeq(countLetters(''), {}));
  // p(objeq(countLetters('!!!'), {}));
}
{
  /** 7
   * Create a function that takes an array of integers as an argument 
   * and returns the number of identical pairs of integers in that array. 
   * 
   * For instance, the number of identical pairs in [1, 2, 3, 2, 1] is 2: 
   * there are two occurrences each of both 2 and 1.
   * 
   * Assumptions:
   * - if input is empty, return 0
   * - 
   * 
   * input: array of integers
   * output: number of pairs of identical digits
   * 
   * data structure: object that holds the count of each number
   * algorithm:
   * - initialize a totalPairs variable to 0.
   * - reduce the input array to an object `counts`:
   *   - if the current element is a property of `counts`, increment its value
   *   - else initialize counts[current] to 1
   * - for each key in counts:
   *   - get the current integer by casting key to number
   *   - get pairs of the current number by taking (current - (current % 2)) / 2
   *   - add `pairs` to `totalPairs`
   * - return totalPairs
   */

  function pairs(intArr) {
    const counts = intArr.reduce((output, current) => {
      output[current] = Object.hasOwn(output, current) ? output[current] + 1 : 1;
      return output;
    }, {});
    const totalPairs = Object.keys(counts).reduce((sumPairs, current) => {
      const countofCurrent = counts[Number(current)];
      const pairsOfCurrent = (countofCurrent - (countofCurrent % 2)) / 2;
      return sumPairs + pairsOfCurrent;
    }, 0);
    // console.log({totalPairs, intArr, counts});
    return totalPairs;
  }

  const p = console.log;
  // p(pairs([3, 1, 4, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7]) === 3);
  // p(pairs([2, 7, 1, 8, 2, 8, 1, 8, 2, 8, 4]) === 4);
  // p(pairs([]) === 0);
  // p(pairs([23]) === 0);
  // p(pairs([997, 997]) === 1);
  // p(pairs([32, 32, 32]) === 1);
  // p(pairs([7, 7, 7, 7, 7, 7, 7]) === 3);
}
{
  /** 8
   * Given a string, return the length of the longest sequence of consecutive vowels
   * 
   * Algorithm:
   * - split the string on non-vowel char sequences
   * - map the split to the length of each element
   * - return the maximum value of the mapped array
   */

  const longestVowelSubstring = (str) => Math.max(...str.split(/[^aeiou]+/i).map((el) => el.length));

  const p = console.log;
  // p(longestVowelSubstring('cwm') === 0);
  // p(longestVowelSubstring('many') === 1);
  // p(longestVowelSubstring('launchschoolstudents') === 2);
  // p(longestVowelSubstring('eau') === 3);
  // p(longestVowelSubstring('beauteous') === 3);
  // p(longestVowelSubstring('sequoia') === 4);
  // p(longestVowelSubstring('miaoued') === 5);
}
{
  /** 9
   * Create a function that takes two string arguments and returns
   * the number of times the second string occurs in the first
   * (overlapping occurrences do not count)
   * 
   * Output a number
   * 
   * Algorithm:
   * - initialize a variable `parentString` to the value of the first string
   * - initialize a variable `count` to 0
   * - while true:
   *   - search for the lastIndexOf the substring
   *   - if an instance of the substring is found:
   *     - increment count
   *     - slice the string from 0 to the index of the occurrence 
   *     - reassign parentString to the slice
   *   - if the end of the string is reached (-1 returned), break out of the loop
   * - return count
   */
  function countSubstrings(parent, substring) {
    let parentString = parent;
    let count = 0;
    while (true) {
      const matchIdx = parentString.lastIndexOf(substring);
      if (matchIdx === -1) break;
      count += 1;
      parentString = parentString.slice(0, matchIdx);
    }
    return count;
  }

  const p = console.log;
  // p(countSubstrings('babab', 'bab') === 1);
  // p(countSubstrings('babab', 'ba') === 2);
  // p(countSubstrings('babab', 'b') === 3);
  // p(countSubstrings('babab', 'x') === 0);
  // p(countSubstrings('babab', 'x') === 0);
  // p(countSubstrings('', 'x') === 0);
  // p(countSubstrings('bbbaabbbbaab', 'baab') === 2);
  // p(countSubstrings('bbbaabbbbaab', 'bbaab') === 2);
  // p(countSubstrings('bbbaabbbbaabb', 'bbbaabb') === 1);
}
{
  /** 10
   * Given a string of digits, return the number of even-numbered substrings that can be formed
   * 
   * Algorithm:
   * - get an array of all possible substrings of the input
   * - map the array to numbers, then filter for evens only
   * - return the length of the filtered array
   * 
   * Get substrings:
   * - initialize an empty array subStrings
   * - for each character of the string:
   *   - slice the input string from the position of the current character `fromChar`
   *   - for the number of characters in the slice, with iterator i:
   *     - get the slice of i chars starting from the current char, and push it to `subStrings`
   * - return subStrings array
   */
  function evenSubstrings(digitString) {
    const subStrings = getSubstrings(digitString);
    const evensOnly = subStrings.map(Number).filter(num => num % 2 === 0);
    return evensOnly.length;
  }

  function getSubstrings(str) {
    const subStrings = [];
    for (let i = 0; i < str.length; i += 1) {
      const fromChar = str.slice(i);
      for (let j = 1; j <= fromChar.length; j += 1) {
        subStrings.push(fromChar.slice(0, j));
      }
    }
    return subStrings;
  }

  const p = console.log;
  // p(evenSubstrings('1432') === 6);
  // p(evenSubstrings('3145926') === 16);
  // p(evenSubstrings('2718281') === 16);
  // p(evenSubstrings('13579') === 0);
  // p(evenSubstrings('143232') === 12);
}
{
  /** 11
   * 
   * 
   * subproblem: find the shortest pattern that if repeated, generates the input string
   * algo:
   * - iterate over the length of the input string starting from 1, with iterator i:
   * - check if splitting the input string into slices of length i generates a list of
   * equivalent strings. If so, return the slice and the length of the string
   * 
   */

  function repeatedSubstring(str) {
    for (let i = 1; i <= str.length; i += 1) {
      const slices = splitIntoSlices(str, i);
      if (new Set(slices).size === 1) return [slices[0], slices.length];
    }
  }

  function splitIntoSlices(str, length) {
    let remainder = str;
    const output = [];
    while (remainder.length > 0) {
      output.push(remainder.slice(0, length));
      remainder = remainder.slice(length);
    }
    return output;
  }

  const p = console.log;
  const eq = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

  p(eq(repeatedSubstring('xyzxyzxyz'), ['xyz', 3]));
  p(eq(repeatedSubstring('xyxy'), ['xy', 2]));
  p(eq(repeatedSubstring('xyz'), ['xyz', 1]));
  p(eq(repeatedSubstring('aaaaaaaa'), ['a', 8]));
  p(eq(repeatedSubstring('superduper'), ['superduper', 1]));
}
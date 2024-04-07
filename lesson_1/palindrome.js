const { printTestResults } = require("../testing/testingFunctions");

function isPalindrome(str) {
  const trimmedString = str.trim();
  if (trimmedString === '') return false;

  if (trimmedString.slice(0,1).toLowerCase() !== trimmedString.slice(-1).toLowerCase()) return false;
  if (trimmedString.length <= 2) return true;
  return isPalindrome(trimmedString.slice(1, -1));
}

// const examples = [
//   ['palindrome', false],
//   ['racecar', true],
//   ['Racecar', true],
//   ['a', true],
//   ['1v1', true],
//   ['   bob  ', true],
//   ['   b ob  ', false],  //this probably returns true, but shouldn't
// ];

// printTestResults(examples, isPalindrome, true);

/**
 * Given a string, return the same string but with all palindromes uppercased.
 */
function changeMe(sentence) {
  return sentence.split(' ').map(word => isPalindrome(word) ? word.toUpperCase() : word).join(' ');
}

// const examples = [
//   ["We will meet at noon", "We will meet at NOON"],
//   ["No palindromes here", "No palindromes here"],
//   ["", ""],
//   ["I LOVE my mom and dad equally", "I LOVE my MOM and DAD equally"],
// ]

// printTestResults(examples, changeMe);

/**
 * Given a string, return all substrings of the given string which are palindromes (case sensitive)
 * Problem:
 * 
 * Mental model: Create an empty output array. Iterate over the input string using an iterator "iterator" to keep track of the position. If at any point, the current character is equal to the previous, or the next previous character, assign the current character's index to a variable "forwardIndex" and previous character's index to a variable "backwardsIndex" and compare the next character to the character at backwardsIndex - 1, repeating this process until one comparison fails, then slice the string to isolate the palindromic segment and push it to the output array. Continue iteration from "iterator"
 * 
 * Alternative: use a regex test with capture groups
 * 
 * Alternative 2: find a point where the current character matches the next or second-next one, then split the string on the index of the match, reverse the first one, and compare the beginning of each one, pushing each applicable palindrome to an output string and continuing until one of the paired characters doesn't match
 * 
 * Algorithm (from model alt 2):
 * - Create an empty array 'result'
 * - split the string into characters, then iterate over the array:
 *   - if the current character is equal to the next character:
 *     - 
 * - return 'result'
 */

// compare two strings, pushing a new string to output array each time the two characters at the same index match
function findPalindromesFromPoint(str, start, excludeCenter) {
  const endOfString1 = excludeCenter ? start : start + 1;
  const str1 = str.slice(0, endOfString1).split('').toReversed().join('');
  const str2 = str.slice(start + 1);
  const end = Math.min(str1.length, str2.length);
  const palindromes = [];
  let concatenation = excludeCenter ? str[start] : '';
  for (let i = 0; i < end; i += 1) {
    if (str1[i] === str2[i]) {
      concatenation = str1[i] + concatenation + str2[i];
      palindromes.push(concatenation);
    }
  }
  return palindromes;
}

function palindromicSubstrings(str) {
  return str.split('').reduce((output, char, index) => {
    // if (index === str.length - 1) return;

    if (char === str[index + 1]) { // no center character to exclude
      output.push(...findPalindromesFromPoint(str, index, false));
    } else if (char === str[index + 2]) { // exclude center character
      output.push(...findPalindromesFromPoint(str, index + 1, true));
    }
    return output;
  }, []);
}

// const palindromicSubstringsRegex = (str) => {
//   const palindromeRegex = /((\w)\2*).\1{1}/g;
//   const matchArr = [...str.matchAll(palindromeRegex)];
//   console.log({matchArr: matchArr[0]});
//   return matchArr[0][0];
//   // return [...str.matchAll(/((\w)\2*).\1{1}/g)];
// }

const examples = [
  ["supercalifragilisticexpialidocious", ["ili"]],
  ["abcddcbA", ["bcddcb", "cddc", "dd"]],
  ["palindrome", []],
  ["", []],
];

printTestResults(examples, palindromicSubstrings);
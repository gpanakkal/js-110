/**
 * Problem:
 * Given an array of strings, return a new array where the strings are sorted to the highest number of adjacent consonants a particular string contains. If two strings contain the same highest number of adjacent consonants they should retain their original order in relation to each other. Consonants are considered adjacent even if there is a space between them.
 * 
 * input: array of strings
 * output: array of the same strings, sorted
 * 
 * Explicit assumptions:
 * - Consonants are all letters except 'aeiou'
 * - Spaces should be ignored
 * 
 * Implicit assumptions:
 * - Special characters such as letters with accents above them should not be considered consonants or will not be in the inputs
 * - At least one string will be passed, even if it's an empty string
 * - a single consonant by itself is not considered adjacent
 * 
 * Clarifying questions:
 * - are empty strings lowest in the ordering since they contain no adjacent consonants? Presumably, but none are in the test cases
 * - Should the output be in ascending or descending order? Ascending
 * 
 * Data structure: an array. Maybe use an intermediate array containing objects of {string, mostConsonants}
 * 
 * Algorithm:
 * 
 * sortStringsByConsonants:
 * - given an array of strings
 * - call .toSorted() on the mapped array passing mostConsecutiveElements and return the output, assuming it honors the original ordering as a tiebreaker
 * 
 * mostConsecutiveConsonants:
 * - remove all spaces in the string
 * - select every sequence of more than 1 consecutive consonant and push it to a new array
 * - select the longest sequence and return its length
 */
const {printTestResults} = require('../testing/testingFunctions');  

const sortStringsByConsonants = (strings) => strings.toSorted((a, b) => mostConsecutiveConsonants(b) - mostConsecutiveConsonants(a));

function mostConsecutiveConsonants(str) {
  const spacesRemoved = str.replace(/[\s]+/, '');
  const consonantSequences = spacesRemoved.split(/[aeoiu]+/).filter(seq => seq.length > 1);
  const longestString = consonantSequences.reduce((max, current) => current.length > max ? current.length : max, 0);
  return longestString;
}

const examples = [
  [
    [['aa', 'baa', 'ccaa', 'dddaa']], 
    ['dddaa', 'ccaa', 'aa', 'baa']
  ],
  [
    [['can can', 'toucan', 'batman', 'salt pan']],
    ['salt pan', 'can can', 'batman', 'toucan']
  ],
  [
    [['bar', 'car', 'far', 'jar']],
    ['bar', 'car', 'far', 'jar']
  ],
  [
    [['day', 'week', 'month', 'year']],
    ['month', 'day', 'week', 'year']
  ]
];

printTestResults(examples, sortStringsByConsonants);
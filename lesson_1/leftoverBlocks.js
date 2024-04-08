/**
 * Problem:
 * You have a number of building blocks that can be used to build a valid structure. There are rules determining the validity of a structure:
 * - the building blocks are cubes
 * - the structure is built in layers
 * - the top layer is a single block
 * - a block in an upper layer must be supported by four blocks in a lower layer
 * - a block in a lower layer CAN support more than one block in an upper layer
 * - you cannot leave gaps between blocks
 * Write a program that, given the number for a specific amount of cubes, calculates the number of blocks left over after building the tallest possible valid structure.
 * 
 * Inputs: a number of blocks
 * Outputs: the leftover blocks after building the tallest possible structure
 * 
 * Mental model:
 * - since a block can support multiple blocks, but each block must have 4 supporting it, perhaps the optimal arrangement of blocks in a layer is a square, and the number of blocks underneath it grows as the square of (this layer's block count^(1/2) + 1), since to support a 2x2 grid of blocks requires a 3x3 grid under it.
 * 
 * - so the width of a given layer is (layers from top)^2, starting at 1 (the top layer), and the total blocks for k layers is the sum from 1 to k of n^2
 * - use an iterative solution that subtracts from the remaining blocks as long as there are enough to add a layer below, then returns the remainder once there aren't
 * 
 * implicit assumptions:
 * - input will be a number >= 1: can be zero, per test cases
 * - the structure doesn't need to actually be built in any sense; the blocks merely have to be counted
 * - supporting a block with more than 4 blocks underneath it is inefficient (confirmed by test cases)
 * 
 * Data structure: an array may be used to store layer sizes, but this is not necessary; a running total of the blocks used can suffice
 * 
 * Algorithm:
 * - Take a number of available blocks and set `blocksRemaining` equal to it
 * - set a variable `layers` to 0
 * - while there are blocks remaining:
 *   - set a variable `nextLayerSize` equal to (layers + 1) * 2
 *   - if blocksRemaining - nextLayerSize >= 0:
 *     - increment layers
 *     - subtract nextLayerSize from blocksRemaining
 *   - else:
 *     - break out of the while loop
 * - return blocksRemaining
 */

function calculateLeftoverBlocks(availableBlocks) {
  let remainingBlocks = availableBlocks;
  let layers = 0;

  while (remainingBlocks) {
    const nextLayerSize = (layers + 1) ** 2;
    if (remainingBlocks - nextLayerSize < 0) {break;}
    layers += 1;
    remainingBlocks -= nextLayerSize;
  }

  return remainingBlocks;
}

const testCases = [
  [0, 0],
  [1, 0],
  [2, 1],
  [4, 3],
  [5, 0],
  [6, 1],
  [14, 0],
]

console.log(testCases.map((pair) => {
  const [input, expected] = pair;
  const observed = calculateLeftoverBlocks(input);
  return {
    correct: observed === expected,
    input,
    expected,
    observed
  }
}));
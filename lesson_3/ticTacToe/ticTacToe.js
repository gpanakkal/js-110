const { question } = require('readline-sync');
const constants = require('./constants.json');
const { waitForDebugger } = require('inspector');

const DEFAULT_BOARD_STATE = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

const displayOutcomeMessage = (winnerName) => {
  console.log(winnerName === 'draw' ? `Game was a draw!` : `${winnerName} won!`);
}

function ticTacToe() {
  console.log(constants.WELCOME_MESSAGE);
  while (true) {
    const currentBoardState = JSON.parse(JSON.stringify(DEFAULT_BOARD_STATE));
    displayBoard(currentBoardState);

    while (gameOutcome(currentBoardState) === 'undecided') {
      turnIteration(currentBoardState);
    }
    // once the game is over
    displayOutcomeMessage(gameOutcome(currentBoardState));
    let playAgain = getValidInput(constants.PLAY_AGAIN_PROMPT, question, undefined, (userInput) => ['y', 'n'].includes(userInput));
    if (playAgain === 'n') {
      console.log(constants.TERMINATE_SESSION_MESSAGE);
      break;
    }
  }
}

ticTacToe();
/** status: dev
 * Handle the core logic of 
 */
async function turnIteration(currentBoardState) {
  const userChoiceIsValid = ([rowNum, columnNum]) => currentBoardState[rowNum]?.[columnNum] !== undefined;

  const userChoice = getValidInput(constants.USER_TURN_PROMPT, (prompt) => question(prompt).split(' '),
    constants.INVALID_TURN_MESSAGE, userChoiceIsValid);
  handlePlayerTurn(currentBoardState, userChoice, 'user');
  if (gameOutcome(currentBoardState) !== 'undecided') {
    return;
  }
  const computerChoice = makeComputerChoice(currentBoardState);
  handlePlayerTurn(currentBoardState, computerChoice, 'computer');
  if (gameOutcome(currentBoardState) !== 'undecided') {
    return;
  }
}
/** status: done
 * Handle player selection by updating and displaying the board
 */
function handlePlayerTurn(currentBoardState, playerChoice, playerName) {
  updateBoard(currentBoardState, playerChoice, playerName);
  console.log(`${playerName} selected ${playerChoice}`);
  displayBoard(currentBoardState);
}
/** status: done
 * Prompt the user for input, 
 * @param {string} prompt 
 * @param {function} promptCallback 
 * @param {string} invalidInputMessage 
 * @param {function} inputValidationCallback 
 * @returns valid user input
 */
function getValidInput(prompt, promptCallback, invalidInputMessage = 'Invalid selection', inputValidationCallback) {
  let userInput = promptCallback(prompt);
  while (!inputValidationCallback(userInput)) {
    console.log(invalidInputMessage + ` ${userInput}`);
    userInput = promptCallback('Try again: ');
  }
  return userInput;

}
/** status: done
 * Given a board state, pick a random empty cell and return its indices as [rowNum, columnNum]
 * 
 * potential improvement: select a cell that lies in the same triplet as another cell filled by the computer, or pick one at random if no such cell exists, and return the cell location as a tuple of [rowNum, columnNum]
 */
function makeComputerChoice(boardState) {
  // convert the board cells into objects of form {value, indices}
  const cellsWithIndices = boardState.map((row, rowNum) => row.map((cell, columNum) => {
    return {value: cell, indices: [rowNum, columNum]};
  })).flat();
  const emptyCells = cellsWithIndices.filter((cellObj) => cellObj.value === constants.EMPTY_CELL);
  const randomEmptyCellIndex = Math.floor(Math.random() * emptyCells.length);
  const computerChoice = emptyCells[randomEmptyCellIndex].indices;
  return computerChoice;
}
/** status: done
 * Given a player selection as a 2-tuple of [rowNum, columnNum], update the current board state and return it
 */
function updateBoard(boardState, cellLocation, playerName) {
  const shape = playerName === 'computer' ? constants.COMPUTER_SHAPE : constants.USER_SHAPE;
  const [row, column] = cellLocation;
  boardState[row][column] = shape;
  return boardState;
}
/** status: done
 * Given a board state, output it to the console line by line
 */
function displayBoard(boardState) {
  const toFormattedRow = ([a, b, c]) => `|${a}|${b}|${c}|`.padStart(constants.BOARD_DESIRED_WIDTH, ' ');
  const formattedRows = boardState.map(row => toFormattedRow(row));
  console.log('Board State:');
  formattedRows.forEach(row => console.log(row));
  console.log('');
  // |X|O|X|
  // |X|O|X|
  // |X|O|X|
}
/** status: done
 * Given a board state, decide if the game has been won, drawn, or is undecided
 * returns 'user', 'computer', 'draw', or 'undecided'
 * 
 * The game is won if a row, column, or diagonal are all filled with X or O
 * The game is drawn if the board is full and there is no winner
 * The game is undecided otherwise
 */
function gameOutcome(boardState) {
  const winner = winningTripletFound(boardState);
  const boardIsFull = boardState.flat().every(cell => cell != constants.EMPTY_CELL);

  if (winner) return winner;
  else if (boardIsFull) return 'draw';
  else return 'undecided';
}
/** status: done
 * Returns the name of the winner if there is one, or undefined otherwise
 */
function winningTripletFound(boardState) {
  const validTriplets = getValidTriplets();

  const winningTriplets = validTriplets.filter((triplet) => {
    const tripletCells = triplet.map(cellIndices => {
      const [i, j] = cellIndices;
      return boardState[i][j];
    });

    const filledCells = tripletCells.filter(cell => cell !== constants.EMPTY_CELL);
    const uniqueValues = new Set(filledCells);
    return filledCells.length === 3 && uniqueValues.size === 1;
  });

  if (winningTriplets.length === 0) return;

  const winnerName = winningTriplets[0].reduce((winner, currentCellCoords) => {
    const cellValue = boardState[currentCellCoords[0]][currentCellCoords[1]];
    winner = cellValue === constants.USER_SHAPE ? 'user' : 'computer';
    return winner;
  }, '');
  return winnerName;
}
/** status: done
 * Returns an array of all the triplets of pairs of [row, column] cell indices that are arranged in a line, including diagonals.
 */
function getValidTriplets() {
  // set up an array of valid triplets of 2-tuples (cell indices)
  const validTripletRows = DEFAULT_BOARD_STATE.map((row, rowIndex) => {
    return row.map((value, columnIndex) => ([rowIndex, columnIndex]))
  });
  const validTripletColumns = DEFAULT_BOARD_STATE.map((row, rowIndex) => {
    return row.map((value, columnIndex) => ([columnIndex, rowIndex]))
  });
  const validTripletDiagonals = [
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ]
  return [...validTripletRows, ...validTripletColumns, ...validTripletDiagonals];
}
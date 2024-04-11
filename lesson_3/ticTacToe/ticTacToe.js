const { question } = require('readline-sync');
const constants = require('./constants.json');

const DEFAULT_BOARD_STATE = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

const displayInvalidTurnMessage = (userInput) => console.log(`User made invalid selection ${userInput}`);
const displayValidTurnMessage = (playerName, input) => console.log(`${playerName} selected ${input}`);
const displayOutcomeMessage = (winnerName) => {
  console.log(winnerName === 'draw' ? `Game was a draw!` : `${winnerName} won!`);
}

function ticTacToe() {
  console.log(constants.WELCOME_MESSAGE);
  while (true) {
    const currentBoardState = JSON.parse(JSON.stringify(DEFAULT_BOARD_STATE));
    displayBoard(currentBoardState);

    while (gameOutcome(currentBoardState) === 'undecided') {
      let userChoice = question(constants.USER_TURN_PROMPT).split(' ');

      const userChoiceIsValid = ([rowNum, columnNum]) => currentBoardState[rowNum][columnNum] !== undefined;

      while (!userChoiceIsValid(userChoice)) {
        displayInvalidTurnMessage(userChoice);
        userChoice = question(constants.USER_TURN_PROMPT).split(' ');
      }
      updateBoard(currentBoardState, userChoice, 'user');
      displayValidTurnMessage('user', userChoice);
      const computerChoice = makeComputerChoice(currentBoardState);
      updateBoard(currentBoardState, computerChoice, 'computer');
      displayValidTurnMessage('computer', computerChoice);
      displayBoard(currentBoardState);
    }
    // once the game is over
    displayOutcomeMessage(gameOutcome(currentBoardState));
    let playAgain = question(constants.PLAY_AGAIN_PROMPT);
    while (playAgain !== 'y' && playAgain !== 'n') {
      playAgain = question(constants.PLAY_AGAIN_PROMPT);
    }
    if (playAgain === 'n') {
      console.log(constants.TERMINATE_SESSION_MESSAGE);
      break;
    }
  }
}

ticTacToe();

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
  const emptyCells = cellsWithIndices.filter((cellObj) => cellObj.value === ' ');
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
  console.log(''); // to make a space
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
 * The game is ongoing otherwise
 */
function gameOutcome(boardState) {

  const winner = winningTripletFound(boardState);
  const boardIsFull = boardState.flat().every(cell => cell != ' ');
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
    const filledCells = tripletCells.filter(cell => cell !== ' ');
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
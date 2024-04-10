const { question } = require('readline-sync');

const DEFAULT_BOARD_STATE = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

const USER_SHAPE = 'O';
const COMPUTER_SHAPE = 'X';
const ROW_SEPARATOR = '-';
const COLUMN_SEPARATOR = '|';

const USER_TURN_PROMPT = 'Select the row and column of your next choice as "rowNum columNum"';
const PLAY_AGAIN_PROMPT = 'Play again? y / n';
const TERMINATE_SESSION_MESSAGE = 'Ending session. Thanks for playing!';

const displayInvalidTurnMessage = (userInput) => console.log(`User made invalid selection ${userInput}`);
const displayValidTurnMessage = (playerName, Input) => console.log(`${playerName} selected ${computerInput}`);
const displayOutcomeMessage = (winnerName) => {
  console.log(winnerName === 'draw' ? `Game was a draw!` : `${winnerName} won!`);
}

function ticTacToe() {
  const currentBoardState = [...DEFAULT_BOARD_STATE];
  displayBoard(currentBoardState);
  while (gameOutcome(currentBoardState) === 'undecided') {
    let userChoice = parseUserChoice(question(USER_TURN_PROMPT));
    while (!userChoiceIsValid(userChoice)) {
      displayInvalidTurnMessage(userChoice);
      userChoice = parseUserChoice(question(USER_TURN_PROMPT));
    }
    updateBoard(currentBoardState, userChoice);
    displayValidTurnMessage('user', userChoice);
    const computerChoice = makeComputerChoice(currentBoardState);
    updateBoard(currentBoardState, userChoice);
    displayValidTurnMessage('computer', computerChoice);
    displayBoard(currentBoardState);
  }
  displayOutcomeMessage(gameOutcome(currentBoardState));
  let playAgain = question(PLAY_AGAIN_PROMPT);
  while (playAgain !== 'y' || playAgain !== 'n') {
    playAgain = question(PLAY_AGAIN_PROMPT);
  }
  if (playAgain === 'y') {
    ticTacToe();
  } else {
    console.log(TERMINATE_SESSION_MESSAGE);
  }
}

ticTacToe();

/**
 * Given a board state, output it to the console line by line
 */
function displayBoard(boardState) {
  const toFormattedRow = (rowArr) => {
    const [a, b, c] = rowArr;
    return `|${a}|${b}|${c}|`;
  }
  const formattedRows = boardState.map(row => toFormattedRow(row));
  console.log('Updated board');
  formattedRows.forEach(row => console.log(row));
  console.log(''); // to make a space
  // |X|O|X|
  // |X|O|X|
  // |X|O|X|
}

/**
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

function winningTripletFound(boardState) {
  const validTriplets = getValidTriplets();

  const winningTriplets = validTriplets.filter((triplet) => {
    const tripletCells = triplet.map(cellIndices => {
      const [i, j] = cellIndices;
      return boardState[i][j];
    });
    const filledCells = tripletCells.filter(cell => cell !== ' ');
    const uniqueValues = new Set(filledCells);
    console.log({tripletCells, filledCells, uniqueValues: [...uniqueValues]})
    return filledCells.length === 3 && uniqueValues.size === 1;
  });

  const winnerName = winningTriplets[0].reduce((winner, currentCellCoords) => {
    const cellValue = boardState[currentCellCoords[0]][currentCellCoords[1]];
    winner = cellValue === USER_SHAPE ? 'user' : 'computer';
    return winner;
  }, '');
  return [winningTriplets.length > 0, winnerName];
}

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
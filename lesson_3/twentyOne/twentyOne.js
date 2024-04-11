/* eslint-disable no-console */
const { question } = require('readline-sync');
const constants = require('./constants.json');

const DEFAULT_DECK = constants.SUITS
  .map((suit) => constants.CARD_NAMES.map((card) => ({ name: card, suit })))
  .flat();

/**
 * Return the index of a card in the passed deck
 */
const randomCardIndex = (deck) => Math.floor(Math.random() * deck.length);
/**
 * Format a card object {name, suit} as a string "<name> of <suit>"
 */
const formattedCard = (card) => `${card.name} of ${card.suit}`;
/** status: done
 * Prompt the user for input.
 * Reprompts the user until they provide input that passes the condition in the validation callback
 * @param {string} prompt
 * @param {function} promptCallback
 * @param {string} invalidInputMessage
 * @param {function} inputValidationCallback
 * @returns valid user input
 */
function getValidInput(prompt, promptCallback, invalidInputMessage, inputValidationCallback) {
  const defaultInvalidInputMessage = 'Invalid selection';
  let userInput = promptCallback(prompt);
  while (!inputValidationCallback(userInput)) {
    console.log(`${invalidInputMessage ?? defaultInvalidInputMessage} ${userInput}`);
    userInput = promptCallback('Try again: ');
  }
  return userInput;
}
/** status: done
 * Return a shuffled version of the default deck
 */
function newShuffledDeck() {
  const newFullDeck = JSON.parse(JSON.stringify(DEFAULT_DECK));
  for (let i = 0; i < constants.SHUFFLE_ITERATIONS; i += 1) {
    const removedCard = newFullDeck.splice(randomCardIndex(newFullDeck), 1)[0];
    newFullDeck.splice(randomCardIndex(newFullDeck), 0, removedCard);
  }
  return newFullDeck;
}

/** status: dev
 * todo: revise ace scoring to change retroactively (just score aces after all others)
 *
 */
function getScore(hand) {
  const cardPoints = {
    number: (name) => Number(name),
    royal: () => constants.ROYAL_CARD_POINTS,
    ace: (total) => (total + 11 <= 21 ? 11 : 1),
  };
  // console.log({hand})
  const acesLast = hand.sort((a, b) => Number(b.name !== 'Ace') - 0.5);
  const score = acesLast.reduce((total, card) => {
    let cardValue = 0;
    const isNumberCard = !Number.isNaN(Number(card.name));
    if (isNumberCard) cardValue = cardPoints.number(card.name);
    const isRoyalCard = ['Jack', 'Queen', 'King'].includes(card.name);
    if (isRoyalCard) cardValue = cardPoints.royal();
    const isAce = !isNumberCard && !isRoyalCard;
    if (isAce) cardValue = cardPoints.ace(total);
    return total + cardValue;
  }, 0);
  // console.log({score})
  return score;
}
/** status: testing
 * Convert a player's hand from an array of card objects
 * to a string of the form "x of <suit>, y of <suit>, and z <of suit>"
 */
function formatHandAsString(hand) {
  const formattedCards = hand.map(formattedCard);
  switch (hand.length) {
    case 0:
      return 'no cards';
    case 1:
      return hand.map(formattedCard)[0];
    case 2:
      return hand.map(formattedCard).join(' and ');
    default:
      formattedCards[formattedCards.length - 1] = `and ${formattedCards[formattedCards.length - 1]}`;
      return formattedCards.join(', ');
  }
  // if there are two cards, join them with " and "
  // if there is one card, access it with [0] - maybe unnecessary
  // if there are three or more cards, prepend "and" to the last one and join them with ", "
}
/** status: testing
 * log all player cards and one dealer card to the console
 */
function displayCards(gameState, dealerCardsToShow = 1) {
  const playerHandStr = formatHandAsString(gameState.playerHand);
  console.log(`Player hand: ${playerHandStr}`);
  let dealerHandStr = formatHandAsString(gameState.dealerHand.slice(0, dealerCardsToShow));
  const hiddenDealerCardCount = Math.max(gameState.dealerHand.length - dealerCardsToShow, 0);
  if (hiddenDealerCardCount > 0) {
    dealerHandStr = dealerHandStr.replace('and', '');
    dealerHandStr += ` and ${hiddenDealerCardCount} hidden card${hiddenDealerCardCount > 1 ? 's' : ''}`;
  }
  console.log(`Dealer hand: ${dealerHandStr}`);
}
/** status: testing
 * decide the outcome of the game based on player scores
 */
function resolveGame(gameState) {
  console.log(constants.GAME_OUTCOME_HEADER);
  const playerScore = getScore(gameState.playerHand);
  const dealerScore = getScore(gameState.dealerHand);
  displayCards(gameState, Infinity);
  const scoreString = `Player score: ${playerScore}. Dealer score: ${dealerScore}.`;
  console.log(scoreString);
  if (playerScore > 21) console.log(`Player busted. ${constants.DEALER_WIN_MESSAGE}`);
  else if (dealerScore > 21) console.log(`Dealer busted. ${constants.PLAYER_WIN_MESSAGE}`);
  else if (playerScore > dealerScore) console.log(constants.PLAYER_WIN_MESSAGE);
  else if (dealerScore > playerScore) console.log(constants.DEALER_WIN_MESSAGE);
  else console.log(constants.GAME_DRAW_MESSAGE);
}
/** status: to be tested
 * Offer the player the option to hit or stay while their score is 21 or lower.
 * End the game in a dealer win if the player's score exceeds 21
 */
function playerTurn(gameState) {
  while (getScore(gameState.playerHand) < constants.MINIMUM_BUST_SCORE) {
    const userInputValidator = (userInput) => ['hit', 'stay'].includes(userInput.toLowerCase());
    const playerChoice = getValidInput(
      constants.USER_TURN_PROMPT,
      question,
      constants.INVALID_TURN_MESSAGE,
      userInputValidator,
    );
    if (playerChoice === 'stay') break;
    const cardDrawn = gameState.deck.shift();
    gameState.playerHand.push(cardDrawn);
    console.log(`Player drew ${formattedCard(cardDrawn)}`);
  }
}
/** status: to be tested
 * Hit until the dealer's score is 17 or higher. End the game if dealer busts.
 */
function dealerTurn(gameState) {
  while (getScore(gameState.dealerHand) < constants.DEALER_STAY_SCORE) {
    gameState.dealerHand.push(...gameState.deck.splice(0, 1));
  }
}
/** status: done
 * Set up a shuffled deck and deal cards
 */
function initializeGame() {
  const deck = newShuffledDeck();
  const playerHand = deck.splice(randomCardIndex(deck), 2);
  const dealerHand = deck.splice(randomCardIndex(deck), 2);
  return {
    deck,
    playerHand,
    dealerHand,
  };
}
/**
 * Main game loop
 */
function twentyOne() {
  while (true) {
    const gameState = initializeGame();
    console.log(constants.GAME_INITIALIZED_MESSAGE);
    displayCards(gameState);
    playerTurn(gameState);
    const playerBusted = getScore(gameState.playerHand) >= constants.MINIMUM_BUST_SCORE;
    if (!playerBusted) dealerTurn(gameState);
    resolveGame(gameState);
    const playAgain = getValidInput(constants.PLAY_AGAIN_PROMPT, question, undefined, (userInput) => ['y', 'n'].includes(userInput.toLowerCase()));
    if (playAgain === 'n') {
      console.log(constants.TERMINATE_SESSION_MESSAGE);
      break;
    }
  }
}

twentyOne();

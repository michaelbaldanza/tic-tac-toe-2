/*----- constants -----*/
const xWins = 'XXX';
const oWins = 'OOO';

/*----- app's state (variables) -----*/
let board = [
  ['top-left', 'top-middle', 'top-right'],
  ['center-left', 'center-middle', 'center-right'],
  ['bottom-left', 'bottom-middle', 'bottom-right'],
];

let currentPlayer = 'X';
let prevPlayer = 'O';

let turn = 1;
let turnCounter = 1;

let winner = '';

/*----- cached element references -----*/
const topLeftEl = document.getElementById('top-left');
const topMiddleEl = document.getElementById('top-middle');
const topRightEl = document.getElementById('top-right');
const centerLeftEl = document.getElementById('center-left');
const centerMiddleEl = document.getElementById('center-middle');
const centerRightEl = document.getElementById('center-right');
const bottomLeftEl = document.getElementById('bottom-left');
const bottomMiddleEl = document.getElementById('bottom-middle');
const bottomRightEl = document.getElementById('bottom-right');

const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

/*----- event listeners -----*/
topLeftEl.addEventListener('click', takeTurn);
topMiddleEl.addEventListener('click', takeTurn);
topRightEl.addEventListener('click', takeTurn);
centerLeftEl.addEventListener('click', takeTurn);
centerMiddleEl.addEventListener('click', takeTurn);
centerRightEl.addEventListener('click', takeTurn);
bottomLeftEl.addEventListener('click', takeTurn);
bottomMiddleEl.addEventListener('click', takeTurn);
bottomRightEl.addEventListener('click', takeTurn);

resetBtn.addEventListener('click', reset);

/*----- functions -----*/
function takeTurn(evt) {
  turnCounter += 0.5;
  const selectedSquare = evt.target;
  updateBoard(selectedSquare.id);
  checkWinningCondition();
  updateView(selectedSquare);
  changePlayer();
}

function changePlayer() {
  turn *= -1;
  if (turn === 1) {
    currentPlayer = 'X';
    prevPlayer = 'O';
  }
  if (turn === -1) {
    currentPlayer = 'O';
    prevPlayer = 'X';
  }
}

function updateBoard(square) {
  for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[x].length; y++) {
      if (board[x][y] === square) {
        board[x][y] = currentPlayer;
      }
    }
  }
}

function checkWinningCondition() {
  console.log(board[0][0], board[0][1], board[0][2]);
  if (
    // horizontal
    board[0][0] === board[0][1] && board[0][1] === board[0][2] ||
    board[1][0] === board[1][1] && board[1][1] === board[1][2] ||
    board[2][0] === board[2][1] && board[2][1] === board[2][2] ||
    // vertical
    board[0][0] === board[1][0] && board[1][0] === board[2][0] ||
    board[0][1] === board[1][1] && board[1][1] === board[2][1] ||
    board[0][2] === board[1][2] && board[1][2] === board[2][2] ||
    // diagonal
    board[0][0] === board[1][1] && board[1][1] === board[2][2] ||
    board[0][2] === board[1][1] && board[1][1] === board[2][0]
  ) {
    winner = currentPlayer
    rmvEvtListeners();
  }
}

function updateView(square) {
  square.textContent = currentPlayer;
  square.removeEventListener('click', takeTurn);
  square.setAttribute('listener', 'false');
  if (winner === currentPlayer){
    messageEl.textContent = `${currentPlayer} WINS`;
    return;
  }
  messageEl.textContent = `${prevPlayer} TAKE YOUR TURN`;
}

function reset() {
  board = [
    ['top-left', 'top-middle', 'top-right'],
    ['center-left', 'center-middle', 'center-right'],
    ['bottom-left', 'bottom-middle', 'bottom-right'],
  ];
  currentPlayer = 'X';
  prevPlayer = 'O';
  turn = 1;
  turnCounter = 1;
  winner = '';
  messageEl.textContent = 'X GOES FIRST';
  eventListenerReset();
  boardReset();
}

function eventListenerReset() {
  if (topLeftEl.getAttribute('listener') !== 'true') {
    topLeftEl.addEventListener('click', takeTurn);
    topLeftEl.setAttribute('listener','true');
  }
  if (topMiddleEl.getAttribute('listener') !== 'true') {
    topMiddleEl.addEventListener('click', takeTurn);
    topMiddleEl.setAttribute('listener','true');
  }
  if (topRightEl.getAttribute('listener') !== 'true') {
    topRightEl.addEventListener('click', takeTurn);
    topRightEl.setAttribute('listener','true');
  }
  if (centerLeftEl.getAttribute('listener') !== 'true') {
    centerLeftEl.addEventListener('click', takeTurn);
    centerLeftEl.setAttribute('listener','true');
  }
  if (centerMiddleEl.getAttribute('listener') !== 'true') {
    centerMiddleEl.addEventListener('click', takeTurn);
    centerMiddleEl.setAttribute('listener','true');
  }
  if (centerRightEl.getAttribute('listener') !== 'true') {
    centerRightEl.addEventListener('click', takeTurn);
    topLeftEl.setAttribute('listener','true');
  }
  if (bottomLeftEl.getAttribute('listener') !== 'true') {
    bottomLeftEl.addEventListener('click', takeTurn);
    bottomLeftEl.setAttribute('listener','true');
  }
  if (bottomMiddleEl.getAttribute('listener') !== 'true') {
    bottomMiddleEl.addEventListener('click', takeTurn);
    bottomMiddleEl.setAttribute('listener','true');
  }
  if (bottomRightEl.getAttribute('listener') !== 'true') {
    bottomRightEl.addEventListener('click', takeTurn);
    bottomRightEl.setAttribute('listener','true');
  }
}

function boardReset() {
  topLeftEl.textContent = '';
  topMiddleEl.textContent = '';
  topRightEl.textContent = '';
  centerLeftEl.textContent = '';
  centerMiddleEl.textContent = '';
  centerRightEl.textContent = '';
  bottomLeftEl.textContent = '';
  bottomMiddleEl.textContent = '';
  bottomRightEl.textContent = '';
}

function rmvEvtListeners() {
  topLeftEl.removeEventListener('click', takeTurn);
  topMiddleEl.removeEventListener('click', takeTurn);
  topRightEl.removeEventListener('click', takeTurn);
  centerLeftEl.removeEventListener('click', takeTurn);
  centerMiddleEl.removeEventListener('click', takeTurn);
  centerRightEl.removeEventListener('click', takeTurn);
  bottomLeftEl.removeEventListener('click', takeTurn);
  bottomMiddleEl.removeEventListener('click', takeTurn);
  bottomRightEl.removeEventListener('click', takeTurn);
}
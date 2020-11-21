/*----- app's state (variables) -----*/

let board = [
  ['top-left', 'top-middle', 'top-right'],
  ['center-left', 'center-middle', 'center-right'],
  ['bottom-left', 'bottom-middle', 'bottom-right'],
];

let currentPlayer = '';
let prevPlayer = '';

let turn = 0;

let winner = '';

let xScore = 0;
let oScore = 0;


/*----- cached element references -----*/

// get array of board squares
const squareEls = document.querySelectorAll('div.square');

const resetBtn = document.getElementById('reset-btn');

const messageEl = document.getElementById('message');
const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');


/*----- event listeners -----*/

// add event listeners to squares
squareEls.forEach(function (squareEl) {
  squareEl.addEventListener('click', takeTurn);
});

resetBtn.addEventListener('click', reset);


/*----- functions -----*/

init();

function init() {
  // initialize state
  currentPlayer = 'X';
  prevPlayer = 'O';
  turn = -1;
  // initialize view
  xScoreEl.textContent = xScore;
  oScoreEl.textContent = oScore;
  messageEl.textContent = 'X GOES FIRST';
}



function takeTurn(evt) {
  const selectedSquare = evt.target;
  updateState(selectedSquare.id);
  render(selectedSquare);
}

function updateState(square) {
  changePlayer();
  updateBoard(square);
  checkWinningCondition();
  checkTieCondition();
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
    if (winner === 'X') {
      xScore += 1;
    }
    if (winner === 'O') {
      oScore += 1;
    }
  }
}

function checkTieCondition() {
  if (winner !== '') return;
  let fullBoard = 0;
  board.forEach(function (row) {
    row.forEach(function (square) {
      if (square === 'X' || square === 'O') {
        fullBoard += 1;
      }
    });
  });
  if (fullBoard === 9) {
    winner = 'none';
  }
}

function render(square) {
  square.textContent = currentPlayer;
  square.removeEventListener('click', takeTurn);
  square.setAttribute('listener', 'false');
  winner !== '' ?
    endGame() : messageEl.textContent = `${prevPlayer} TAKE YOUR TURN`;
}

function endGame() {
  removeEventListeners();
  displayOutcome();
}

function removeEventListeners() {
  squareEls.forEach(function(squareEl) {
    squareEl.removeEventListener('click', takeTurn);
  });
  squareEls.forEach(function(squareEl) {
    squareEl.setAttribute('listener', 'false');
  });
}

function displayOutcome() {
  if (winner === currentPlayer){
    messageEl.textContent = `${currentPlayer} WINS`;
    if (winner === 'X') {
      xScoreEl.textContent = `${xScore}`;
    }
    if (winner === 'O') {
      oScoreEl.textContent = `${oScore}`;
    }
    return;
  }
  if (winner === 'none') {
    messageEl.textContent = `CAT'S GAME`;
    return;
  }
};

function reset() {
  // reset state
  board = [
    ['top-left', 'top-middle', 'top-right'],
    ['center-left', 'center-middle', 'center-right'],
    ['bottom-left', 'bottom-middle', 'bottom-right'],
  ];
  currentPlayer = 'X';
  prevPlayer = 'O';
  turn = -1;
  winner = '';
  // reset view
  messageEl.textContent = 'X GOES FIRST';
  resetEventListeners();
  resetSquareEls();
}

function resetEventListeners() {
  // add event listeners back
  squareEls.forEach(function(squareEl) {
    if (squareEl.getAttribute('listener') !== 'true') {
      squareEl.addEventListener('click', takeTurn);
      squareEl.setAttribute('listener', 'true');
    }
  });
}

function resetSquareEls() {
  // clear X's and O's from the board
  squareEls.forEach(function(squareEl) {
    squareEl.textContent = '';
  });
}
/*----- constants -----*/


/*----- app's state (variables) -----*/
let board = [
  [[''],[''],['']],
  [[''],[''],['']],
  [[''],[''],['']],
];

let currentPlayer = 'X';

let turn = 1;

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


/*----- functions -----*/
function takeTurn(evt) {
  evt.target.textContent = currentPlayer;
  turn *= -1;
  changePlayer();
}

function changePlayer() {
  if (turn === 1) {
    currentPlayer = 'X';
  }
  if (turn === -1) {
    currentPlayer = 'O';
  }
}
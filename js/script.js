//! Global variables
// Win cases
const winCases = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7]
]
// Array to store user input
const userInput = ['', '', '', '', '', '', '', '', '']
// Player details
const player_1 = {
  symbol: 'X',
  name: ''
}
const player_2 = {
  symbol: 'O',
  name: ''
}
// Current status
let currentTurn = player_1
// Select all the boxes of the board
const boxes = document.querySelectorAll('td')
// Select player button
const cont = document.getElementById('continue')
// Game board
const board = document.getElementById('board')
// Player popup box
const player_popup = document.getElementById('player-popup')
// Display turn
const turn = document.getElementById('turn')
// Result container
const result = document.getElementById('result')
const result_content = document.getElementById('result-content')

//! Utility functions
const checkWinner = symbol => {
  for (let winCase of winCases) {
    if (
      userInput[winCase[0] - 1] !== '' &&
      userInput[winCase[0] - 1] === userInput[winCase[1] - 1] &&
      userInput[winCase[0] - 1] === userInput[winCase[2] - 1]
    ) {
      return true
    }
  }
  return false
}

const runGame = event => {
  const box = event.target
  const boxIndex = Array.from(boxes).findIndex(b => {
    return b === box
  })
  userInput[boxIndex] = currentTurn.symbol
  box.textContent = currentTurn.symbol
  if (currentTurn.symbol === 'X') box.style.color = '#545454'
  else box.style.color = '#F2EBD3'
  if (!checkWinner()) {
    currentTurn = currentTurn === player_1 ? player_2 : player_1
    if (userInput.indexOf('') === -1) {
      // Tie
      const h1 = document.createElement('h1')
      const span1 = document.createElement('span')
      span1.textContent = 'X'
      span1.style.color = '#545454'
      h1.appendChild(span1)
      const span2 = document.createElement('span')
      span2.textContent = 'O'
      span2.style.color = '#cec7b1'
      h1.style.fontSize = '4em'
      h1.appendChild(span2)
      result_content.appendChild(h1)
      const h2 = document.createElement('h2')
      h2.textContent = "It's a draw"
      h2.style.color = '#545454'
      result_content.appendChild(h2)
      turn.textContent = 'Game Over !'
      board.style.display = 'none'
      result.style.display = 'block'
    } else {
      turn.textContent =
        "It's " + currentTurn.name + "'s (" + currentTurn.symbol + ') turn'
    }
  } else {
    // Won
    const h1 = document.createElement('h1')
    h1.textContent = currentTurn.name + ' won!'
    h1.style.fontSize = '2em'
    result_content.appendChild(h1)
    turn.textContent = 'Game Over !'
    board.style.display = 'none'
    result.style.display = 'block'
  }
  box.removeEventListener('click', runGame)
}

//! Event Listenter
boxes.forEach(element => {
  element.addEventListener('click', runGame)
})

cont.addEventListener('click', event => {
  event.preventDefault()
  const p1 = document.getElementById('player1').value
  const p2 = document.getElementById('player2').value
  console.log(p1)
  player_1.name = p1 !== '' ? p1 : 'Player 1'
  player_2.name = p2 !== '' ? p2 : 'Player 2'
  player_popup.style.display = 'none'
  turn.textContent =
    "It's " + currentTurn.name + "'s (" + currentTurn.symbol + ') turn'
  board.style.display = 'block'
})

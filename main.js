// VARIABLES //
var classicChoice = document.querySelector('#classic')
var homeView = document.querySelector('#home-view')
var playClassicOptions = document.querySelector('#classic-options')
var playerOne = document.querySelector('.human')
var playerTwo = document.querySelector('.comp')
var changeGameBtn = document.querySelector('.change-game')

var human = createPlayer('Human', `assets/neutral.png`)
var computer = createPlayer('Computer', `assets/comp-neutral.png`)
var currentGame;

// EVENT LISTENERS //
classicChoice.addEventListener('click', playClassic)

window.onload = function() {
    setMatch(human, computer)
}

// EVENT HANDLERS //
function playClassic() {
    homeView.classList.add('hidden')
    playClassicOptions.classList.remove('hidden')
}

function setMatch(player1, player2){
    playerOne.innerHTML = `
        <img src="${player1.token}" class="player-icons" alt="${player1.name} Icon">
        <h4>${player1.name}</h4>
        <p>Wins: ${player1.wins}</p>`
    playerTwo.innerHTML = `
        <img src="${player2.token}" class="player-icons" alt="${player2.name} Icon">
        <h4>${player2.name}</h4>
        <p>Wins: ${player2.wins}</p>`
}

// OTHER FUNCTIONS //
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function createPlayer(name, token) {
    var player = {
        name,
        token,
        wins: 0,
    }
    return player;
}

function createGame(player1, player2) {
    var newGame = {
        players: [player1, player2],
        type: type? 'classic' : 'elemental',
    }
    currentGame = newGame
    return newGame;
}

function takeTurn() {

}

// A separate function to check the game’s board data for win conditions
function winConditions() {

}
// A separate function to detect when a game is a draw (no one has won)
function draw() {

}
// A separate function to reset the game’s board to begin a new game
function resetGame() {

}
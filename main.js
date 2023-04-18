// VARIABLES //
var classicChoice = document.querySelector('#classic')
var homeView = document.querySelector('#home-view')
var playClassicOptions = document.querySelector('#classic-options')


// EVENT LISTENERS //
classicChoice.addEventListener('click', playClassic)


// EVENT HANDLERS //
function playClassic() {
    homeView.classList.add('hidden')
    playClassicOptions.classList.remove('hidden')
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

function takeTurn() {

}

function createGame() {
    //should return a game object containing:
        // Two Player objects (player1 and player2)
        // A way to keep track of the data for the game board
        // A way to keep track of the selected game type
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
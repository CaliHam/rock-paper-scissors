// VARIABLES //
var classicChoice = document.querySelector('#classic')
var elementChoice = document.querySelector('#elemental')
var homeView = document.querySelector('#home-view')
var playClassicOptions = document.querySelector('#classic-options')
var playElementalOptions = document.querySelector('#elemental-options')
var playerOne = document.querySelector('.human')
var playerTwo = document.querySelector('.comp')
var changeGameBtn = document.querySelector('.change-game')
var userChoice = document.querySelectorAll('.choice')
var title = document.querySelector('.header2')

var currentGame = createGame(createPlayer('Human', `assets/neutral.png`), createPlayer('Computer', `assets/comp-neutral.png`))
var human = currentGame.players[0]
var computer = currentGame.players[1]

// EVENT LISTENERS //
classicChoice.addEventListener('click', playClassic)
elementChoice.addEventListener('click', playElemental)
changeGameBtn.addEventListener('click', changeGame)

userChoice.forEach((element) => element.addEventListener('click', function(e) {
    takeTurn(human, e)
    takeTurn(computer)
    pickWinner(human, computer)
}));

window.onload = function() {
    setMatch(human, computer)
}

// EVENT HANDLERS //
function playClassic() {
    homeView.classList.add('hidden')
    playClassicOptions.classList.remove('hidden')
    currentGame.type = 'classic';
}

function playElemental() {
    homeView.classList.add('hidden')
    playElementalOptions.classList.remove('hidden')
    currentGame.type = 'elemental';
}

function changeGame() {
    homeView.classList.remove('hidden')
    playElementalOptions.classList.add('hidden')
    playClassicOptions.classList.add('hidden')
    changeGameBtn.classList.add('hidden')
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
        choice: null,
    }
    return player;
}

function createGame(player1, player2) {
    var newGame = {
        players: [player1, player2],
        type: null,
        winConditions: {
            classic: [['rock', 'scissors'],['scissors', 'paper'],['paper', 'rock']],
            elemental: [['cryo', 'hydro', 'electro'],['hydro', 'pyro', 'geo'],['geo', 'pyro', 'cryo'],['pyro', 'cryo', 'electro'],['electro', 'geo', 'hydro']]
        },
        options: {
          classic: ['rock', 'paper', 'scissors'],
          elements: ['cryo', 'pyro', 'electro', 'geo', 'hydro']
        }
    }
    return newGame;
}

function takeTurn(player, event) {
    if (event){
        var userChoice = event.target.alt
        player.choice = userChoice
    } else {
        var i = getRandomIndex(currentGame.options[currentGame.type])
        player.choice = currentGame.options[currentGame.type][i]
    }
    return player;
}

function pickWinnerClassic(player1, player2) {
    draw(player1, player2)
        for (var i = 0; i < currentGame.winConditions.classic.length; i++) {
            if (player1.choice === currentGame.winConditions.classic[i][0] && player2.choice === currentGame.winConditions.classic[i][1]) {
            player1.wins += 1
            showResult(player1, player2)
        } 
        else if (player2.choice === currentGame.winConditions.classic[i][0] && player1.choice === currentGame.winConditions.classic[i][1]) {
            player2.wins += 1
            showResult(player2, player1)
        }
    }
}

function draw(player1, player2) {
    if (player1.choice === player2.choice) {
        showResult(player1)
    }
    else {
        return;
    }
}

function resetGame() {
    human.token = `assets/neutral.png`
    computer.token = `assets/comp-neutral.png`
    setMatch(human, computer)
    playClassicOptions.innerHTML = `
        <h2 class="header2">Choose your character!</h2>
        <section class="classic-options-box">
            <img src="assets/happy-rock.png" class="choice" alt="rock">
            <img src="assets/happy-paper.png" class="choice" alt="paper">
            <img src="assets/happy-scissors.png" class="choice" alt="scissors">
        </section>`
    resetChoices()
    changeGameBtn.classList.remove('hidden')
}

function resetChoices() {
    var userChoice = document.querySelectorAll('.choice')
    userChoice.forEach((element) => element.addEventListener('click', function(e) {
        takeTurn(human, e)
        takeTurn(computer)
        pickWinnerClassic(human, computer)
    }));
}

function showResult(playerWin, playerLose) {
    if (playerWin, playerLose){
        playClassicOptions.innerHTML = `
        <h2 class="header2">${playerWin.name} won this round!</h2>
        <section class="classic-options-box">
            <img src="assets/happy-${human.choice}.png" class="choice" alt="rock">
            <img src="assets/happy-${computer.choice}.png" class="choice" alt="paper">
        </section>`
    } else {
        playClassicOptions.innerHTML = `
        <h2 class="header2">It's a draw!</h2>
        <section class="classic-options-box">
            <img src="assets/happy-${playerWin.choice}.png" class="choice" alt="rock">
            <img src="assets/happy-${playerWin.choice}.png" class="choice" alt="paper">
        </section>`
    }
    emote(playerWin, playerLose)
    setMatch(human, computer)
    setTimeout(() => {
        resetGame();
    }, 1500);
}

function emote(playerWin, playerLose) {
    if (playerLose === computer){
        playerWin.token = `assets/grin.png`
        playerLose.token = `assets/comp-dull.png`
    } else if (playerLose === human){
        playerWin.token = `assets/comp-happy.png`
        playerLose.token = `assets/sob.png`
    } else {
        human.token = `assets/sob.png`
        computer.token = `assets/comp-dull.png`
    }
}
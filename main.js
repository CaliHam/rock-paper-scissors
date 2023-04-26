// VARIABLES //
var classicChoice = document.querySelector('#classic')
var elementChoice = document.querySelector('#elemental')
var homeView = document.querySelector('#home-view')
var gameOptions = document.querySelector('#game-options')
var playerOne = document.querySelector('.human')
var playerTwo = document.querySelector('.comp')
var changeGameBtn = document.querySelector('.change-game')
var userChoice = document.querySelectorAll('.choice')
var title = document.querySelector('.header2')
var gameHistory = document.querySelector('.game-log')
var pastChoices = document.querySelector('.choices-log')
var username = document.querySelector('.username')
var submit = document.querySelector('.submit')
var loginPage = document.querySelector('.login')
var logout = document.querySelector('.logout')
var userError = document.querySelector('.error')

var currentGame = createGame(createPlayer('Human', `assets/neutral.png`), createPlayer('Computer', `assets/comp-neutral.png`))
var human, computer
var games = [];

// EVENT LISTENERS //
classicChoice.addEventListener('click', function() {
    playClassic(human, computer, currentGame)
})
elementChoice.addEventListener('click', function() {
    playElemental(human, computer, currentGame)
})
changeGameBtn.addEventListener('click', changeGame)
submit.addEventListener('click', function(event) {
    event.preventDefault() 
    login()
})
logout.addEventListener('click', logoutUser)

window.onload = function() {
    if (!getFromStorage('games')) {
        localStorage.setItem('games', JSON.stringify(games))
    }
}

function login(){
    if (username.value === ""){
        userError.innerText = 'Please enter your name.'
        return;
    } else {
        saveUser('games', currentGame)
        human = currentGame.players[0]
        computer = currentGame.players[1]
        homeView.classList.remove('hidden')
        logout.classList.remove('hidden')
        loginPage.classList.add('hidden')
    }
}

function logoutUser() {
    location.reload();
}

function resetChoices(human, computer, currentGame) {
    var userChoice = document.querySelectorAll('.choice')
    userChoice.forEach((element) => element.addEventListener('click', function(e) {
        takeTurn(human, e)
        takeTurn(computer)
        pickWinnerGame(human, computer, currentGame)
    }));
}

// EVENT HANDLERS //
function playClassic(human, computer, currentGame) {
    homeView.classList.add('hidden')
    gameOptions.classList.remove('hidden')
    resetClassic()
    currentGame.type = 'classic';
    resetChoices(human, computer, currentGame)
}

function playElemental(human, computer, currentGame) {
    homeView.classList.add('hidden')
    gameOptions.classList.remove('hidden')
    resetElemental()
    currentGame.type = 'elements';
    resetChoices(human, computer, currentGame)
}

function changeGame() {
    homeView.classList.remove('hidden')
    gameOptions.classList.add('hidden')
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

// Local Storage//

function saveUser(key, thisGame) {
    var allGames = getFromStorage(key)
    thisGame.players[0].name = username.value;
    var foundGame = allGames.find((game) => game.players[0].name.toLowerCase() === thisGame.players[0].name.toLowerCase())
    if (!foundGame) {
        allGames.push(thisGame)
        localStorage.setItem(key, JSON.stringify(allGames))
    } else {
        currentGame = foundGame
    }
    currentGame.players[0].token = `assets/neutral.png`
    currentGame.players[1].token = `assets/comp-neutral.png`
    setMatch(currentGame.players[0], currentGame.players[1])
}

function saveWins(key, thisGame) {
    var allGames = getFromStorage(key)
    var foundGame = allGames.find((game) => game.players[0].name === thisGame.players[0].name)
    var i = allGames.indexOf(foundGame)
    allGames.splice(i, 1, thisGame)
    localStorage.setItem(key, JSON.stringify(allGames))
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}


// Play Game //
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

function pickWinnerGame(player1, player2, currentGame) {
    if (currentGame.type === 'classic'){
        pickWinnerClassic(player1, player2, currentGame)
    } else {
        pickWinnerElemental(player1, player2, currentGame)
    }
}

function pickWinnerClassic(player1, player2, currentGame) {
    draw(player1, player2)
    for (var i = 0; i < currentGame.winConditions.classic.length; i++) {
        if (player1.choice === currentGame.winConditions.classic[i][0] && player2.choice === currentGame.winConditions.classic[i][1]) {
            player1.wins += 1
            showResult(player1, player2)
            saveWins('games', currentGame)
        } 
        else if (player2.choice === currentGame.winConditions.classic[i][0] && player1.choice === currentGame.winConditions.classic[i][1]) {
            player2.wins += 1
            showResult(player2, player1)
            saveWins('games', currentGame)
        }
    }
}

function pickWinnerElemental(player1, player2, currentGame) {
    draw(player1, player2)
    for (var i = 0; i < currentGame.winConditions.elemental.length; i++) {
        if (player1.choice === currentGame.winConditions.elemental[i][0] && 
            (player2.choice === currentGame.winConditions.elemental[i][1] || player2.choice === currentGame.winConditions.elemental[i][2])) {
            player1.wins += 1
            showResult(player1, player2)
            saveWins('games', currentGame)
        } 
        else if (player2.choice === currentGame.winConditions.elemental[i][0] && 
            (player1.choice === currentGame.winConditions.elemental[i][1] || player2.choice === currentGame.winConditions.elemental[i][2])) {
            player2.wins += 1
            showResult(player2, player1)
            saveWins('games', currentGame)
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

function resetClassic() {
    gameOptions.innerHTML = `
    <h1>Rock, Paper, Scissors</h1>
    <h2 class="header2">Choose your character!</h2>
    <section class="classic-options-box">
        <img src="assets/rock.png" class="choice" alt="rock">
        <img src="assets/paper.png" class="choice" alt="paper">
        <img src="assets/scissors.png" class="choice" alt="scissors">
    </section>`
}

function resetElemental() {
    gameOptions.innerHTML = `
    <h1>Rock, Paper, Scissors</h1>
    <h2 class="header2">Choose your element!</h2>
    <section class="element-options-box">
        <img src="assets/Cryo.png" class="choice" alt="cryo">
        <img src="assets/Electro.png" class="choice" alt="electro">
        <img src="assets/Geo.png" class="choice" alt="geo">
        <img src="assets/Pyro.png" class="choice" alt="pyro">
        <img src="assets/Hydro.png" class="choice" alt="hydro">
    </section>`
}

function resetGame() {
    human.token = `assets/neutral.png`
    computer.token = `assets/comp-neutral.png`
    setMatch(human, computer)
    if (currentGame.type === 'classic'){
        resetClassic()
    } else {
        resetElemental()
    }
    resetChoices(human, computer, currentGame)
    changeGameBtn.classList.remove('hidden')
}


function showResult(playerWin, playerLose) {
    if (playerWin, playerLose){
        gameOptions.innerHTML = `
        <h1>Rock, Paper, Scissors</h1>
        <h2 class="header2">${playerWin.name} won this round!</h2>
        <section class="win-box">
            <img src="assets/${human.choice}.png" class="choice show" alt="${human.choice}">
            <img src="assets/${computer.choice}.png" class="choice show" alt="${computer.choice}">
        </section>`
    } else {
        gameOptions.innerHTML = `
        <h1>Rock, Paper, Scissors</h1>
        <h2 class="header2">It's a draw!</h2>
        <section class="win-box">
            <img src="assets/${playerWin.choice}.png" class="choice show" alt="${playerWin.choice}">
            <img src="assets/${playerWin.choice}.png" class="choice show" alt="${playerWin.choice}">
        </section>`
    }
    emote(playerWin, playerLose)
    setMatch(human, computer)
    showGameHistory(human, computer)
    setTimeout(() => {
        resetGame();
    }, 2000);
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

function showGameHistory(human, computer) {
    gameHistory.classList.remove('hidden')
    pastChoices.innerHTML += 
    `<div class="players-choices">
        <img src="assets/${human.choice}.png" class="past-choice" alt="${human.choice}">
        <img src="assets/${computer.choice}.png" class="past-choice" alt="${computer.choice}">
    </div>`
    pastChoices.scrollTop = -pastChoices.scrollHeight;
}
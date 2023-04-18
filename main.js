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
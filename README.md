## Rock, Paper, Scissors... and more?

### Abstract
This Rock, Paper, Scissors site will allow a user to play two different game mode against a computer. The first mode is classic: rock, paper, scissors. The more difficult mode is elements, where the options are cryo, hydro, geo, electro, and pyro; taken from the popular RPG: Genshin Impact. The user will always pick their mode and character, and the computer's choice is randomized. Upon first load into the webpage, the user will be greeted with a log in page that will allow them to save their game and come back to continue. [Click here](https://caliham.github.io/rock-paper-scissors/) to visit the site!

### Installation Instructions
1. Fork this repository [here](https://github.com/CaliHam/rock-paper-scissors)
2. Clone down your new, forked repo
3. cd into the repository
4. Open it in your text editor
5. View the project in the browser by running open index.html in your terminal
 
### Preview of App
![RockPaperScissors](assets/Preview.gif)
### Context
I worked on this solo project with the help of my mentor over the course of a week. I am currently in my 4th and final week of Mod 1 at Turing.
### Contributors
- [Calli](https://github.com/CaliHam)

### Learning Goals
- Solidify and demonstrate understanding of:
    - DRY JavaScript
    - event delegation to handle similar event listeners
- Understand the difference between the data model and how the data is displayed on the DOM
- Use my problem solving process to break down large problems, solve things step by step, and trust myself to not rely on an outside “answer” to a logical challenge

### Wins & Challenges
#### Wins:
- I was able to complete the minimun requirement of the wepage after 3 days of work, leaving 4 days to complete extra features and help some classmates.
- I feel very proud of this project, even though it is not the dryest code. I am especially proud of the emote() function because I really wanted the players' icons to change on wins/loss.
- I am also proud of my functions being dynamic and that I was able to use some multiple times based on the arguments passed through.

#### Challenges:
- The biggest challenge was the login feature and saving the games to local storage. I procrastinated and saved this for last. In the future, I will be sure to use my time more wisely.
- I tried to think about 'scope' more in this project and use the least amount of global variables as possible; while this worked for the whole project, it broke when doing my login and local storage features. I had to refactor my of my functions to take in the global variables as parameters and arguements throughout my code for it to still function correctly.
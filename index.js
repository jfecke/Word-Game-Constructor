var Word = require("./word.js");
var fs = require("fs");
var inquirer = require("inquirer");
var word = null;
var guesses_left = 10;
const pageBreak = "------------------------------";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
var wordsPlayed = [];
var guessedLetters = [];

async function getWords() {
    var words = await fs.readFile("words.txt", "utf8", async function(err, data){
        if (err) {
            return console.log("there was an error")
        }
        wordArray = data.split(",");
        makeWord(wordArray)
    })
}

function makeWord(words) {
    var length = words.length;
    if (words.length == wordsPlayed.length) {
        wordsPlayed = [];   
    }
    var randomNumber = Math.floor(Math.random()*length);
    while (wordsPlayed.indexOf(randomNumber) >= 0) {
        randomNumber = Math.floor(Math.random()*length);
    }
    var wordChoice = words[randomNumber];
    wordsPlayed.push(randomNumber);
    word = new Word(wordChoice);
    console.log('\033[2J');
    playGame();
}

function startGame() {
    console.log('\033[2J');
    console.log(pageBreak);
    var myArg = inquirer.prompt([
        {
            type: "list",
            message: "Would you like to play a Word Guess Game? \n" + pageBreak,
            choices: ["Yes", "No"],
            name: "choice"
        }
    ]).then(function(response){
        if (response.choice == "Yes") {
            getWords();
        } else {
            console.log("Sorry to hear that. Good Bye!")
        }
    })
}

function playGame() {
    console.log(pageBreak); 
    console.log("Your word: " + word.getWord());
    console.log(pageBreak);
    let status = winCheck();
    if (status == "lose") {
        loseGame();
    }  else if (status == "win") {
        winGame();
    } else {
        console.log(pageBreak)
        var guessALetter = inquirer.prompt([
            {
                type: "input",
                message: "Please guess a Letter",
                name: "guess"
            }
        ]).then(function(response){
            var letter = response.guess.toLowerCase();
            if (alphabet.indexOf(letter) >= 0 && letter.length>0) {
                
                if (guessedLetters.indexOf(letter) < 0) {
                    guessedLetters.push(letter);
                    let isCorrect = word.guess(letter)
                    if (isCorrect) {
                        console.log('\033[2J');
                        console.log(pageBreak);
                        console.log("You guessed: " + letter);
                        console.log("Correct");
                        console.log("Guesses Remaining: "+ guesses_left);
                        console.log(pageBreak);
                        playGame();
                    } else {
                        console.log('\033[2J');
                        console.log(pageBreak);
                        console.log("You guessed: " + letter);
                        console.log("Sorry Try Again");
                        console.log("Guesses Remaining: "+ guesses_left);
                        console.log(pageBreak);
                        guesses_left--
                        playGame();
                    }
                } else {
                    console.log('\033[2J');
                    console.log(pageBreak);
                    console.log("You already guessed " + letter);
                    console.log("Guesses Remaining: "+ guesses_left);
                    console.log(pageBreak);
                    playGame();
                }

            } else {
                console.log('\033[2J');
                console.log(pageBreak);
                console.log("Please Enter a Single Letter!");
                console.log(pageBreak);
                playGame();
            }            
        })
    }
}

function winCheck() {
    var win = true;
    for (var i in word.letters) {
        if (word.letters[i].isGuessed == false) {
            win = false;
        }
    }
    if (guesses_left <= 0) {
        return "lose"
    }  else if (win == true) {
        return "win"
    } else {
        return "continue"
    }
}

function winGame() {
    console.log('\033[2J');
    console.log(pageBreak);
    console.log("You Win!");
    console.log(pageBreak);
    playAgain();
}

function loseGame() {
    console.log('\033[2J');
    console.log(pageBreak);
    console.log("You Lose!");
    console.log("The word was " + word.input);
    console.log(pageBreak);
    playAgain();
}   

function playAgain() {
    guesses_left = 10;
    guessedLetters = [];  
    var myArg = inquirer.prompt([
        {
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"],
            name: "choice"
        }
    ]).then(function(response){
        if (response.choice == "Yes") {
            getWords();
        } else {
            console.log("Sorry to hear that. Good Bye!")
        }
    })
}

startGame();
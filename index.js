var Word = require("./word.js");
var fs = require("fs");
var inquirer = require("inquirer");
var word = null;

async function getWords() {
    var words = await fs.readFile("words.txt", "utf8", async function(err, data){
        if (err) {
            return console.log("there was an error")
        }
        wordArray = data.split(",");
        getWord(wordArray)
    })
}

function getWord(words) {
    var length = words.length;
    var randomNumber = Math.floor(Math.random()*length);
    var wordChoice = words[randomNumber];
    word = new Word(wordChoice);
    
    playGame();
}



function startGame() {
    var myArg = inquirer.prompt([
        {
        
            type: "list",
            message: "Would you like to play a Word Guess Game?",
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

}

startGame();
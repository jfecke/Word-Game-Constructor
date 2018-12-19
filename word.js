var Letter = require("./letter");

function Word(input) {
    this.letters = [];
    this.input = input;
    for (let i in this.input){
        this.letters.push(new Letter(this.input[i]))
    }
    this.getWord = function() {
        word = "";
        for (let i in this.letters) {
            word += this.letters[i].checkLetter() + " ";
        }
        return word
    }
    this.guess = function(letter) {
        for (let i in this.letters) {
           this.letters[i].guessLetter();
        }
    }
}

module.exports = Word;
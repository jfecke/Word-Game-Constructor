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
        var isCorrect = false;
        for (let i in this.letters) {
           var response = this.letters[i].guessLetter(letter);
           if (response) {
            isCorrect = true;
           }
        }
        return isCorrect;
    }
}

module.exports = Word;
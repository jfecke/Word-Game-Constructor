function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
    this.checkLetter = function() {
        if(this.isGuessed) {
            return this.letter
        } else if (this.letter == " ") {
            return " "
        } else {
            return "_"
        }
    }
    this.guessLetter = function(guess) {
        let isCorrect = false;        
        if (guess == this.letter){
            this.isGuessed = true;
            isCorrect = true;
        }
        return isCorrect
    }
}

module.exports = Letter;
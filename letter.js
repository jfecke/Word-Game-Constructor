function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
    this.checkLetter = function() {
        if(this.isGuessed) {
            return this.letter
        } else {
            return "_"
        }
    }
    this.guessLetter = function(guess) {
        if (guess == this.letter){
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;
//get started
document.querySelector("#presskey").innerHTML = "Press any key to get started";

// Array of Vikings names to guess
var wordArray = ["COUSINS", "COOK", "DIGGS", "THIELEN", "RUDOLPH", "GRIFFIN", "HUNTER", "RICHARDSON", "RHODES", "RAGNAR", "WAYNES", "SMITH", "SANDEJO", "KENDRICKS", "BARR", "ZIMMER", "TOUCHDOWN", "INTERCEPTION", "TIMEOUT"];

// random name creation
var viking = wordArray[Math.floor(Math.random() * wordArray.length)];
console.log(viking);

// Set the number of guesses left, 3x longer than length of array
var guessRemaining = viking.length * 3;
console.log(guessRemaining);

// Array from the word chosen
var ansLetters = Array.from(viking);
console.log(ansLetters);

// array of underlines equal to the length of word
var guessArray = [];
for (i = 0; i < viking.length; i++) {
    guessArray[i] = "_";
}

// The number of letters still to be unguessed
var remainingLetters = viking.length;

// Combine in guessArray with a space in between into a string
console.log(guessArray.join(" "));
document.querySelector("#array").innerHTML = guessArray.join(" ");


var guessedLetters = [];

// logs wins
wins = 0;
document.querySelector("#wins").innerHTML = "Wins: " + wins;

//plays "yes" on win

var yes = new Audio('assets/images/yes.mp3');
yes.play();

//plays horn on win
var horn = new Audio('assets/images/horn.mp3');
horn.play();



// log losses
losses = 0;
document.querySelector("#losses").innerHTML = "Losses: " + losses;

//plays "loser" on losses
var loser = new Audio('assets/images/loser.mp3');
loser.play();

// functions


function keyPress() {
    // user's keypress
    document.onkeyup = function (event) {
        var userGuess = event.key.toUpperCase();
         // Checks if the guess is in viking, if yes ++ to our answer and -- from remainingLetters
        for (var j = 0; j < viking.length; j++) {
            if (viking[j] == userGuess && guessArray[j] != userGuess) {
                guessArray[j] = userGuess;
                remainingLetters--;
            }
        }
        guessRemaining--;
        guessedLetters.push(userGuess);
        console.log(guessedLetters);
        console.log(guessArray);
        console.log(remainingLetters);
        console.log(guessRemaining);

        if (remainingLetters < 1) {
            console.log("WINNER!");
            document.querySelector("#presskey").innerHTML = "<h2>WINNER!</h2>";
            wins++;
            console.log(wins);
            yes.play();
            horn.play();
            document.querySelector("#array").innerHTML = guessArray.join(" ");
            document.querySelector("#wins").innerHTML = "Wins: " + wins;
            document.querySelector("#mainimg").src = "assets/images/ragnar.gif";
            setTimeout(newGame, 4000);

        } else if (guessRemaining < 1) {
            console.log("YOU LOSE!");
            document.querySelector("#presskey").innerHTML = "<h2>TRY AGAIN!</h2>";
            losses++;
            console.log(losses);
            loser.play();
            document.querySelector("#array").innerHTML = viking;
            document.querySelector("#losses").innerHTML = "Losses: " + losses;
            document.querySelector("#mainimg").src = "assets/images/mad.gif";
            setTimeout(newGame, 2400);
        } else {
            console.log("you have " + guessRemaining + " guesses left");
            document.querySelector("#presskey").innerHTML = "You have " + guessRemaining + " guesses left";
            document.querySelector("#array").innerHTML = guessArray.join(" ");
            document.querySelector("#letters").innerHTML = guessedLetters.join(" ");
        }
    }
}

function newGame() {
    viking = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(viking);
    guessRemaining = viking.length * 2;
    console.log(guessRemaining);
    guessArray = [];
    guessedLetters = [];
    document.querySelector("#mainimg").src = "assets/images/1.gif";

    for (i = 0; i < viking.length; i++) {
        guessArray[i] = "_";
    }

    remainingLetters = viking.length;

    document.querySelector("#presskey").innerHTML = "PRESS ANY KEY TO PLAY AGAIN!";
    document.querySelector("#array").innerHTML = guessArray.join(" ");
    document.querySelector("#letters").innerHTML = "";

    keyPress();
}



keyPress();
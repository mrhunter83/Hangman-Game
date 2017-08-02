function Hangman() {
	var wins = 0;
	document.getElementById("winCount").innerHTML = wins;
	var emptySpaces = document.getElementById("underscore");
	var numGuesses = document.getElementById("guessCount");
	var wordpool = [
	["R", "I", "C", "K"], 
	["W", "A", "L", "K", "E", "R", "S"], 
	["M", "I", "C", "H", "O", "N", "N", "E"], 
	["V", "I", "R", "U", "S"], 
	["A", "T", "L", "A", "N", "T", "A"],
	["L", "U", "C", "I", "L", "L", "E"],
	["C", "L", "E", "A", "R"],
	["A", "P", "O", "C", "A", "L", "Y", "P", "S", "E"]
	];

	var letterSpace = 
	["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	HangmanInit();

	// INITIALIZE THE GAME PARAMATERS

	function HangmanInit() {
		var randNum = Math.floor((Math.random()*(wordpool.length)));
		var chosenWord = wordpool[randNum];
		numGuesses.innerHTML = 12;
		guessesLeft = numGuesses.innerHTML;
		var spaces = [];
		var guessed = [];
		document.getElementById("letterpicked").innerHTML = guessed;
		var index = 0;
		for (i = 0; i < chosenWord.length; i++) {
			spaces.push("_ ");
		};
		emptySpaces.innerHTML = spaces;

		// USER INPUT AND GAME RESPONSE

		document.onkeydown = function(event) {
			var input = event.key;
			input = input.toUpperCase();
			if (guessed.indexOf(input) === -1 && letterSpace.indexOf(input) !== -1) {
				guessed.push(input);
				numGuesses.innerHTML -= 1
				guessesLeft -= 1;
				index += 1;
			};

			document.getElementById("letterpicked").innerHTML = guessed;

			for (i = 0; i < chosenWord.length; i++) {
				if (input === chosenWord[i]) {
					spaces[i] = chosenWord[i];
					emptySpaces.innerHTML = spaces;
				};
			};

			var is_same = (spaces.length == chosenWord.length) && spaces.every(function(element, index) {
				return element === chosenWord[index];
			});

			if (is_same === true) {
				wins += 1;
				document.getElementById("winCount").innerHTML = wins;
				HangmanInit();
			}
			else if (guessesLeft === 0 && is_same === false) {
				alert("You have run out of guesses.  You lose.");
				HangmanInit();
			}

			// TEST LOGS

			console.log(input);
			console.log(chosenWord);
			console.log(index);
			console.log(guessed);
			console.log(guessesLeft);
			console.log(spaces);
			console.log(is_same);
			console.log(wins);
		};
	};
}
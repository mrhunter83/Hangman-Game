function Hangman() {
	var wins = 0;
	document.getElementById("winCount").innerHTML = "Wins: "+wins;
	var emptySpaces = document.getElementById("underscore");
	var numGuesses = document.getElementById("guessCount");
	var wordpool = ["RICK", "WALKERS", "MICHONNE", 
					"VIRUS", "ATLANTA", "LUCILLE", 
					"CLEAR", "APOCALYPSE", "KATANA SWORD", 
					"CROSSBOW", "DARYL", "INFECTED", "NEGAN",
					"CARL", "EYEPATCH", "BITE", "GOVERNOR",
					"ALEXANDRIA", "HILLTOP", "THE KINGDOM",
					"SHIVA", "SURVIVE"]

	var letterSpace = 
	["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	HangmanInit();

	// INITIALIZE THE GAME PARAMATERS

	function HangmanInit() {
		$("#playAgain").hide();
		var randNum = Math.floor((Math.random()*(wordpool.length)));
		var chosenWord = wordpool[randNum].split("");
		console.log(chosenWord);
		numGuesses.innerHTML = 12;
		guessesLeft = numGuesses.innerHTML;
		var spaces = [];
		var guessed = [];
		var index = 0;
		for (i = 0; i < chosenWord.length; i++) {
			spaces.push("_ ");
		};
		emptySpaces.innerHTML = spaces.join(" ");

		// USER INPUT AND GAME RESPONSE

		document.onkeydown = function(event) {
			var input = event.key;
			input = input.toUpperCase();
			if (guessed.indexOf(input) === -1 && letterSpace.indexOf(input) !== -1) {
				guessed.push(input);
				$("#letterpicked").append(input+" ");
				numGuesses.innerHTML -= 1
				guessesLeft -= 1;
				index += 1;
			};

			for (i = 0; i < chosenWord.length; i++) {
				if (input === chosenWord[i]) {
					spaces[i] = chosenWord[i];
					emptySpaces.innerHTML = spaces.join(" ");
				};
			};

			var is_same = (spaces.length == chosenWord.length) && spaces.every(function(element, index) {
				return element === chosenWord[index];
			});

			if (is_same === true) {
				wins += 1;
				document.getElementById("winCount").innerHTML = "Wins: "+wins;
				$("#myModal").modal("show");
				$("#playAgain").show();
			}
			else if (guessesLeft === 0 && is_same === false) {
				$("#myModalTwo").modal("show");
				$("#playAgain").show();
			}
		};
	};

	$("#playAgain").on("click", function() {
		$("#letterpicked").empty();
		HangmanInit();
	})
}
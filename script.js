(function () {

	var totalOptions, totalRuns;

	var run = function () {

		var rightGuesses = [];
		var wrongGuesses = [];

		var guessRightPlayer = {
			times: 0,
			finished: false
		};

		var guessWrongPlayer = {
			times: 0,
			finished: false
		};

		var currentAnswer = null;

		function genRandomAnswer(max) {
			return Math.floor(Math.random() * max) + 1;
		}

		// Main loop
		// while (!guessRightPlayer.finished && !guessWrongPlayer.finished) {
		for (var i = 0; i < totalRuns; i++) {
			currentAnswer = genRandomAnswer(totalOptions);

			console.log('start round', i);

			// Have guessRightPlayer figure it out
			while (!guessRightPlayer.finished) {
				guessRightPlayer.times++;
				var guess = genRandomAnswer(totalOptions);
				if (guess === currentAnswer) {
					guessRightPlayer.finished = true;
				}
			}

			console.log('guess right', i, guessRightPlayer.times);

			// Have guessWrongPlayer figure it out
			while (!guessWrongPlayer.finished) {
				guessWrongPlayer.times++;
				var guesses = 0, validGuesses = [];

				// construct array of valid guesses
				for (var j = 1; j <= totalOptions; j++) {
					validGuesses.push(j);
				}

				// Time to guess
				for (var k = 1; k < totalOptions; k++) {
					guesses++;
					var guess = validGuesses[genRandomAnswer(validGuesses.length)];
					if (guess !== currentAnswer) {
						validGuesses.splice(validGuesses.indexOf(guess), 1);
					} else {
						break;
					}
				}

				if (guesses === totalOptions - 1) {
					guessWrongPlayer.finished = true;
				}
			}

			console.log('guess wrong', i, guessWrongPlayer.times);

			rightGuesses.push(guessRightPlayer.times);
			wrongGuesses.push(guessWrongPlayer.times);

			guessRightPlayer.times = guessWrongPlayer.times = 0;
			guessRightPlayer.finished = guessWrongPlayer.finished = false;
		}

		console.log(rightGuesses, wrongGuesses);

		// Calculate status
		var right = document.querySelector('#guessRight').textContent = (rightGuesses.reduce(function (soFar, next) {
			return soFar + next;
		}, 0) / rightGuesses.length);

		var wrong = document.querySelector('#guessWrong').textContent = (wrongGuesses.reduce(function (soFar, next) {
			return soFar + next;
		}, 0) / wrongGuesses.length);

		document.querySelector('#average').textContent = (right/wrong) + ' times easier';
	};

	document.querySelector('#start').addEventListener('click', function (e) {
		totalRuns = parseInt(document.querySelector('#total').value, 10);
		totalOptions = parseInt(document.querySelector('#options').value, 10);
		run();
	});
})()

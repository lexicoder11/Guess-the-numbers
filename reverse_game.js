const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  // added some story
  console.log("Now that you know I (human) can guess your number how about we switch things up and let me guess your (computer) number.")
  console.log("The random number is between 1 and 100 . Guess it.")
//   this code will generate a secret number
  const secretNumber = Math.floor(Math.random() * 100) + 1; 
// this initializes the guess but does not give it a value as that is what the human puts in
  let guess;
//   this initializes the attempts at zero
  let attempts = 0;
// this code generates the question to the player to guess the number
  while (true) {
    guess = await ask("What's your guess: ");
    // this code ensures that even though we may type in a string, the guess will be read as a number
    guess = parseInt(guess);
// this code ensures that if you guess anything outside of a number, then the guess will return invalid but allow you to continue the game where ever you are in it
    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log("Please enter a valid number between 1 and 100.");
      continue;
    }
// this code increases the attempts by 1
    attempts++;
// this code is when you successfull guess the number
    if (guess === secretNumber) {
      console.log(`Yay! You guessed the secret number ${secretNumber} in ${attempts} attempts.`);
      rl.close();
      break;
    //   this code is you playing the game and guessing
    } else if (guess < secretNumber) {
      console.log("The secret number is higher.");
    } else {
      console.log("The secret number is lower.");
    }

    // this code will end the game after 6 failed attempts to guess the number
    if (attempts >= 6) {
      console.log("Oh no! The secret number was " + secretNumber);
      rl.close();
      break;
    }
  }
}

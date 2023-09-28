const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("Is your secret number between 1 and 100?\nI won't peek, I promise...\n");
  if(secretNumber >= 1 && secretNumber <= 100 ) {
    console.log('You entered: ' + secretNumber);
    console.log(`I will guess your number.`);
// create a variable for the range
      let range = {
        min: 1,
        max: 100
      }
    
      let guess;
      let attempts = 0;
      possibleCheater = ``;

// guess needs to be range
      while (true) {
        guess = Math.floor((range.min + range.max)/ 2);
        attempts++;

        console.log(`Is it ${guess}? (y/n)`);
        const response = await ask('');

          if (response == `y`){
          if(possibleCheater == `h`|| possibleCheater == 'l') {
            console.log(`Cheater, Cheater pumpkin eater!`);
            rl.close();
            break;
          }
        }


        if (response == `y`){
          console.log(`Your number was ${guess}! It took me ${attempts} attempts.`);
          rl.close();
          break;
        } else if (response == `n`){
          console.log(`Is it higher (h), or lower (l)?`);
          let answerOfPreviousQuestion = await ask(``);
          if (answerOfPreviousQuestion == `h`) {
            // what algorithm detects cheating
            if (possibleCheater == `l`){
              console.log(`I think someone is cheating.`);
              rl.close();
              break;
            }

            
            possibleCheater = `h`;
            range.min = guess +1; 
          } else if (answerOfPreviousQuestion == `l`) {
            if (possibleCheater == `h`){
              console.log(`I smell a cheater.`);
              rl.close();
              break;
            }
            possibleCheater = `l`;
            range.max = guess -1;
          } else {
            console.log("Please enter a valid number between 1 and 100, y for yes or n for no.");
            rl.close();
          }
        }
      }
  }   

}



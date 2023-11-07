const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
// this is the code that will generate at the start of the game
async function start() {
  // added a story to my game
  console.log("You just passed your MENSA test and recieved your certification that you are a genius! Let's put that genius brain to a test")
  let secretNumber = await ask("Tell me your secret number between 1 and 100?\nI won't cheat, I promise...\n");
// setting up a range for what the possible secret number could be
  if(secretNumber >= 1 && secretNumber <= 100 ) {
    // this is allows you to put in your number that will be guessed 
    console.log('You entered: ' + secretNumber);
    console.log(`I will guess your number.`);

// create a variable for the range
      let range = {
        min: 1,
        max: 100
      }
    // initializing the guess so you can pass in a value
      let guess;
      // initializes the value of attempts at zero
      let attempts = 0;
// this initializes and stores the previous answer for cheating
      let previousResponse = '';
  

// guess needs to be range. this code starts the guess at 50
      while (true) {
        guess = Math.floor((range.min + range.max)/ 2);
        attempts++;
        console.log(`Is it ${guess}? (y/n)`);
        const response = await ask('');

// if y and its correct, this is the response you will get
        if (response == `y`){
          console.log(`Your number was ${guess}! It took me ${attempts} attempts.`);
          rl.close();
          break;
          // if no, this code will ask you if its higher or lower
        } else if (response == `n`){
          console.log(`Is it higher (h), or lower (l)?`);  
          let answerOfPreviousQuestion = await ask(``);
          // this code allows the game to detect cheating
          if (
            (previousResponse === 'h' && answerOfPreviousQuestion === 'l') ||
            (previousResponse === 'l' && answerOfPreviousQuestion === 'h')
          ) {
            console.log("Cheater!");
            rl.close();
            break;
          }
          
          if (answerOfPreviousQuestion == `h`) {
            // this code allows the computer to guess higher
          range.min = guess + 1; 
        } else if (answerOfPreviousQuestion == 'l'){
          // this code allows the computer to guess lower
          range.max = guess -1;
        }
        // this code will assume that you are cheating after 5 attempts of guessing
      }  if (attempts >=5){
        console.log('Cheater,Cheater pumpkin eater!');
        rl.close();
        break;
      }
      }   

  }}
      

      
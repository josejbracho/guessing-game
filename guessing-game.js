const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askGuess = (secretNumber, attemps) => {
    rl.question('Enter a guess: ', (answer) => {
    let result = checkGuess(Number(answer), secretNumber)
        if (result) {
            console.log("You win!")
            rl.close()
        } else {
            attemps--;
            if (attemps === 0) {
                rl.close();
                console.log("Max number of attemps reached, you lose...");
                console.log(`We were thinking of number ${secretNumber}, better luck next time!`);
            } else {
                askGuess(secretNumber, attemps);
            }
        }
    });
}

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function checkGuess(num, secretNumber) {
    if (num > secretNumber) {
        console.log('Too high');
        return false;
    }

    if (num < secretNumber) {
        console.log('Too low');
        return false;
    }

    if (num === secretNumber) {
        console.log('Correct!');
        return true;
    }
};

const askRange = (attemps) => {
    rl.question("Enter a Max number ", (max) => {
        rl.question("Enter a Min number ", (min) => {
            if (min > max) {
                console.log('Max must be higher than Min, try again');
                rl.close();
            } else {
                console.log(`I'm thinking of a number between ${min} and ${max}...`);
                let secretNumber = randomInRange(Number(min), Number(max));
                askGuess(secretNumber, attemps);
            }
        })
    })
};

const askLimit = () => {
    rl.question("How many tries would you like to have? ", (attemps) => {
        askRange(attemps);
    });
}

askLimit();






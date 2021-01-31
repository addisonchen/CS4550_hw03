
// Generate a list of 4 random ints [0, 9] where no digits are repeated
// returns ["#", "#", "#", "#"]
export function randomValue() {

    let vals = [];
  
    var num;
    while(vals.length < 4) {
        num = Math.floor(Math.random() * 10) + '';
        if (!vals.includes(num)) {
            vals.push(num);
        }
    }
    return vals;
}

// calculate the correct number of bulls and cows for a guess
// returns ["#", "#"]
export function bullsAndCows(answer, guess) {
    guess = guess.split('');

    var i;
    let bulls = 0;
    let cows = 0;

    answer.forEach(a => {
        guess.forEach(q => {
            if (q === a) {
                ++cows;
            }
        });
    });

    for (i = 0; i < 4; ++i) {
        if (answer[i] === guess[i]) {
            ++bulls;
            --cows;
        }
    }

    return [bulls + '', cows + '']
}

// Generates an empty game board
export function emptyBoard() {
    return [
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null},
      {guess: null, bulls: null, cows: null}
    ];
  }
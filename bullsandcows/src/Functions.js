
export function randomValue() {

    let vals = [];

    var num;
    while (vals.length < 4) {
        num = Math.floor(Math.random() * 10) + '';
        if (vals.includes(num)) {
            vals.push(num);
        }
    }
    return vals;
}

export function bullsAndCows(answer, guess) {
    guess = guess.split('');
    let guessCopy = guess.slice()
    var i;
    let bulls = 0;
    let cows = 0;

    answer.forEach(a => {
        for (i = 0; i < guessCopy.length; ++i) {
            if (a === guessCopy[i]) {
                guessCopy.splice(i, 1);
                ++cows;
                break;
            }
        }
    });

    for (i = 0; i < 4; ++i) {
        if (answer[i] === guess[i]) {
            ++bulls;
            --cows;
        }
    }

    return [bulls + '', cows + '']
}
import './App.css';
import { useState } from 'react';
import GuessRow from './GuessRow';
import { randomValue, bullsAndCows, emptyBoard } from './Functions';

function App() {

  // answer: ["#", "#", "#", "#"], guess this to win!
  const [answer, setAnswer] = useState(randomValue);
  // guessHistory: [{guess: "", bulls: "", cows: ""}] * 8, stores the guess data for one game
  const [guessHistory, setGuessHistory] = useState(emptyBoard);
  // curGuess: "", stores the correct value of the text/input field
  const [curGuess, setCurGuess] = useState('');
  // paused: bool, whether or not user input should be accepted
  const [paused, setPaused] = useState(false);

  // called when the user presses enter or "guess"
  // does nothing if paused
  // does nothing if the guess is not 4 digits long
  // determines bulls and cows
  // sets guessHistory to the new correct state
  // determines if game is over
  function guess() {
    if (paused) {
      return
    }

    if (curGuess.length !== 4) {
      return
    }

    let [bulls, cows] = bullsAndCows(answer, curGuess);

  
    let newArr = [...guessHistory];

    let putIn = false;
    var i, curGuessNum;
    for (i = 0; i < 8; ++i) {
      if ((newArr[i].guess === null) && !(putIn)) {
        newArr[i].guess = curGuess;
        newArr[i].bulls = bulls;
        newArr[i].cows = cows;
        putIn = true;
        curGuessNum = i + 1;
      }
    }

    if (bulls === '4') {
      setPaused(true);
      setCurGuess('You Win!');
    }
    else if (curGuessNum > 7) {
      setPaused(true);
      setCurGuess('You Lose! Ans: ' + answer.join(''));
    } else {
      setCurGuess('');
    }
  
    setGuessHistory(newArr);
  }

  // resets all states to a new game
  function reset() {
    setPaused(false);
    setCurGuess('');
    setGuessHistory(emptyBoard);
    setAnswer(randomValue);
  }

  // checks if key pressed was enter, calls guess() if it was
  function handleKeyPress(ev) {
    if (paused) {
      return
    }
    else if (ev.key === 'Enter') {
      guess()
    }
  }

  // filter out duplicate characters, filter out non-string chars.
  // HANDLES FORCING NO DUPLICATE NUMBERS
  function handleValueChange(ev) {
    // filter duplicates
    let guessSet = new Set(ev.target.value);
    let uniqueArr = [...guessSet]
    // filter out NaNs
    uniqueArr.filter(c => {
      return !isNaN(c);
    });
    
    // set the curGuess (input value) to the filterd string 
    setCurGuess(uniqueArr.join(''));
  }


  return (
    <>
      <div className="MainContainer">
        <div className="HistoryContainer">
          <div className="HistoryRow">
            <div className="Red Number Cell">
              #
            </div>
            <div className="Red Cell">
              Guess
            </div>
            <div className="Red Cell">
              Bulls
            </div>
            <div className="Red Cell">
              Cows
            </div>
          </div>
          {
            guessHistory.map((guess, index) => (
              <GuessRow key={index} index={index} guess={guess}/>
            ))
          }
        </div>
        <div className="GuessContainer">
          <input className="InputGuess" type="text" value={curGuess} onKeyDown={handleKeyPress} onChange={handleValueChange} maxLength="4" disabled={paused? "disabled" : ""}/>
          { paused ? 
            <button className="NewGame GuessButton" onClick={reset}>Play Again</button>
            :
            <>
              <button className="GuessButton" onClick={guess}>Guess</button>
              <button className="ResetButton" onClick={reset}>Reset</button>
            </>
          }

        </div>
      </div>
      <a className="Link" href="http://swoogity.com">Back to Home</a>
    </>
  );
}

export default App;
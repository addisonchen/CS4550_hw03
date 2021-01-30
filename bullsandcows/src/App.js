import './App.css';
import { useState } from 'react';
import GuessRow from './GuessRow';
import { randomValue, bullsAndCows } from './Functions';

function App() {


  const [answer, setAnswer] = useState(randomValue);
  const [guessHistory, setGuessHistory] = useState(emptyBoard);
  const [curGuess, setCurGuess] = useState('');
  const [paused, setPaused] = useState(false);

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

  function reset() {
    setPaused(false);
    setCurGuess('');
    setGuessHistory(emptyBoard);
    setAnswer(randomValue);
  }

  function handleKeyPress(ev) {
    if (paused) {
      return
    }
    else if (ev.key === 'Enter') {
      guess()
    }
  }

  function handleValueChange(ev) {
    setCurGuess(ev.target.value.replace(/[^0-9]/g,''));
  }

  function emptyBoard() {
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
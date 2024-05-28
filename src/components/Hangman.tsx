import { useState, useEffect } from 'react';
import '../css/hangman.css';
import reloj from '../img/reloj.png';
import verdugo from "../img/verdugo.png";
import error1 from "../img/error1.png";
import error2 from "../img/error2.png";
import error3 from "../img/error3.png";
import error4 from "../img/error4.png";
import error5 from "../img/error5.png";

interface HangmanProps {
  wordsLists: string[][];
  types: string[];
}

const Hangman = ({ wordsLists, types }: HangmanProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [listIndex, setListIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string>(wordsLists[listIndex][wordIndex]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState(0);
  const [roundsWon, setRoundsWon] = useState(0); // Estado para las rondas ganadas
  const [roundsLost, setRoundsLost] = useState(0); // Estado para las rondas perdidas
  const hangmanImages = [error1, error2, error3, error4, error5, verdugo];

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    const key = setInterval(() => {
      if (!gameOver) {
        setCount(count => count + 1);
      }
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, [gameOver]);

  useEffect(() => {
    if (errorCount >= 5) {
      setRoundsLost(roundsLost + 1); // Incrementar rondas perdidas
      setGameOver(true);
    } else if (displayWord.join('') === selectedWord) {
      setRoundsWon(roundsWon + 1); // Incrementar rondas ganadas
      setGameOver(true);
    }
  }, [errorCount, guessedLetters]);

  const displayWord = selectedWord.split('').map((letter) =>
    guessedLetters.includes(letter) ? letter : '_'
  );

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    const newListIndex = Math.floor(Math.random() * wordsLists.length);
    const newList = wordsLists[newListIndex];
    setListIndex(newListIndex);
    const newWordIndex = Math.floor(Math.random() * newList.length);
    setSelectedWord(newList[newWordIndex]);
    setWordIndex(newWordIndex);
    setGuessedLetters([]);
    setErrorCount(0);
    setCount(0);
    setPlay(false);
    setGameOver(false);
  };

  const handlePlayClick = () => {
    setPlay(true);
    setCount(0);
  };

  return (
    <div className='divhang'>
      <p className='round'>This round is about {types[listIndex]}</p>
      {!play && (
        <>
          <img src={verdugo} alt='Hangman image' width={150} height={150} />
          <button className='btnplay' onClick={handlePlayClick}>
            Play
          </button>
          <p>Rounds won: {roundsWon}</p>
          <p>Rounds lost: {roundsLost}</p>
        </>
      )}
      {play && (
        <div className='divhang'>
          <img className='imgreloj' src={hangmanImages[errorCount]} alt='Hangman image' width={150} height={150} />
          <div className='reloj'>
            <img className='imgreloj' src={reloj} alt='reloj image' width={50} height={50} />
            <p>{count} segundos</p>
          </div>
          <p className='letters'>{displayWord.join(' ')}</p>
          <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
          {(gameOver || errorCount > 5) && (
            <button className='btnrest' onClick={restartGame}>
              {errorCount > 5 ? 'Select New Word' : 'Continue'}
            </button>
          )}
          <p className='txtinfo'>Error count: {errorCount}</p>
          {gameOver && errorCount <= 5 && displayWord.join('') === selectedWord && (
            <p className='txtinfo'>You won in this round</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;

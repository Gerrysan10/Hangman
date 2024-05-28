import { useState, useEffect,useContext } from 'react';
import '../css/hangman.css';
import { StatsContext } from "./StatsContext"; 
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
  const [gameOver, setGameOver] = useState(false); // Nuevo estado para controlar si el juego ha terminado
  const [count, setCount] = useState(0); // Contador de segundos
  const hangmanImages = [ error1, error2,error3,error4,error5,verdugo];
  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    const key = setInterval(() => {
      if (!gameOver) { // Solo incrementa el contador si el juego no ha terminado
        setCount(count => count + 1);
      }
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, [gameOver]);

  const displayWord = selectedWord.split('').map((letter, index) => (
    guessedLetters.includes(letter) ? letter : '_'
  ));

  const handleGuess = (letter: string) => {
  if (!guessedLetters.includes(letter)) {
    setGuessedLetters([...guessedLetters, letter]);
    if (!selectedWord.includes(letter)) {
      setErrorCount((prev) => prev + 1);
      if (errorCount + 1 >= 5) {
        setGameOver(true);
      }
    }
  }
  if (displayWord.join("") === selectedWord) {
    setGameOver(true);
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
    setGameOver(false); // Reinicia el estado de gameOver
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
        <img src={verdugo} alt='Hangman image' width={150} height={150}/>
        <button className='btnplay' onClick={handlePlayClick}>
          Play
        </button>
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

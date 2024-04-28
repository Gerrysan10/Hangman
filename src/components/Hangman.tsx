import { useState, useEffect } from 'react';
import '../css/hangman.css';
import reloj from '../img/reloj.png';

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
          setGameOver(true); // Establece el estado de gameOver si se alcanza el límite de errores
        }
      }
    }
    if (displayWord.join('') === selectedWord) {
      setGameOver(true); // Establece el estado de gameOver si se adivina la palabra
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
        <button className='btnplay' onClick={handlePlayClick}>
          Play
        </button>
      )}
      {play && (
        <div className='divhang'>
          <div className='reloj'>
            <img className='imgreloj' src={reloj} alt='reloj image' width={50} height={50}/>
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
          {(gameOver && errorCount <= 5) && (
            <p className='txtinfo'>You won in this round</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;

// Hangman.tsx
import  { useState, useEffect } from 'react';
import '../css/hangman.css';

interface HangmanProps {
  wordsLists: string[][];
  types: string[];
}

const Hangman = ({ wordsLists, types }:HangmanProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [listIndex, setListIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string>(wordsLists[listIndex][wordIndex]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    restartGame();
  }, []);

  const displayWord = selectedWord.split('').map((letter, index) => (
    guessedLetters.includes(letter) ? letter : '_'
  ));

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
    setPlay(false);
  };

  const handlePlayClick = () => {
    setPlay(true);
  };

 

  return (
    <div className='divhang'>
      <p className='round'>This round is about {types[listIndex]}</p>
      {!play && (
        <button onClick={handlePlayClick}>
          Play
        </button>
      )}
      {play && (
        <div className='divhang'>
          <p>{displayWord.join(' ')}</p>
          <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
          {(displayWord.join('') === selectedWord || errorCount > 5) && (
            <button className='btnrest' onClick={restartGame}>
              {errorCount > 5 ? 'Select New Word' : 'Continue'}
            </button>
          )}
          <p className='txtinfo'>Error count: {errorCount}</p>
          {displayWord.join('') === selectedWord && (
            <p className='txtinfo'>You won in this round</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;
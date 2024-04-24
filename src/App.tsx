//app.tsx
import Welcome from './components/Welcome';
import Hangman from './components/Hangman';

const words1 = ['apple', 'banana', 'potato', 'figure', 'kiwi', 'grape'];
const words2 = ['rice', 'beans', 'bread', 'pasta', 'eggs', 'cheese'];
const words3 = ['mexico', 'argentina', 'brazil', 'colombia', 'peru', 'chile'];
const words4 = ['dog', 'cat', 'bird', 'fish', 'turtle', 'snake'];
const words5 = ['audi', 'bmw', 'mercedes', 'ford', 'toyota', 'nissan'];
const words6 = ['oak', 'pine', 'maple', 'birch', 'cedar', 'willow'];

const wordsLists = [words1, words2, words3, words4, words5, words6];

const types = ['fruits', 'foods', 'countries', 'pets', 'cars', 'trees'];

function App(){
  return (
    <div className='App'>
      <Welcome />
      <Hangman wordsLists={wordsLists} types={types} />
    </div>
  );
};
export default App;
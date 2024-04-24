//Welcome.tsx
import hangman from '../img/verdugo.png'
import "../css/main.css"

export default function Welcome(){
    return(
        <>
            <div className="wrapper">
                <div className='tittles'>
                    <h1 style={({fontSize:10})}>Hangman Game o</h1>
                    <h2 style={({fontSize:8})}>The favorite classic game everybody</h2>
                    <img src={hangman} alt='Hangman image' width={50} height={50}/>
                </div>
            </div>
        </>
    );
};

import React from 'react'
import { useSelector } from 'react-redux';
import { selectDefinition, selectSolution } from '../features/words/wordsSlice';

export default function GameOver({ isCorrect, turn, handleNewGame }) {
    const solution = useSelector(selectSolution);
    const definition = useSelector(selectDefinition);

    return (
        <div className="modal">
            {isCorrect ? (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    {(definition.length !== 0) &&
                        (<p className="definition">Definition: {definition[0].definition}</p>)}
                    {turn === 1 ? (<p>You found the solution in {turn} guess!</p>) :
                        (<p>You found the solution in {turn} guesses!</p>)}
                    < button onClick={handleNewGame} className="restart">Start a New Game</button>
                </div>) : (<div>
                    <h1>You Lose!</h1>
                    <p className="solution">{solution}</p>
                    {(definition.length !== 0) &&
                        (<p className="definition">Definition: {definition[0].definition}</p>)}
                    <p>Better luck next time!</p>
                    <button onClick={handleNewGame} className="restart">Start a New Game</button>
                </div>
            )}
        </div >
    )
}

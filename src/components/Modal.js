import React from 'react'

export default function Modal({ isCorrect, turn, solution, definition, handleRestart }) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    {(definition.length != 0) &&
                        (<p className="definition">Definition: {definition[0].definition}</p>)}
                    {turn == 1 ? (<p>You found the solution in {turn} guess!</p>) :
                        (<p>You found the solution in {turn} guesses!</p>)}
                    < button onClick={handleRestart} className="restart">Start a New Game</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>You Lose!</h1>
                    <p className="solution">{solution}</p>
                    {(definition.length != 0) &&
                        (<p className="definition">Definition: {definition[0].definition}</p>)}
                    <p>Better luck next time!</p>
                    <button onClick={handleRestart} className="restart">Start a New Game</button>
                </div>
            )}
        </div >
    )
}

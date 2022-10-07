import React from 'react'

export default function Modal({ isCorrect, turn, solution, handleRestart }) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses!</p>
                    <button onClick={handleRestart} className="restart">Start a New Game</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Unlucky!</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time!</p>
                    <button onClick={handleRestart} className="restart">Start a New Game</button>
                </div>
            )}
        </div>
    )
}

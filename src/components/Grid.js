import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn, isWrongGuess }) {
    return (
        <div>
            {guesses.map((guess, index) => {
                if (turn === index) {
                    return <Row key={index} currentGuess={currentGuess}
                        isWrongGuess={isWrongGuess} />
                } else {
                    return <Row key={index} guess={guess} />
                }
            })}
        </div>
    )
}

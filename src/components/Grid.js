import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn }) {
    return (
        <div>
            {guesses.map((guess, index) => {
                if (turn === index) {
                    return <Row key={index} currentGuess={currentGuess} />
                } else {
                    return <Row key={index} guess={guess} />
                }
            })}
        </div>
    )
}

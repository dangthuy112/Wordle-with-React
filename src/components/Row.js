import React from 'react'
import { useEffect } from 'react';

export default function Row({ guess, currentGuess, isWrongGuess }) {
    let className = !isWrongGuess ? 'row current' : 'row current wrong';

    if (guess) {
        return (
            <div className="row">
                {guess.map((letter, index) => (
                    <div key={index} className={letter.color}> {letter.key}</div>
                ))}
            </div>
        )
    }

    if (currentGuess) {
        let letters = currentGuess.split('')

        return (
            <div className={className}>
                {letters.map((letter, index) => (
                    <div key={index} className="filled">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

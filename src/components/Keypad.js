import React, { useEffect, useState } from 'react';
import { lettersArray } from '../data/letters';

export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        setLetters(lettersArray)
    }, [])

    return (
        <div className='keypad'>
            {letters && letters.map((letter) => {
                const color = usedKeys[letter.key]
                return (
                    <div key={letter.key} className={color}>{letter.key}</div>
                )
            })}
        </div>
    )
}

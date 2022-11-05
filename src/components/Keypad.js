import React, { useEffect, useState } from 'react';

export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('https://incongruous-cyber-passionfruit.glitch.me/wordsDB.json')
            .then(res => res.json())
            .then(json => {
                setLetters(json.letters)
            })
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

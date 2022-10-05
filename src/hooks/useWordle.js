import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    //format a guess into an array of letter objects
    //e.g. [{key: 'e', color: 'gray'}]
    const formatGuess = () => {
        let formattedGuess = []

        for (let i = 0; i < 5; i++) {
            if (currentGuess.charAt(i) === solution.charAt(i)) {
                formattedGuess.push({ key: currentGuess.charAt(i), color: 'green' })
            } else if (solution.includes(currentGuess.charAt(i))) {
                formattedGuess.push({ key: currentGuess.charAt(i), color: 'yellow' })
            } else {
                formattedGuess.push({ key: currentGuess.charAt(i), color: 'gray' })
            }
        }

        return formattedGuess
    }

    //add new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        //add used keys
        setUsedKeys((prevUsedKeys) => {
            let newUsedKeys = { ...prevUsedKeys };

            formattedGuess.forEach((letter) => {
                const currentColor = newUsedKeys[letter.key];

                if (letter.color === 'green') {
                    newUsedKeys[letter.key] = 'green'
                } else if (letter.color === 'yellow' && currentColor !== 'green') {
                    newUsedKeys[letter.key] = 'yellow'
                } else if (letter.color === 'gray' && currentColor !== 'green'
                    && currentColor !== 'yellow') {
                    newUsedKeys[letter.key] = 'gray'
                }
            })

            return newUsedKeys
        })

        setCurrentGuess('')
    }

    //handle keyup event and track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            //only if guess if turn is less than 5
            if (turn > 5) {
                console.log('you used all your guesses')
                return
            }
            //do not allow duplicate guesses
            if (history.includes(currentGuess)) {
                console.log('you already tried that word');
                return
            }

            //check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars long');
                return
            }

            addNewGuess(formatGuess());

            return
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key)
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys }
}

export default useWordle
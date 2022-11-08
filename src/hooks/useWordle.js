import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetWordsQuery } from "../features/words/wordsApiSlice";
import { getNewSolution, selectSolution } from "../features/words/wordsSlice";

const useWordle = () => {
    const [showGameOver, setShowGameOver] = useState(false);
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [isWrongGuess, setIsWrongGuess] = useState(false);
    const { data: words } = useGetWordsQuery();
    const solution = useSelector(selectSolution);
    const dispatch = useDispatch();

    //handle restart of game
    const handleNewGame = () => {
        setShowGameOver(false);
        setIsCorrect(false);
        setCurrentGuess('');
        setGuesses([...Array(6)]);
        setHistory([]);
        setIsWrongGuess(false);
        setTurn(0);
        setUsedKeys({});

        dispatch(getNewSolution(words));
    }

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
            //do not allow duplicate guesses
            if (history.includes(currentGuess)) {
                setIsWrongGuess(true);
                setTimeout(() => setIsWrongGuess(false), 500);
                return
            }

            //check word is 5 chars long
            if (currentGuess.length !== 5) {
                setIsWrongGuess(true);
                setTimeout(() => setIsWrongGuess(false), 500);
                return
            }

            //check to see if word exist in word bank
            if (!words.find((word) => word.word === currentGuess)) {
                setIsWrongGuess(true);
                setTimeout(() => setIsWrongGuess(false), 500);
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

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        handleKeyup,
        usedKeys,
        isWrongGuess,
        handleNewGame,
        showGameOver,
        setShowGameOver
    }
}

export default useWordle
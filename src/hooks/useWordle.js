import { useState } from "react";
import axios from "axios";

const useWordle = (solution, setSolution, words, setShowModal, setDefinition) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [isWrongGuess, setIsWrongGuess] = useState(false);

    //grab definition from WordsAPI
    const getNewDefinition = (newSolution) => {
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${newSolution}/definitions`,
            headers: {
                'X-RapidAPI-Key': '1ef2003126msh860b9a466280f3bp1d15d2jsnc4b51c4616db',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setDefinition(response.data.definitions);
        }).catch(function (error) {
            console.error(error);
        });
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

    //handle restart of game
    const handleRestart = () => {
        setShowModal(false);
        setIsCorrect(false);
        setCurrentGuess('');
        setGuesses([...Array(6)]);
        setHistory([]);
        setIsWrongGuess(false);
        setTurn(0);
        setUsedKeys({});

        //get new solution
        let newSolution = words[Math.floor(Math.random() * words.length)].word;
        while (solution === newSolution) {
            newSolution = words[Math.floor(Math.random() * words.length)].word;
        }
        setSolution(newSolution);
        getNewDefinition(newSolution);
    }

    return {
        turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, isWrongGuess, handleRestart
    }
}

export default useWordle
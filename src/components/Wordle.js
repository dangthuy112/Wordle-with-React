import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNewSolution } from '../features/words/wordsSlice';
import { useGetWordsQuery } from '../features/words/wordsApiSlice';
import useWordle from '../hooks/useWordle';
import WordleGrid from './WordleGrid';
import Keypad from './Keypad';
import GameOver from './GameOver';

export default function Wordle() {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn,
        usedKeys, isWrongGuess, handleNewGame, showGameOver, setShowGameOver }
        = useWordle();
    const { data: words } = useGetWordsQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowGameOver(true), 2200);
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowGameOver(true), 2200);
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [currentGuess, turn, isCorrect]);

    useEffect(() => {
        dispatch(getNewSolution(words));
    }, [words])

    return (
        <div>
            <WordleGrid currentGuess={currentGuess} guesses={guesses}
                turn={turn} isWrongGuess={isWrongGuess} />
            <Keypad usedKeys={usedKeys} />
            {showGameOver && <GameOver isCorrect={isCorrect} turn={turn}
                handleNewGame={handleNewGame} />}
        </div>
    )
}

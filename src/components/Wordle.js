import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNewSolution, useGetWordsQuery } from '../features/wordsSlice';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle() {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn,
        usedKeys, isWrongGuess, handleNewGame, showModal, setShowModal }
        = useWordle();
    const { data: words } = useGetWordsQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2200);
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2200);
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [currentGuess, turn, isCorrect]);

    useEffect(() => {
        dispatch(getNewSolution(words));
    }, [])

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses}
                turn={turn} isWrongGuess={isWrongGuess} />
            <Keypad usedKeys={usedKeys} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn}
                handleNewGame={handleNewGame} />}
        </div>
    )
}

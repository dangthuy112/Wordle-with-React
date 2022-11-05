import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ words }) {
    const [showModal, setShowModal] = useState(false);
    const { currentGuess, handleKeyup, guesses, isCorrect,
        turn, usedKeys, isWrongGuess, handleRestart }
        = useWordle(words, setShowModal);

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

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses}
                turn={turn} isWrongGuess={isWrongGuess} />
            <Keypad usedKeys={usedKeys} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn}
                handleRestart={handleRestart} />}
        </div>
    )
}

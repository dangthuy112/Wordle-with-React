import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewSolution, selectSolution } from '../features/words/wordsSlice';
import { useGetWordsQuery } from '../features/words/wordsApiSlice';
import useWordle from '../hooks/useWordle';
import WordleGrid from './WordleGrid';
import Keypad from './Keypad';
import GameOver from './modals/GameOver';
import { useUpdateHistoryMutation, useGetHistoryQuery } from '../features/history/historyApiSlice';
import { selectCurrentID } from '../features/auth/authSlice';

export default function Wordle({ authModalOpen, isLoggedIn }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn,
        usedKeys, isWrongGuess, handleNewGame, showGameOver, setShowGameOver }
        = useWordle();
    const id = useSelector(selectCurrentID);
    const { data: words } = useGetWordsQuery();
    const { data: history, isSuccess } = useGetHistoryQuery(id);
    const [updateHistory] = useUpdateHistoryMutation();
    const solution = useSelector(selectSolution);
    const dispatch = useDispatch();

    //handle key press and game ending to show GameOver modal
    useEffect(() => {
        if (!authModalOpen) {
            window.addEventListener('keyup', handleKeyup);

            if (isCorrect) {
                setTimeout(() => setShowGameOver(true), 2200);
                window.removeEventListener('keyup', handleKeyup)
            }

            if (turn > 5) {
                setTimeout(() => setShowGameOver(true), 2200);
                window.removeEventListener('keyup', handleKeyup)
            }
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [authModalOpen, currentGuess, turn, isCorrect]);

    //when the game is over update history
    useEffect(() => {
        const updateHistoryAsync = async (guessesToSave) => {
            try {
                let newHistory = [...history];
                if (isLoggedIn && isSuccess) {
                    if (newHistory.length == 20) {
                        newHistory.shift();
                    }
                    newHistory.push({ solution: solution, guesses: guessesToSave })
                    await updateHistory({ id, history: newHistory }).unwrap();
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (showGameOver) {
            if (isCorrect) {
                updateHistoryAsync(turn + 1);
            }

            if (turn > 5) {
                updateHistoryAsync(0);
            }
        }
    }, [showGameOver])

    //once wordsDB.json has been fetched, grab the first solution
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

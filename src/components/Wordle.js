import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewSolution, selectSolution } from '../features/words/wordsSlice';
import { useGetWordsQuery } from '../features/words/wordsApiSlice';
import useWordle from '../hooks/useWordle';
import WordleGrid from './WordleGrid';
import Keypad from './Keypad';
import GameOver from './modals/GameOver';
import {
    useUpdateHistoryMutation,
    useGetHistoryQuery,
    useGetStatQuery,
    useUpdateStatMutation
} from '../features/user/userApiSlice';
import { selectCurrentID } from '../features/auth/authSlice';

export default function Wordle({ authModalOpen, isLoggedIn }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn,
        usedKeys, isWrongGuess, handleNewGame, showGameOver, setShowGameOver }
        = useWordle();
    const id = useSelector(selectCurrentID);
    const { data: words } = useGetWordsQuery();
    const { data: history } = useGetHistoryQuery(id);
    const { data: stat } = useGetStatQuery(id);
    // const [updateHistory] = useUpdateHistoryMutation();
    const [updateStat] = useUpdateStatMutation();
    const solution = useSelector(selectSolution);
    const dispatch = useDispatch();

    //handle key press and game ending to show GameOver modal
    useEffect(() => {
        if (!authModalOpen) {
            window.addEventListener('keyup', handleKeyup);

            if (isCorrect) {
                setTimeout(() => setShowGameOver(true), 2200);
                window.removeEventListener('keyup', handleKeyup)
            } else if (turn > 5) {
                setTimeout(() => setShowGameOver(true), 2200);
                window.removeEventListener('keyup', handleKeyup)
            }
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [authModalOpen, currentGuess, turn, isCorrect]);

    //when the game is over, update history and stat of user
    useEffect(() => {
        const updateStatAsync = async (guessesToSave, isGameWon) => {
            try {
                //make changes to history
                let newHistory = [...history];
                if (isLoggedIn) {
                    if (newHistory.length == 20) {
                        newHistory.shift();
                    }
                    newHistory.push({ solution: solution, guesses: guessesToSave })
                }

                //make changes to stat
                let { played, currentStreak, maxStreak, gamesWon } = stat;
                if (isGameWon) {
                    currentStreak += 1;
                    if (currentStreak > maxStreak) {
                        maxStreak = currentStreak;
                    }
                    gamesWon++;
                } else {
                    currentStreak = 0;
                }
                played++;

                await updateStat({ id, stat: { played, currentStreak, maxStreak, gamesWon }, history: newHistory }).unwrap();
            } catch (err) {
                console.error(err);
            }
        }

        if (showGameOver) {
            if (isCorrect) {
                updateStatAsync(turn, true);
            } else {
                updateStatAsync(0, false);
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

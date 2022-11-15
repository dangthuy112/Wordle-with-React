import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectDefinition, selectSolution } from '../../features/words/wordsSlice';

export default function GameOver({ isCorrect, turn, handleNewGame }) {
    const solution = useSelector(selectSolution);
    const definition = useSelector(selectDefinition);

    const handleEnter = (event) => {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            handleNewGame();
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', handleEnter);

        return () => window.removeEventListener('keyup', handleEnter)
    }, [handleEnter]);

    let content;
    let shortenDefinition;
    if (definition?.length >= 3) {
        shortenDefinition = definition.slice(0, 3);
    } else {
        shortenDefinition = definition;
    }

    let keyCount = 0
    content = shortenDefinition.map((currentDef, index) => {
        return (
            <p className="definition" key={keyCount++}>Definition {index + 1}: {currentDef.definition}</p>
        )
    })

    return (
        <div className="modal">
            {isCorrect ? (
                <div>
                    <h1>You Win!</h1>
                    <Typography variant='body1' sx={{ color: 'red', mb:'15px' }}>{solution.toUpperCase()}</Typography>
                    {content}
                    {turn === 1 ? (<p>You found the solution in {turn} guess!</p>) :
                        (<p>You found the solution in {turn} guesses!</p>)}
                    <button onClick={handleNewGame} className="restart">Start a New Game</button>
                </div>) : (<div>
                    <h1>You Lose!</h1>
                    <p className="solution">{solution}</p>
                    {content}
                    <p>Better luck next time!</p>
                    <button onClick={handleNewGame} className="restart">Start a New Game</button>
                </div>
            )}
        </div >
    )
}

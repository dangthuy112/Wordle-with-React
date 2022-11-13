import { Button, Modal, Grid, Typography, Paper, Divider, Box, List, IconButton } from '@mui/material'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from '@mui/icons-material';
import correct from '../img/correct.png';
import greentiles from '../img/greentiles.png';
import twosameletters from '../img/twosameletters.png';


export default function Help({ helpModalOpen, setHelpModalOpen }) {
    const handleClose = () => {
        setHelpModalOpen(false);
    }

    return (
        <div>
            <Modal
                open={helpModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={paperStyle}>
                    <Box sx={boxStyle}>
                        <Grid container direction='column' alignItems="flex-end">
                            <IconButton sx={{ color: 'white', position: 'absolute', top: '8px', right: '5px' }}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Typography variant='h4' align='left' sx={{ fontWeight: 800, mt: '30px' }} >
                            How To Play
                        </Typography>
                        <Typography variant='body1' align='left' sx={{ mt: '20px' }}>
                            You have 6 tries to guess the word.
                        </Typography>
                        <ul style={{ padding: '0px 20px', marginTop: '8px' }}>
                            <li>
                                <Typography variant='body2' align='left'>
                                    The word has to be a 5-letter word inside the word bank.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant='body2' align='left'>
                                    The tiles will change color depending on how close your guess was compared to the word.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant='h6' align='left' sx={{ fontWeight: 800 }} >
                            Examples
                        </Typography>
                        <Box component='img' src={greentiles} width='295px' sx={{ ml: '-4px' }} alt="correct" />
                        <Typography variant='body1' align='left' sx={{ mb: '15px' }}>
                            Green tiles mean the letter is in the word and in the correct spot.
                        </Typography>
                        <Box component='img' src={twosameletters} width='295px' sx={{ ml: '-4px' }} alt="correct" />
                        <Typography variant='body1' align='left' sx={{ mb: '0px' }}>
                            Yellow tiles mean the letter is in the word and NOT in the correct spot.
                        </Typography>
                        <Typography variant='body1' align='left' sx={{ mb: '0px' }}>
                            Gray tiles mean the letter is not in the word.
                        </Typography>
                        <Typography variant='body1' align='left' sx={{ mb: '15px' }}>
                            Hint: Green tiles does not mean it is in the word only ONCE
                        </Typography>
                        <Box component='img' src={correct} width='295px' sx={{ ml: '-4px' }} alt="correct" />
                        <Typography variant='body1' align='left' sx={{ mb: '15px' }}>
                            Guess the correct word in 6 tries to win!
                        </Typography>
                    </Box>
                </Paper>
            </Modal >
        </div >
    )
}

const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    p: '10px 5px',
}

const paperStyle = {
    color: '#EBEBEB',
    padding: '20px',
    margin: "20px auto",
    position: 'absolute',
    top: '42%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '55vh',
    width: 320,
    backgroundColor: '#2E2E2E',
    border: '2px solid #CCC',
    overflow: 'auto',
    boxShadow: 24,
    p: 4,
};
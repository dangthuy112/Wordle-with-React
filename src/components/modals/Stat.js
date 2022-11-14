import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useGetHistoryQuery } from '../../features/history/historyApiSlice';
import { selectCurrentID } from '../../features/auth/authSlice';

export default function Stat({ statModalOpen, setStatModalOpen }) {
    const dispatch = useDispatch();
    const id = useSelector(selectCurrentID);
    const { data: history, isLoading, isSuccess, isError, error } = useGetHistoryQuery(id);

    const handleClose = () => {
        setStatModalOpen(false);
    };

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content =
            <Grid container direction='column' >
                {history.map((game) => {
                    return (
                        <Grid container justifyContent='flex-start' alignItems='center' sx={{ m: '2px 0px' }}>
                            <Typography variant='button' align='left' sx={{ padding: '3px 10px', width: '50px' }}
                            >{game.solution}</Typography>
                            {game.guesses !== 0 ? <Grid container justifyContent='flex-end' alignContent='center' sx={{
                                width: `${13.5 * game.guesses}%`, background: '#52914d', pr: '5px', height: '25px'
                            }}>
                                {game.guesses}
                            </Grid> : <CloseOutlinedIcon sx={{ color: 'red' }} />
                            }
                        </Grid>
                    )
                })}
            </Grid>
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <div>
            <Modal open={statModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Paper style={paperStyle}>
                    <Grid container direction='column' >
                        <Grid container direction='column' alignItems="flex-end">
                            <IconButton sx={{ color: 'white', position: 'absolute', top: '8px', right: '5px' }}
                                onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Typography variant='h5' align='center' sx={{ mt: '30px' }} >
                            Statistics
                        </Typography>
                        <Typography variant='body1' align='center' sx={{ m: '10px 0' }}>
                            Previous Games
                        </Typography>
                        {content}
                    </Grid>
                </Paper>
            </Modal>
        </div >
    )
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
    width: 400,
    backgroundColor: '#2E2E2E',
    border: '2px solid #CCC',
    overflow: 'auto',
    boxShadow: 24,
    p: 4,
};
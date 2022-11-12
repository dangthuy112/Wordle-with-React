import { useState } from 'react'
import { Button, Modal, Grid, Typography, Paper, Divider } from '@mui/material'

export default function Welcome({ setCurrentModal, setIsLoggedIn, authModalOpen, setAuthModalOpen }) {
    const handleClose = () => {
        setIsLoggedIn(false);
        setAuthModalOpen(false);
    }
    const handleLoginButton = () => setCurrentModal('login');
    const handleRegisterButton = () => setCurrentModal('register');

    const handleGuestButton = () => {
        handleClose();
    }

    return (
        <div>
            <Modal
                open={authModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={paperStyle}>
                    <Grid container direction="column" justifyContent="space-evenly"
                        alignItems="stretch">
                        <Typography variant='h4' sx={{ color: 'white' }}>Welcome to Wordle!</Typography>
                        <Divider />
                        <Button variant='contained' fullWidth sx={{ mt: '5px' }}
                            onClick={handleLoginButton}>Sign In</Button>
                        <Button variant='contained' fullWidth
                            onClick={handleRegisterButton}>Register</Button>
                        <Button variant='contained' fullWidth
                            onClick={handleGuestButton}>Continue as Guest</Button>
                    </Grid>
                </Paper>

            </Modal >
        </div >
    )
}

const paperStyle = {
    display: 'flex',
    padding: '10px 20px 20px 20px',
    margin: "20px auto",
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '55vh',
    width: 280,
    backgroundColor: '#545454',
    border: '2px solid #CCC',
    boxShadow: 24,
    p: 4,
};
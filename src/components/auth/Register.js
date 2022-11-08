import { useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Register({ setCurrentModal }) {
    const [open, setOpen] = useState(true);
    const handleClose = () => { };

    const handleRegisterButton = () => {
        setCurrentModal('register');
    }

    const handleWelcomeButton = () => {
        setCurrentModal('welcome');
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid>
                    <Paper style={paperStyle}>
                        <Box
                            display='flex'
                            alignItems="left"
                        >
                            <IconButton sx={{ color: 'white', backgroundColor: '#1565c0' }}
                                onClick={handleWelcomeButton}>
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><AccountBoxIcon /></Avatar>
                            <Typography variant="h4" sx={{
                                color: 'white',
                                margin: '5px 0 10px 0'
                            }}>Register Account</Typography>
                        </Grid>
                        <TextField label='Username' placeholder='Enter Username' fullWidth required
                            sx={{
                                input: { color: 'white' }, placeholder:
                                    { color: 'white' }, label: { color: 'white' }
                            }} />
                        <TextField label='Password' placeholder='Enter Password' fullWidth required type='password'
                            sx={{
                                mt: '5px', input: { color: 'white' }, placeholder:
                                    { color: 'white' }, label: { color: 'white' }
                            }} />
                        <TextField label='Confirm Password' placeholder='Enter Same Password' fullWidth required type='password'
                            sx={{
                                mt: '5px', input: { color: 'white' }, placeholder:
                                    { color: 'white' }, label: { color: 'white' }
                            }} />
                        <Button type='submit' color='primary' variant='contained' fullWidth style={btnStyle}>Sign In</Button>
                    </Paper>
                </Grid>
            </Modal>
        </div >
    )
}

const paperStyle = {
    padding: '10px 20px 20px 20px',
    margin: "20px auto",
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '60vh',
    width: 280,
    backgroundColor: '#545454',
    border: '2px solid #CCC',
    boxShadow: 24,
    p: 4,
};

const avatarStyle = {
    backgroundColor: '#14bc14a6',
    color: 'white'
};

const btnStyle = { margin: '8px 0' }

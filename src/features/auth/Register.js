import { useEffect, useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link, Alert } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from 'axios';

export default function Register({ setCurrentModal, authModalOpen, setAuthModalOpen }) {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleClose = () => {
        setAuthModalOpen(false);
    };

    const handleWelcomeButton = () => {
        setCurrentModal('welcome');
    }
    const handleLoginButton = () => {
        setCurrentModal('login')
    }

    useEffect(() => {
        setErrMsg(null)
    }, [user, pwd, confirmPwd])

    const handleEnter = (event) => {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            handleSubmit(event);
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', handleEnter);

        return () => window.removeEventListener('keyup', handleEnter)
    }, [handleEnter]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !pwd || !confirmPwd) {
            setErrMsg('Missing Required Fields');
            return;
        }

        if (pwd !== confirmPwd) {
            setErrMsg('Passwords Do not Match');
            return;
        }

        console.log(user + " : " + pwd + ": " + confirmPwd);

        try {
            const options = {
                method: 'POST',
                url: 'https://incongruous-cyber-passionfruit.glitch.me/register',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: JSON.stringify({ user, pwd })
            };

            const response = await axios.request(options);

            console.log(response?.data.success);

            setSuccess(true);
            setUser('');
            setPwd('');
            setConfirmPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response.');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already exist.');
            } else {
                setErrMsg('Login Failed.');
            }
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPwd(e.target.value);

    return (
        <div>
            <Modal
                open={authModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid>
                    <Paper style={paperStyle}>
                        <Grid container alignItems="left">
                            <IconButton sx={{ color: 'white', backgroundColor: '#1565c0' }} onClick={handleWelcomeButton} >
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Grid>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><AccountBoxIcon /></Avatar>
                            <Typography variant="h4" sx={{
                                color: 'white',
                                margin: '5px 0 20px 0'
                            }}>Register Account</Typography>
                        </Grid>
                        {errMsg && <Alert severity='error' variant="outlined" sx={{ color: '#f44336', margin: '-5px 0 10px 0' }}>{errMsg}</Alert>}
                        {success &&
                            <Alert severity='success' variant="outlined" sx={{ color: 'white', margin: '-5px 0 10px 0' }}
                            >Account Successfully Created!
                                <Button color='primary' variant='contained' sx={{ color: 'white' }} onClick={handleLoginButton} size='small'
                                >Click to Sign In!</Button>
                            </Alert>}
                        <TextField label='Username' placeholder='Enter Username' variant='filled' value={user}
                            fullWidth required onChange={handleUserInput}
                            sx={{ input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField label='Password' placeholder='Enter Password' variant='filled' value={pwd}
                            fullWidth required type='password' onChange={handlePwdInput}
                            sx={{ mt: '8px', input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField label='Confirm Password' placeholder='Enter Same Password' variant='filled' value={confirmPwd}
                            fullWidth required type='password' onChange={handleConfirmPwdInput}
                            sx={{ mt: '8px', input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <Button color='primary' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}
                        >Create Account</Button>
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
    top: '42%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 320,
    backgroundColor: '#2E2E2E',
    border: '2px solid #CCC',
    boxShadow: 24,
    p: 4,
};

const avatarStyle = {
    backgroundColor: '#14bc14a6',
    color: 'white'
};

const btnStyle = { margin: '15px 0' }
import { useEffect, useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link, Alert } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

export default function Login({ setCurrentModal, setIsLoggedIn, authModalOpen, setAuthModalOpen }) {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(null);

    const handleClose = () => {
        setAuthModalOpen(false);
    };

    const handleWelcome = () => {
        setCurrentModal('welcome')
    }

    const handleRegisterButton = () => {
        setCurrentModal('register')
    }

    useEffect(() => {
        setErrMsg(null)
    }, [user, pwd])

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

        if (!user || !pwd) {
            setErrMsg('Missing Username or Password');
            return;
        }

        try {
            const userData = await login({ user, pwd }).unwrap()
            dispatch(setCredentials(userData));
            setUser('');
            setPwd('');
            setIsLoggedIn(true);
            handleClose();
        } catch (err) {
            console.log(err);
            if (!err?.status) {
                setErrMsg('No Server Response');
            } else if (err?.originalStatus === 401) {
                setErrMsg('Username and Password doesn\'t match');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    return (
        <div>
            <Modal
                open={authModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={paperStyle}>
                    <Grid container alignItems="center" direction="column" justifyContent="space-around">
                        <Grid container alignItems="left">
                            <IconButton sx={{ color: 'white', backgroundColor: '#1565c0' }} onClick={handleWelcome} >
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Grid>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <Typography variant="h4" sx={{
                                color: 'white',
                                margin: '5px 0 20px 0'
                            }}>Sign In</Typography>
                        </Grid>
                        {errMsg && <Alert severity='error' variant="outlined" sx={{ color: '#f44336', margin: '-5px 0 10px 0' }}>{errMsg}</Alert>}
                        <TextField label='Username' placeholder='Enter Username' variant='filled'
                            fullWidth required value={user} onChange={handleUserInput}
                            sx={{ input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField label='Password' placeholder='Enter Password' variant='filled' value={pwd}
                            fullWidth required type='password' onChange={handlePwdInput}
                            sx={{ mt: '8px', input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <Button type='submit' color='primary' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}
                        >Sign In</Button>
                        <Link component="button" variant="body2" sx={{ color: 'white' }} onClick={handleRegisterButton}
                        >Need an account? Sign Up</Link>
                    </Grid>
                </Paper>
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
    height: '55vh',
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

const btnStyle = { margin: '15px 0' }

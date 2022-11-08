import { useEffect, useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link, Alert } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

export default function Login({ setCurrentModal, setIsLoggedIn }) {
    const [open, setOpen] = useState(true);
    const handleClose = () => { };
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        setErrMsg(null)
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ user, pwd }).unwrap()
            setCredentials(userData)
            setUser('');
            setPwd('');
            setIsLoggedIn(true);
            setOpen(false);
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={paperStyle}>
                    <Grid container alignItems="center" direction="column" justifyContent="space-around">
                        <Grid container alignItems="left">
                            <IconButton sx={{ color: 'white', backgroundColor: '#1565c0' }}>
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
                            fullWidth required onChange={handleUserInput} 
                            sx={{ input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField label='Password' placeholder='Enter Password' variant='filled'
                            fullWidth required type='password' onChange={handlePwdInput}
                            sx={{ mt: '8px', input: { color: 'white' }, placeholder: { color: 'white' }, label: { color: 'white' } }} />
                        <Button type='submit' color='primary' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}
                        >Sign In</Button>
                        <Link component="button" variant="body2" sx={{ color: 'white' }} onClick={() => { }}
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
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50vh',
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

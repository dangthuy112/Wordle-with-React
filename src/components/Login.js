import { useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Login() {
    const [open, setOpen] = useState(true);
    const handleClose = () => { };
    const handleOpen = () => { };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid>
                    <Paper style={boxStyle}>
                        <Box
                            display='flex'
                            alignItems="left"
                        >
                            <IconButton>
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <Typography variant="h4" sx={{
                                color: 'white',
                                margin: '5px 0 20px 0'
                            }}>Sign In</Typography>
                        </Grid>
                        <TextField label='Username' placeholder='Enter username' fullWidth required />
                        <TextField label='Password' placeholder='Enter password' fullWidth required type='password' />
                        <Button type='submit' color='primary' variant='contained' fullWidth style={btnStyle}>Sign In</Button>
                        <Typography > Need an account?
                            Sign Up
                        </Typography>
                    </Paper>
                </Grid>
            </Modal>
        </div >
    )
}

const boxStyle = {
    padding: '10px 20px 20px 20px',
    margin: "20px auto",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50vh',
    width: 280,
    backgroundColor: 'gray',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const avatarStyle = {
    backgroundColor: '#14bc14a6',
    color: 'gray'
};

const btnStyle = { margin: '8px 0' }

import { useState } from 'react'
import { Button, Modal, Box, Grid, Avatar, Typography, TextField, Paper, IconButton, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Login() {
    const [open, setOpen] = useState(true);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { };

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
                            <IconButton sx={{ color: 'white', backgroundColor: '#1565c0' }}>
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
                        <Button type='submit' color='primary' variant='contained' fullWidth style={btnStyle}>Sign In</Button>
                        <Link component="button" variant="body2" sx={{ color: 'white' }} onClick={() => { }}
                        >Need an account? Sign Up</Link>
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

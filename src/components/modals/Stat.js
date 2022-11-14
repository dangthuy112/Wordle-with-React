import CloseIcon from '@mui/icons-material/Close';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Modal, Grid, Typography, Paper, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetHistoryQuery, useGetStatQuery } from '../../features/user/userApiSlice';
import { selectCurrentID } from '../../features/auth/authSlice';

export default function Stat({ statModalOpen, setStatModalOpen }) {
    const id = useSelector(selectCurrentID);
    const { data: history, isLoading, isSuccess, isError, error } = useGetHistoryQuery(id);
    const { data: stat } = useGetStatQuery(id);

    const handleClose = () => {
        setStatModalOpen(false);
    };

    let statContent;
    let historyContent;
    if (isLoading) {
        historyContent = <p>Loading...</p>
    } else if (isSuccess) {
        statContent = (
            <Grid container justifyContent='center' alignItems='flex-start' sx={{ p: '5px 40px' }}>
                <Grid container direction='column' justifyContent='flex-start' alignContent='center' sx={{
                    width: '40px', p: '0 35px'
                }}>
                    <Typography variant='h4'>{stat.played}</Typography>
                    <Typography variant='caption'>Played</Typography>
                </Grid>
                <Grid container direction='column' justifyContent='flex-start' alignContent='center' sx={{
                    width: '40px', p: '0 35px'
                }}>
                    <Typography variant='h4'>{Math.floor(100 * (stat.gamesWon / stat.played))}</Typography>
                    <Typography variant='caption'>Win%</Typography>
                </Grid>
                <Grid container direction='column' justifyContent='flex-start' alignContent='center' sx={{
                    width: '40px', p: '0 35px'
                }}>
                    <Typography variant='h4'>{stat.currentStreak}</Typography>
                    <Typography variant='caption'>Current Streak</Typography>
                </Grid>
                <Grid container direction='column' justifyContent='flex-start' alignContent='center' sx={{
                    width: '40px', p: '0 35px'
                }}>
                    <Typography variant='h4'>{stat.maxStreak}</Typography>
                    <Typography variant='caption'>Max Streak</Typography>
                </Grid>
            </Grid>
        )

        let keyCount = 0;
        historyContent =
            <Grid container direction='column' >
                {history.length === 0 ?
                    <Typography variant='body2' align='center' sx={{ m: '0' }}>
                        No Previous Games Yet... Play One to Update Your Stat!
                    </Typography>
                    :
                    history.map((game) => {
                        return (
                            <Grid key={keyCount++} container justifyContent='flex-start' alignItems='center' sx={{ m: '2px 0px' }}>
                                <Typography variant='button' align='left' sx={{ padding: '3px 10px', width: '55px' }}
                                >{game.solution}</Typography>
                                {
                                    game.guesses !== 0 ? <Grid container justifyContent='flex-end' alignContent='center' sx={{
                                        width: `${13 * game.guesses}%`, background: '#52914d', pr: '5px', height: '25px'
                                    }}> {game.guesses}  </Grid>
                                        : <CloseOutlinedIcon sx={{ color: 'red' }} />
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
    } else if (isError) {
        historyContent = <p>{error}</p>
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
                        {statContent}
                        <Typography variant='h5' align='center' sx={{ m: '10px 0' }}>
                            Previous Games
                        </Typography>
                        {historyContent}
                    </Grid>
                </Paper>
            </Modal>
        </div >
    )
}

const paperStyle = {
    color: '#EBEBEB',
    padding: '20px 20px 40px 20px',
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
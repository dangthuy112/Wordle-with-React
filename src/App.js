import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { useGetWordsQuery } from './features/words/wordsApiSlice';
import { useState, useEffect } from 'react';
import Wordle from './components/Wordle'
import ProfileMenu from './components/ProfileMenu'
import AuthModal from './features/auth/AuthModal';
import HelpIcon from '@mui/icons-material/Help';
import { Box } from '@mui/system';
import Help from './components/modals/Help';
import Stat from './components/modals/Stat';
import { useDispatch } from 'react-redux';
import { getNewSolution } from './features/words/wordsSlice';

function App() {
  const { data: words, isLoading, isSuccess, isError, error } = useGetWordsQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [statModalOpen, setStatModalOpen] = useState(false);
  const dispatch = useDispatch();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <Wordle authModalOpen={authModalOpen} isLoggedIn={isLoggedIn} />
  } else if (isError) {
    content = <p>{error}</p>
  }

  //once wordsDB.json has been fetched, grab the first solution
  useEffect(() => {
    if (isSuccess) {
      dispatch(getNewSolution(words));
    }
  }, [words])

  const handleHelpModal = () => {
    setHelpModalOpen(true);
  }

  return (
    <div className="App">
      {authModalOpen && <AuthModal setIsLoggedIn={setIsLoggedIn}
        authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />}
      {helpModalOpen && <Help helpModalOpen={helpModalOpen} setHelpModalOpen={setHelpModalOpen} />}
      {statModalOpen && <Stat statModalOpen={statModalOpen} setStatModalOpen={setStatModalOpen} />}
      <Grid container direction='column' justifyItems='flex-end' >
        <Grid container item direction='column' justifyContent='center' alignContent='center'>
          <Grid wrap='nowrap' container alignItems='center' justifyContent="space-between" sx={{ p: '6px 20px 6px 20px' }}>
            <Box sx={{ width: '300px' }} />
            <Typography variant='h3' sx={{ m: '10px' }}
            >Wordle</Typography>
            <Grid container justifyContent='flex-end' alignItems='center' sx={{ width: '300px' }} >
              <IconButton sx={{ color: 'white', backgroundColor: '#1565c0', mr: '10px', mb: '5px' }} onClick={handleHelpModal}>
                <HelpIcon />
              </IconButton>
              <ProfileMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAuthModalOpen={setAuthModalOpen}
                setStatModalOpen={setStatModalOpen} />
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: 'white', mb: '15px' }} />
          <section>
            <Grid container justifyContent='center'>
              {content}
            </Grid>
          </section>
        </Grid>
      </Grid>
    </div>
  );
}

export default App
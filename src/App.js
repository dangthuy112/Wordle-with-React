import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { useGetWordsQuery } from './features/words/wordsApiSlice';
import { useState } from 'react';
import Wordle from './components/Wordle'
import ProfileMenu from './components/ProfileMenu'
import AuthModal from './features/auth/AuthModal';
import HelpIcon from '@mui/icons-material/Help';
import { Box } from '@mui/system';

function App() {
  const { isLoading, isSuccess, isError, error } = useGetWordsQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(true);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <Wordle authModalOpen={authModalOpen} />
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="App">
      {authModalOpen && <AuthModal setIsLoggedIn={setIsLoggedIn}
        authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />}
      <Grid container direction='column' justifyItems='flex-end' >
        <Grid container item direction='column' justifyContent='center' alignContent='center'>
          <Grid wrap='nowrap' container alignItems='center' justifyContent="space-between" sx={{ p: '6px 20px 6px 20px' }}>
            <Box sx={{ width: '300px' }} />
            <Typography variant='h3' sx={{ m: '10px' }}
            >Wordle</Typography>
            <Grid container justifyContent='flex-end' alignItems='center' sx={{ width: '300px' }} >
              <IconButton sx={{ color: 'white', backgroundColor: '#1565c0', mr: '10px', mb: '5px' }} onClick={() => { }}>
                <HelpIcon />
              </IconButton>
              <ProfileMenu isLoggedIn={isLoggedIn} setAuthModalOpen={setAuthModalOpen} />
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
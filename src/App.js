import { Divider, Grid, Typography } from '@mui/material';
import { useGetWordsQuery } from './features/words/wordsApiSlice';
import { useState } from 'react';
import Wordle from './components/Wordle'
import AuthModal from './features/auth/AuthModal';

function App() {
  const { isLoading, isSuccess, isError, error } = useGetWordsQuery();
  const [isGuest, setIsGuest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let content;
  if (isLoading || !isLoggedIn) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <Wordle />
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="App">
      <Grid container direction='column' justifyItems='flex-end'>
        <Grid item>
          <Typography variant='h3' sx={{ p: '10px' }}>Wordle</Typography>
          <Divider sx={{ borderColor: 'white', mb: '15px' }} />
          <section>
            <AuthModal setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest} />
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
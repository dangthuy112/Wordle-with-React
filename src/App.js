import { Divider, Typography } from '@mui/material';
import { useGetWordsQuery } from './features/wordsSlice';
import { useState } from 'react';
import Wordle from './components/Wordle'
import AuthModal from './components/auth/AuthModal';

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
      <Typography variant='h3' sx={{ p: '10px' }}>Wordle</Typography>
      <Divider sx={{ borderColor: 'white', mb: '15px' }} />
      <section>
        <AuthModal setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest} />
        {content}
      </section>
    </div>
  );
}

export default App
import Wordle from './components/Wordle'
import { useGetWordsQuery } from './features/wordsSlice';

function App() {
  const { isLoading, isSuccess, isError, error } = useGetWordsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <Wordle />
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <section>
        {content}
      </section>
    </div>
  );
}

export default App
import { useEffect, useState } from "react";
import Wordle from './components/Wordle'
import { useDispatch, useSelector } from "react-redux";
import { selectSolution, setSolutionAsync } from "./features/wordsSliceOriginal";
import { useGetWordsQuery } from './features/wordsSlice';

function App() {
  const [words, setWords] = useState([]);
  const solution = useSelector(selectSolution);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch('https://incongruous-cyber-passionfruit.glitch.me/wordsDB.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setWords([...data.solutions]);
    //     const randomSolution = data.solutions[Math.floor(Math.random() * data.solutions.length)];
    //     dispatch(setSolutionAsync(randomSolution.word));
    //   })
    const {
      data: posts,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetWordsQuery('getPosts')
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle words={words} />}
    </div>
  );
}

export default App
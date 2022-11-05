import { useEffect, useState } from "react";
import Wordle from './components/Wordle'
import { useDispatch, useSelector } from "react-redux";
import { selectSolution, setSolutionAsync } from "./features/slices/solutionSlice";

function App() {
  const [words, setWords] = useState([]);
  const solution = useSelector(selectSolution);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch('http://localhost:3001/solutions')
    //   .then(res => res.json())
    //   .then(json => {
    //     setWords([...json]);
    //     const randomSolution = json[Math.floor(Math.random() * json.length)];
    //     dispatch(setSolutionAsync(randomSolution.word));
    //   })
    fetch('https://incongruous-cyber-passionfruit.glitch.me/wordsDB.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setWords([...data.solutions]);
        const randomSolution = data.solutions[Math.floor(Math.random() * data.solutions.length)];
        dispatch(setSolutionAsync(randomSolution.word));
      })
  }, []);

  return (
    <div className="App">

      <h1>Wordle</h1>
      <p>{solution}</p>
      {solution && <Wordle words={words} />}
    </div>
  );
}

export default App
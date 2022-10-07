import { useEffect, useState } from "react";
import Wordle from './components/Wordle'

function App() {
  const [solution, setSolution] = useState(null);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        setWords([...json]);
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      })
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} setSolution={setSolution} words={words} />}
    </div>
  );
}

export default App
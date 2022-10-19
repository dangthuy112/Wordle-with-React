import { useEffect, useState } from "react";
import Wordle from './components/Wordle'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSolution } from "./redux/slices/solutionSlice";

function App() {
  // const [solution, setSolution] = useState(null);
  const [definition, setDefinition] = useState({});
  const [words, setWords] = useState([]);
  const { solution } = useSelector((state) => state.solution);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        setWords([...json]);
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        // setSolution(randomSolution.word);
        dispatch(setSolution(randomSolution.word));

        //debug delete
        console.log(solution);

        //get definition from WordsAPI
        const options = {
          method: 'GET',
          url: `https://wordsapiv1.p.rapidapi.com/words/${randomSolution.word}/definitions`,
          headers: {
            'X-RapidAPI-Key': '1ef2003126msh860b9a466280f3bp1d15d2jsnc4b51c4616db',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
          }
        };

        axios.request(options).then(function (response) {
          setDefinition(response.data.definitions);
        }).catch(function (error) {
          console.error(error);
        });
      })
  }, []);

  return (
    <div className="App">

      <h1>Wordle</h1>
      <p>{solution}</p>
      {solution && <Wordle definition={definition}
        setDefinition={setDefinition} words={words} />}
    </div>
  );
}

export default App
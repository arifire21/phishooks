import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function PastResults(newResult) {
  //state variable for adding
  //https://medium.com/codex/how-to-use-array-in-reactjs-2a30d8b72503
  const [results, setResults] = useState([]);

  const addRow=()=>{
    let resForRow={name:newResult}
    setResults([...results, resForRow])
  }

  return (
    <ListGroup as="ol" numbered style={{float:"right"}}>
      {/* <ListGroup.Item as="li">Cras justo odio</ListGroup.Item> */}

      {results.map( (result, index)=>
       (
          <ListGroup.Item as="li" key={index}>
              <h3>{result.name}</h3>
              <p>test</p>
          </ListGroup.Item>
       )
       )}
    </ListGroup>
  );
}

export default PastResults;
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
    <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
    </ListGroup>
  );
}

export default PastResults;
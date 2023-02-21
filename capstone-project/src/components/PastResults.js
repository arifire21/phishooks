import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function PastResults(props) {
  const arr = props.list

  return (
    <ListGroup as="ol" numbered>
      { arr.map((search, index) => {
        return <ListGroup.Item key={index}  as="li" onClick={() => {
          props.research(search)
          props.removal(index)
        }
        }>{search}</ListGroup.Item>
      })}
    </ListGroup>
  );
}

export default PastResults;
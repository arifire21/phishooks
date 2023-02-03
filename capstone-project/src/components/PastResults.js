import ListGroup from 'react-bootstrap/ListGroup';

function PastResults() {
  return (
    <ListGroup as="ol" numbered style={{float:"right"}}>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
    </ListGroup>
  );
}

export default PastResults;
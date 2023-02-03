import Accordion from 'react-bootstrap/Accordion';

function DetailsAccordion({header}) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
          
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DetailsAccordion;
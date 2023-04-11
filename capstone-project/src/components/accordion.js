import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import React from 'react';

function DetailsAccordion({header}) {

  function scanUrl(url) {
    axios.post('http://localhost:7006/api/scan-url', { url: url })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    if (header) {
      scanUrl(header);
    }
  }, [header]);

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

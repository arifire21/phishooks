import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import React from 'react';

function DetailsAccordion({header}) {

  function scanUrl() {
    axios.post('http://localhost:7006/api/scan-url', { url: header})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
        {JSON.stringify(scanUrl, null, 2)}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DetailsAccordion;

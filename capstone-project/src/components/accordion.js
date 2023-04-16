import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import React, { useState } from 'react';

function DetailsAccordion({header}) {
  const [result, setResult] = useState(null);

  function scanUrl() {
    axios.post('http://localhost:7006/api/scan-url', { url: header})
      .then((response) => {

        setResult(response.data);
      })
      .catch((error) => {
        setResult(error);
      });
  }

  // Call the scanUrl function when the component mounts
  React.useEffect(() => {
    scanUrl();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
          {result ? JSON.stringify(result, null, 2) : "Loading..."}/99 vendors view this URL as harmless.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DetailsAccordion;



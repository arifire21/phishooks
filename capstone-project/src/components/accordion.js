import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import React, { useState } from 'react';

function DetailsAccordion({header}) {
  const [harmlessResult, setHarmlessResult] = useState(null);
  const [maliciousResult, setMaliciousResult] = useState(null);
  const [suspiciousResult, setSuspiciousResult] = useState(null);
  const [undetectedResult, setUndetectedResult] = useState(null);
  const [errorResult, setErrorResult] = useState(null);
  const [totalVendors, setTotalVendors] = useState(99);
  // const [results, setResults] = useState([]) 

  function scanUrl() {
    let tempTotal = 0;

    axios.post('http://localhost:7006/api/scan-url', { url: header})
      .then((response) => {
        setHarmlessResult(response.data.attributes.stats.harmless);
        setMaliciousResult(response.data.attributes.stats.malicious);
        setSuspiciousResult(response.data.attributes.stats.suspicious);
        setUndetectedResult(response.data.attributes.stats.undetected);
        console.log(harmlessResult + " " + maliciousResult + " " + suspiciousResult + " " + undetectedResult)

        for (let vendor in response.data.attributes.results) {
          tempTotal++
          console.log(vendor)
          console.log(vendor.category)
          console.log(vendor.method)
        }
        setTotalVendors(tempTotal)
      })
      .catch((error) => {
        setErrorResult(error);
      });
  }

  // Call the scanUrl function when the component mounts
  React.useEffect(() => {
    scanUrl();
  }, []);

  return (
    <>
    <p>{header}</p>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Details</Accordion.Header>
        <Accordion.Body>
          <p>{harmlessResult ? JSON.stringify(harmlessResult, null, 2) : "0"}/{totalVendors} vendors view this URL as harmless.</p>
          <p>{maliciousResult ? JSON.stringify(maliciousResult, null, 2) : "0"}/{totalVendors} vendors view this URL as malicious.</p>
          <p>{suspiciousResult ? JSON.stringify(suspiciousResult, null, 2): "0"}/{totalVendors} vendors view this URL as suspicious.</p>
          <p>{undetectedResult ? JSON.stringify(undetectedResult, null, 2) : "0"}/{totalVendors} vendors did not detect anything.</p>
          <p>{errorResult}</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Advanced (Vendor Rulings)</Accordion.Header>
        <Accordion.Body>
          <p>TBD</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}

export default DetailsAccordion;



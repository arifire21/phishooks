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

  // var vendors = [];
  // var details = [];
  var results = [];

  function scanUrl() {
    let tempTotal = 0;

    axios.post('http://localhost:7006/api/scan-url', { url: header})
      .then((response) => {
        if(response.data.attributes.status === "queued"){
          setErrorResult("Too many requests, please try again later!");
        }else{
          console.log(response.data.attributes.stats)
          setHarmlessResult(response.data.attributes.stats.harmless);
          setMaliciousResult(response.data.attributes.stats.malicious);
          setSuspiciousResult(response.data.attributes.stats.suspicious);
          setUndetectedResult(response.data.attributes.stats.undetected);
          console.log(harmlessResult + " " + maliciousResult + " " + suspiciousResult + " " + undetectedResult)

        for (let vendor in response.data.attributes.results) {
          tempTotal++
          // console.log(response.data.attributes.results[vendor])
          // console.log(response.data.attributes.results[vendor].category)
          // console.log(response.data.attributes.results[vendor].method)

          // vendors.push(response.data.attributes.results[vendor].engine_name)
          // details.push({
            results.push({
              key: "Vendor",
              value: response.data.attributes.results[vendor].engine_name
            },{
            key:   "Ruling",
            value: response.data.attributes.results[vendor].category
            },{
            key:   "Method",
            value: response.data.attributes.results[vendor].method
          })
        }
        setTotalVendors(tempTotal)
        console.log(tempTotal)
        console.log(vendors)
        console.log(details)
        }
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
    <p><b>{header}</b></p>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Details</Accordion.Header>
        <Accordion.Body>
          {/* if theres an error, throw it. if not, display the results (hopefully) */}
          {errorResult ? JSON.stringify(errorResult, null, 2) :(
            <>
            <p><b>{harmlessResult ? JSON.stringify(harmlessResult, null, 2) : "0"}</b> vendors view this URL as harmless.</p>
            <p><b>{maliciousResult ? JSON.stringify(maliciousResult, null, 2) : "0"}</b> vendors view this URL as malicious.</p>
            <p><b>{suspiciousResult ? JSON.stringify(suspiciousResult, null, 2): "0"}</b> vendors view this URL as suspicious.</p>
            <p><b>{undetectedResult ? JSON.stringify(undetectedResult, null, 2) : "0"}</b> vendors did not detect anything.</p>
            <p>Total vendors analyzed: <b>{totalVendors}</b></p>
            </>
          )}
          {/* <p>{errorResult && (JSON.stringify(errorResult, null, 2))}</p> */}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Advanced (Vendor Rulings)</Accordion.Header>
        <Accordion.Body>
        {results.map(([key, value]) => (
            <>
            <p>{key}</p>
            <small>{value}</small>
            </>
        ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}

export default DetailsAccordion;



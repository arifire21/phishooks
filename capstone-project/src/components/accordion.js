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

  const results = {};

  var vendors = [];
  var rulings = [];
  var methods = [];

  // const results = [];

  function scanUrl() {
    let tempTotal = 0;

    axios.post('http://localhost:7006/api/scan-url', { url: header })
      .then((response) => {
        let attrs = response.data.attributes;
        if (attrs.status === "queued") {
          setErrorResult(`Too many requests, please try again later!`);
        } else {
          console.log(attrs.stats)
          setHarmlessResult(attrs.stats.harmless);
          setMaliciousResult(attrs.stats.malicious);
          setSuspiciousResult(attrs.stats.suspicious);
          setUndetectedResult(attrs.stats.undetected);
          // console.log(harmlessResult + " " + maliciousResult + " " + suspiciousResult + " " + undetectedResult)

          for (let vendor in attrs.results) {
            tempTotal++;

            results[attrs.results[vendor].engine_name] = {
              "Ruling" : attrs.results[vendor].category,
              "Method": attrs.results[vendor].method
            }

            // vendors.push(attrs.results[vendor].engine_name);
            // rulings.push(attrs.results[vendor].category);
            // methods.push(attrs.results[vendor].method);

            // results.push(
            //   <div key={attrs.results[vendor].engine_name} className='results-item'>
            //     <p>{attrs.results[vendor].engine_name}</p>
            //     <small>Ruling: {attrs.results[vendor].category}</small>
            //     <small>Method: {attrs.results[vendor].method}</small>
            //   </div>
            // )
          }

          setTotalVendors(tempTotal)
          console.log(tempTotal)
          console.log(results)
        }
      })
      .catch((error) => {
        if(errorResult === null){ //if not already set by queued status
          setErrorResult(JSON.stringify([error.message, error.name, error.code], null, 2));
        }
      });
  }

  // Call the scanUrl function when the component mounts
  React.useEffect(() => {
    scanUrl();
  }, [header]);

  return (
    <>
    <p><b>{header}</b></p>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Details</Accordion.Header>
        <Accordion.Body>
          {/* if theres an error, throw it. if not, display the results */}
          {errorResult ? (
            <>
            <p>{errorResult}</p>
            </>
          ) : (
            <>
            <p><b>{harmlessResult ? JSON.stringify(harmlessResult, null, 2) : "0"}</b> vendors view this URL as harmless.</p>
            <p><b>{maliciousResult ? JSON.stringify(maliciousResult, null, 2) : "0"}</b> vendors view this URL as malicious.</p>
            <p><b>{suspiciousResult ? JSON.stringify(suspiciousResult, null, 2): "0"}</b> vendors view this URL as suspicious.</p>
            <p><b>{undetectedResult ? JSON.stringify(undetectedResult, null, 2) : "0"}</b> vendors did not detect anything.</p>
            <p>Total vendors analyzed: <b>{totalVendors}</b></p>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Advanced (Vendor Rulings)</Accordion.Header>
        <Accordion.Body>
          {/* {
            Object.entries(results)
            .map( ([key, value]) => 
              <>
              <p key={key}>{key}</p>
              <small key={key}>{value}</small>
              </>
            )
          } */}

          {/* <div className='results-container'>
            {vendors.map((vendor) => (
              <p key={vendor}>{vendor}</p>
            ))}
          </div> */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}

export default DetailsAccordion;



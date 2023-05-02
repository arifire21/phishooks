import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import React, { useState } from 'react';

function DetailsAccordion({ header }) {
  const [harmlessResult, setHarmlessResult] = useState(null);
  const [maliciousResult, setMaliciousResult] = useState(null);
  const [suspiciousResult, setSuspiciousResult] = useState(null);
  const [undetectedResult, setUndetectedResult] = useState(null);
  const [errorResult, setErrorResult] = useState(null);
  const [totalVendors, setTotalVendors] = useState(0);
  const [vendors, setVendors] = useState([]);

  function scanUrl() {
    let tempTotal = 0;
    const vendorDetails = [];

    axios.post('https://arifire21.github.io/Team-7-Capstone-Backend/api/scan-url', { url: header })
      .then((response) => {
        let attrs = response.data.data.attributes;
        if (attrs.status === "queued") {
          setErrorResult(`Too many requests, please try again later!`);
        } else {
          setHarmlessResult(attrs.stats.harmless);
          setMaliciousResult(attrs.stats.malicious);
          setSuspiciousResult(attrs.stats.suspicious);
          setUndetectedResult(attrs.stats.undetected);

          for (let vendor in attrs.results) {
            tempTotal++;

            const vendorInfo = {
              name: attrs.results[vendor].engine_name,
              category: attrs.results[vendor].category,
              result: attrs.results[vendor].result,
              method: attrs.results[vendor].method,
            };
            vendorDetails.push(vendorInfo);
          }

          setTotalVendors(tempTotal);
          setVendors(vendorDetails);
        }
      })
      .catch((error) => {
        if (errorResult === null) { // if not already set by queued status
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
      <p style={{textAlign:"center"}}><b>{header}</b></p>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Details</Accordion.Header>
          <Accordion.Body>
            {/* if there's an error, throw it. if not, display the results */}
            {errorResult ? (
              <>
                <p>{errorResult}</p>
              </>
            ) : (
              <>
                <p><b>{harmlessResult ? JSON.stringify(harmlessResult, null, 2) : "0"}</b> vendors view this URL as harmless.</p>
                <p><b>{maliciousResult ? JSON.stringify(maliciousResult, null, 2) : "0"}</b> vendors view this URL as malicious.</p>
                <p><b>{suspiciousResult ? JSON.stringify(suspiciousResult, null, 2) : "0"}</b> vendors view this URL as suspicious.</p>
                <p><b>{undetectedResult ? JSON.stringify(undetectedResult, null, 2) : "0"}</b> vendors did not detect anything.</p>
                <p>Total vendors analyzed: <b>{totalVendors}</b></p>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Advanced (Vendor Rulings)</Accordion.Header>
          <Accordion.Body>
          <Tabs
              defaultActiveKey="harmless"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="harmless" title="Harmless" disabled={harmlessResult > 0 ? false : false}>
                  <div className='results-container'>
                    {vendors.filter(vendor => vendor.category === "harmless").map((vendor, index) => (
                      <div key={index} className='results-item'>
                        <p className='vendor-name'><b>{vendor.name}</b></p>
                        <p className='vendor-detail'><b>Category:</b> {vendor.category}</p>
                        <p className='vendor-detail'><b>Result:</b> {vendor.result}</p>
                        <p className='vendor-detail'><b>Method:</b> {vendor.method}</p>
                        {index !== vendors.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
              </Tab>
              <Tab eventKey="malicious" title="Malicious" disabled={maliciousResult > 0 ? false : true}>
                  <div className='results-container'>
                    {vendors.filter(vendor => vendor.category === "malicious").map((vendor, index) => (
                      <div key={index} className='results-item'>
                        <p className='vendor-name'><b>{vendor.name}</b></p>
                        <p className='vendor-detail'><b>Category:</b> {vendor.category}</p>
                        <p className='vendor-detail'><b>Result:</b> {vendor.result}</p>
                        <p className='vendor-detail'><b>Method:</b> {vendor.method}</p>
                        {index !== vendors.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
              </Tab>
              <Tab eventKey="suspicious" title="Suspicious" disabled={suspiciousResult > 0 ? false : true}>
                  <div className='results-container'>
                    {vendors.filter(vendor => vendor.category === "suspicious").map((vendor, index) => (
                      <div key={index} className='results-item'>
                        <p className='vendor-name'><b>{vendor.name}</b></p>
                        <p className='vendor-detail'><b>Category:</b> {vendor.category}</p>
                        <p className='vendor-detail'><b>Result:</b> {vendor.result}</p>
                        <p className='vendor-detail'><b>Method:</b> {vendor.method}</p>
                        {index !== vendors.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
              </Tab>
              <Tab eventKey="undetected" title="Undetected" disabled={undetectedResult > 0 ? false : true}>
                  <div className='results-container'>
                    {vendors.filter(vendor => vendor.category === "undetected").map((vendor, index) => (
                      <div key={index} className='results-item'>
                        <p className='vendor-name'><b>{vendor.name}</b></p>
                        <p className='vendor-detail'><b>Category:</b> {vendor.category}</p>
                        <p className='vendor-detail'><b>Result:</b> {vendor.result}</p>
                        <p className='vendor-detail'><b>Method:</b> {vendor.method}</p>
                        {index !== vendors.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
              </Tab>
            </Tabs>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default DetailsAccordion;



import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ImSearch} from 'react-icons/im';
// import PastResults from './components/PastResults';
import ResultsToggle from './components/ResultsToggle';
import DetailsAccordion from './components/accordion';
import React, { useState } from 'react';

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [newResArray, setNewResArray] = useState([]);

  function handleSubmit(url) {    
    setInputUrl(url)
    addToArray(url)
    setTempUrl("")
  };

  function removeSearch(index) {    
    const tempArr = []
    for (let i = 0; i < newResArray.length; i++) {
      if (i != index) {
        tempArr.push(newResArray[i])
      }
    }
    setNewResArray(tempArr)
  };

  function addToArray(tempUrl) {
    if ((newResArray.length) < 10) {
      setNewResArray(prev => ([... prev, tempUrl]));
    } else {
      setNewResArray(prev => {
        const old = [...prev, tempUrl]
        old.shift()
        return old
    })
    }
    console.log(newResArray)
  };

  return (
    <>
      <header className="App-header">
        <ResultsToggle list={newResArray} research={handleSubmit} removal={removeSearch}/>
      </header>
    <div className='App'>
      <img src={LightLogo} alt="logo" />

        <Form>
          <Row className="align-items-center" style={{width:"100%"}}>
            <Col xs={9}>
              <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>URL</Form.Label>
              <Form.Control type="text" name="url" value={tempUrl} onChange={e => setTempUrl(e.target.value)}/>
              </Form.Group>
            </Col>
            
            <Col style={{marginTop:"16px", padding:"0"}}>
              <Button variant="primary" onClick={() => handleSubmit(tempUrl)}><ImSearch/> Search</Button>
            </Col>
          </Row>
        </Form>

        <DetailsAccordion header={inputUrl}/>
      </div>
    </>
  );
}

export default App;

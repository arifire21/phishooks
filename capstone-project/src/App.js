import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ImSearch} from 'react-icons/im';
import AboutToggle from './components/AboutToggle';
import ResultsToggle from './components/ResultsToggle';
import DetailsAccordion from './components/accordion';
import React, { useState } from 'react';

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [newResArray, setNewResArray] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isInvalid, setInvalidity] = useState(null);  //set to null so the styling isnt applied at page load
  const [isValid, setValidity] = useState(null);      //set to null so the styling isnt applied at page load

  function handleSubmit(url) {    
    if(validateOnSubmit(url)){
      setVisible(true)
      setInputUrl(url)
      addToArray(url)
      setTempUrl("")
      setInvalidity(null)
      setValidity(null)
    } else{
      setVisible(false)
      setInvalidity(true)
      setValidity(false)
    }
  };

  function checkValidation(newInput){
    if (newInput === '') {
      // console.log(newInput)
      console.log("debug: str empty, form invalid")
      setInvalidity(true)
      setValidity(false)
    } else{
      // console.log(newInput)
      console.log("debug: form valid")
      setInvalidity(false)
      setValidity(true)
    }
  }

  function validateOnSubmit(url){
    if (url === '') {
      console.log("debug: CHECK ON SUBMIT form invalid")
      return false;
    }else{
      console.log("debug: CHECK ON SUBMIT form valid")
      return true;
    }
  }

  function removeSearch(index) {    
    const tempArr = []
    for (let i = 0; i < newResArray.length; i++) {
      if (i !== index) {
        tempArr.push(newResArray[i])
      }
    }
    setNewResArray(tempArr)
  };

  function addToArray(tempUrl) {
    if ((newResArray.length) < 10) {
      setNewResArray(prev => ([...prev, tempUrl]));
    } else {
      setNewResArray(prev => {
        const old = [...prev, tempUrl]
        old.shift()
        return old
    })
    }
    console.log(newResArray)
  };

  window.onload = function(){
    //listener for sticky disclaimer
    const el = document.querySelector(".disclaimer-container")
    const observer = new IntersectionObserver( 
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );
    observer.observe(el);
  }

  return (
    <>
    <div className='App'>
      <header className="App-header">
        <ResultsToggle list={newResArray} research={handleSubmit} removal={removeSearch} addition={addToArray}/>
        <AboutToggle/>
      </header>

      <img src={LightLogo} alt="logo" className='logo'/>
      <p>Enter a URL below to check its validity. Must end in a top-level domain (.com, .gov, .co.uk, .de, etc.)</p>

      <Form noValidate className='url-form' onSubmit={e => {
        e.preventDefault();  // Prevent the default form submission behavior
        handleSubmit(tempUrl);
      }}>
        <Row className='form-row'>
          <Col xs={5} className='col-mobile'>
            <Form.Group controlId="formInput">
              {/* <Form.Label>URL</Form.Label> */}
              <Form.Control
                required
                isInvalid={isInvalid}
                isValid={isValid}
                placeholder='Enter a URL...'
                type="text"
                name="url"
                value={tempUrl} 
                onChange={e => {setTempUrl(e.target.value); checkValidation(e.target.value)}}
              />
              <Form.Control.Feedback type="invalid">
                URL is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
                  
          <Col className='btn-col'>
            <Button variant='primary' type="submit"><ImSearch/> Search</Button>
          </Col>
        </Row>
      </Form>

        <div className='disclaimer-container'>
          <p className='disclaimer'><b>Disclaimer:</b> Though a URL may be deemed harmless by us, that may not necessarily mean it is fully harmless. Please proceed with caution if attempting to visit any URLs you scan.</p>
        </div>
        {isVisible && <DetailsAccordion header={inputUrl}/>}
      </div>
    </>
  );
}

export default App;

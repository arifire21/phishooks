import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ImSearch} from 'react-icons/im';
import PastResults from './components/PastResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={LightLogo} alt="logo" style={{marginBottom:"2rem"}}/>
      </header>

        <Form>
          <Row className="align-items-center" style={{width:"100%"}}>
            <Col xs={9}>
              <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>URL</Form.Label>
              <Form.Control type="text" />
              </Form.Group>
            </Col>
            
            <Col style={{marginTop:"16px", padding:"0"}}>
              <Button variant="primary" type="submit"><ImSearch/> Search</Button>
            </Col>
          </Row>
        </Form>

        <PastResults/>
    </div>
  );
}

export default App;

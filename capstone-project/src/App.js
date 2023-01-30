import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ImSearch} from 'react-icons/im';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={LightLogo} alt="logo" style={{marginBottom:"2rem"}}/>
      </header>

        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>URL or Hash</Form.Label>
              <Form.Control type="text" />
              </Form.Group>
            </Col>
            
            <Col xs="auto" style={{marginTop:"16px"}}>
              <Button variant="primary" type="submit">
              <ImSearch/> Search
              </Button>
            </Col>
          </Row>
        </Form>
    </div>
  );
}

export default App;

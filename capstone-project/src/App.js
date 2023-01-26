import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';
import DetailsAccordion from './components/accordion';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={LightLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant='success'>TEST BTN</Button>
        <DetailsAccordion/>
      </header>
    </div>
  );
}

export default App;

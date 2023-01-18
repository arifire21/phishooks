import './App.scss';
import Button from 'react-bootstrap/Button';
import LightLogo from './logos/LogoLight.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={LightLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Button variant='success'>TEST BTN</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

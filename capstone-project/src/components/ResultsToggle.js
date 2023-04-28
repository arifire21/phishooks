import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import PastResults from '../components/PastResults';

function ResultsToggle(props) {
    const [isChecked, setChecked] = useState(false);
    const handleClose = () => setChecked(false);
  
    return(
        <>
            <Form className='results-switch'>
                <Form.Switch 
                // id="results-switch"
                label="See past results"
                checked={isChecked}
                onChange={e => setChecked(e.target.value)}
                />
            </Form>

            <Offcanvas show={isChecked} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Past Searches</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <PastResults list={props.list} research={props.research} removal={props.removal} addition={props.addition}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default ResultsToggle;
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

function AboutToggle(props) {
    const [isChecked, setChecked] = useState(false);
    const handleClose = () => setChecked(false);
  
    return(
        <>
            <Form className='results-switch'>
                <Form.Switch 
                label="About PhisHooks"
                checked={isChecked}
                onChange={e => setChecked(e.target.value)}
                />
            </Form>

            <Offcanvas show={isChecked} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>What is PhisHooks?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    PhisHooks is a phishing detection tool made to show an easy-to-read analysis on any link you may find suspicious.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AboutToggle;
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function GoalModal({ goalData, onClose, onSaveChanges }) {  

    const [formData, setFormData] = useState({});

    console.log("In GoalModal should be setting visible");

    useEffect(() => {
        // Set formData when goalData changes
        setFormData(goalData);
    }, [goalData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSaveChanges(formData);
    };

    
    return (
        <>
            <Modal>
            <Modal.Header closeButton>
                <Modal.Title>Edit your backlogged item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="goalForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a short title"
                            autoFocus
                            name='title'
                            value={formData.title || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="goalForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name='description'
                            value={formData.description || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ImCheckmark2, ImCheckmark } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";

export default function GoalModal({ goalData, show, onDelete, onClose, onSaveChanges }) {  

    const [formData, setFormData] = useState({});
    const [checked, setChecked] = useState(goalData.complete ?? false);

    useEffect(() => {
        // Set formData when goalData changes
        setFormData(goalData);
    }, [goalData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!! ADD LOGIC TO HANDLE REQUIRED FIELDS !!!!!!!!!!!!!!!!!!!!!!!!!

    const handleSave = () => {
        onSaveChanges(formData);
    };
    
    // Format the date as "yyyy-MM-dd"
    const formatUIDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toISOString().split('T')[0];
    }

    return (
        <>
            {goalData && (
                <Modal show={show}>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="goalForm.ControlTitle">
                            <div className='d-flex justify-content-between'>
                            <Form.Label>Title</Form.Label>
                            {goalData.goal_id && (
                                <ToggleButton id="complete" type="checkbox" variant="outline-secondary" 
                                    checked={checked} 
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                >{<ImCheckmark2 />}
                                </ToggleButton>
                            )}
                            </div>
                            <Form.Control
                                type='text'
                                placeholder="Enter a short title"
                                autoFocus
                                name='title'
                                // minLength="2" 
                                // maxLength="40"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDescription"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name='description'
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlCategoryDD"
                        >
                            <Form.Select 
                                aria-label='category'
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                disabled={checked}
                            >
                                <option value="">Select a category</option>
                                <option value="book">Book</option>
                                <option value="project">Project</option>
                                <option value="game">Game</option>
                                <option value="movie">Movie</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlPriority"
                        >
                            <Form.Label>Priority</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='priority'
                                value={formData.priority || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlTimeEst"
                        >
                            <Form.Label>Time Est</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='time_est'
                                value={formData.time_est || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDueDate"
                        >
                            <Form.Label>Due date</Form.Label>
                            <Form.Control 
                                type="date" 
                                name='due_date'
                                value={formData.due_date ? formatUIDate(formData.due_date) : ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlPct"
                        >
                            <Form.Label>Percent</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='percent'
                                value={formData.percent || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDateCompl"
                        >
                            <Form.Label>Date Completed</Form.Label>
                            <Form.Control 
                                type="date" 
                                name='complete_date'
                                value={ formData.complete_date ? formatUIDate(formData.complete_date) : ''}
                                max={new Date().toISOString().slice(0, 10)}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='me-auto'>
                    {goalData.goal_id && (
                        <Button variant="outline-danger" onClick={onDelete}>
                            <MdDeleteOutline />
                        </Button>
                    )}
                    </div>
                    <Button variant="outline-secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

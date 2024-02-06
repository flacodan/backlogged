import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ImCheckmark2, ImCheckmark } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";

export default function GoalModal({ goalData, show, onDelete, onClose, onSaveChanges }) {  

    const [formData, setFormData] = useState({});
    const [checked, setChecked] = useState(goalData.complete ?? false);
    const [validated, setValidated] = useState(false);

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

    const handleChangeComplete = (checked) => {
        const newComplete = checked ? {complete: false} : {complete: true};
        // if complete date not entered, set it to today
        let newDate = null;
        if(!formData.complete_date){
            newDate = {complete_date: Date.now()}
        }
        const newData = {...newComplete, ...newDate};
        console.log(newData);
        setFormData((prevData) => ({
            ...prevData, ...newData
        }));
    }
    
    // Rrevert data if CLOSE is clicked
    const handleClose = () => {
        setFormData(goalData);
        onClose();
    }

    const handleSave = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            if(formData.title && formData.description && formData.category) {
                onSaveChanges(formData);
            }
        }
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
                    <Form noValidate validated={validated} >
                        <Form.Group className="mb-3" controlId="goalForm.ControlTitle">
                            <div className='d-flex justify-content-between'>
                            
                            </div>
                            <FloatingLabel controlId='floatingTitle' label='Title'>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder="Enter a short title"
                                    autoFocus
                                    name='title'
                                    // minLength="2" 
                                    // maxLength="40"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                    value={formData.title || ''}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a Title.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDescription"
                        >
                            <FloatingLabel controlId='floatingDescription' label='Description'>
                                <Form.Control 
                                    required
                                    as="textarea" 
                                    style={{ height: '100px' }}
                                    name='description'
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a Description.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlCategoryDD"
                        >
                            <FloatingLabel controlId='floatingCategorySelect' label='Category'>
                                <Form.Select 
                                    required
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
                                
                                <Form.Control.Feedback type="invalid">
                                    Please select a Category.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlPriority"
                        >
                            <FloatingLabel controlId='floatingPriority' label='Priority'>
                                <Form.Control 
                                    type="number" 
                                    name='priority'
                                    value={formData.priority || ''}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlTimeEst"
                        >
                            <FloatingLabel controlId='floatingEstimate' label='Time Estimate'>
                                <Form.Control 
                                    type="number" 
                                    name='time_est'
                                    value={formData.time_est || ''}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDueDate"
                        >
                            <FloatingLabel controlId='floatingDueDate' label='Due Date'>
                                <Form.Control 
                                    type="date" 
                                    name='due_date'
                                    value={formData.due_date ? formatUIDate(formData.due_date) : ''}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlPct"
                        >
                            <FloatingLabel controlId='floatingPercent' label='Percent Complete'>
                            <Form.Control 
                                type="number" 
                                name='percent'
                                value={formData.percent || ''}
                                onChange={handleInputChange}
                                disabled={checked}
                            />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="goalForm.ControlDateCompl"
                        >
                            <FloatingLabel controlId='floatingCompleteDate' label='Date Completed'>
                                <Form.Control 
                                    type="date" 
                                    name='complete_date'
                                    value={ formData.complete_date ? formatUIDate(formData.complete_date) : ''}
                                    max={new Date().toISOString().slice(0, 10)}
                                    onChange={handleInputChange}
                                    disabled={checked}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='me-auto'>
                    {goalData.goal_id && (
                        <Button 
                            variant="outline-danger" 
                            data-toggle="tooltip" 
                            title={`Delete`}
                            disabled={checked}
                            onClick={onDelete}
                        >
                            <MdDeleteOutline />
                        </Button>
                    )}
                    </div>
                    {goalData.goal_id && (
                                <ToggleButton 
                                    id="complete" 
                                    name='complete'
                                    type="checkbox" 
                                    variant="outline-secondary" 
                                    checked={checked} 
                                    onChange={(e) => {
                                        setChecked(e.currentTarget.checked);
                                        handleChangeComplete(checked);
                                        }
                                    }
                                >{<ImCheckmark2 />} Complete
                                </ToggleButton>
                            )}
                    <Button variant="outline-secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button type="submit" variant="outline-primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

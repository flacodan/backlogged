import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function LoginModal({ show, onCreateUser, onLogin }) {

    const [loginMode, setLoginMode] = useState("login");
    const [formData, setFormData] = useState({ username: "", password: "" });

    const toggleLoginMode = () => {
        setLoginMode(loginMode === "login" ? "signup" : "login")
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // !!!! Add more useful validation to verify username is a valid email and password a minimum length !!!!!
    const checkInput = () => {
        if(!formData.password || !formData.username){
            console.log("Username and password are required.");
            return false;
        } else {
            return true;
        }
    }

    const handleLoginClick = (event) => {
        event.preventDefault();
        if(formData.username && formData.password){}
        if(checkInput()) {
            onLogin(formData);
        };
        console.log("LoginModal, back from login call");
    };

    const handleCreateUserClick = (event) => {
        event.preventDefault();
        console.log("In create user ", JSON.stringify(formData, null, 2));
        if(checkInput()) {
            onCreateUser(formData);
        };
    };
    
    if (loginMode === "signup") {
        return (
            <>
                <Modal 
                    show={show}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="login-modal-signup"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title style={{color:"#6c757d"}} ><Image className='me-2' src="/android-chrome-512x512.png" width={50} height={50}/>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-center pt-3'>
                            <span className="h4 text-center fw-bold" style={{color:"#6c757d"}} >Welcome to Backlogged!</span>
                        </div>
                        <Form>
                            <div className="text-center pt-3">
                                Already registered?{" "}
                                <span className="link-primary" role="button" onClick={toggleLoginMode}>
                                    Log In
                                </span>
                            </div>
                            <Form.Group className="mb-3 pt-3" controlId="registerForm.username">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='username'
                                    placeholder="name@example.com"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="registerForm.password"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="secondary" onClick={handleCreateUserClick}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Modal 
                show={show}
                backdrop="static"
                keyboard={false}
                aria-labelledby="login-modal-login"
                centered
            >
                <Modal.Header >
                    <Modal.Title style={{color:"#6c757d"}} ><Image className='me-2' src="/android-chrome-512x512.png" width={50} height={50}/>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center pt-3'>
                        <span className="h4 text-center fw-bold" style={{color:"#6c757d"}} >Welcome to Backlogged!</span>
                    </div>
                    <Form>
                        <div className="text-center pt-3">
                            Not registered yet?{" "}
                            <span className="link-primary" role="button" onClick={toggleLoginMode}>
                                Sign Up
                            </span>
                        </div>
                        <Form.Group className="mb-3 pt-3" controlId="loginForm.username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='username'
                                placeholder="name@example.com"
                                value={formData.username}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="loginForm.password"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <div>
                        <p className="text-center ml-auto">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                    <Button variant="secondary" onClick={handleLoginClick}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

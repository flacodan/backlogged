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
    
    const handleLogin = () => {
        onLogin(formData);
    };

    const handleCreateUser = () => {
        //
        onCreateUser(formData);
    };
    

    if (loginMode === "signup") {
        return (
            <>
                <Modal 
                    show={show}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex flex-row pt-2'>
                            <Image src="/public/android-chrome-512x512.png" width={50} height={50}/>
                            <span className="h4 fw-bold mb-0 ps-4 pt-2" style={{color:"#6c757d"}} >Welcome to Backlogged!</span>
                        </div>
                        <Form>
                            <div className="text-center pt-3">
                                Already registered?{" "}
                                <span className="link-primary" onClick={toggleLoginMode}>
                                    Log In
                                </span>
                            </div>
                            <Form.Group className="mb-3 pt-3" controlId="loginForm.username">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="loginForm.password"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="secondary" onClick={handleCreateUser}>
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
            >
                <Modal.Header >
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-row pt-2'>
                        <Image src="/public/android-chrome-512x512.png" width={50} height={50}/>
                        <span className="h4 fw-bold mb-0 ps-4 pt-2" style={{color:"#6c757d"}} >Welcome to Backlogged!</span>
                    </div>
                    <Form>
                        <div className="text-center pt-3">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={toggleLoginMode}>
                                Sign Up
                            </span>
                        </div>
                        <Form.Group className="mb-3 pt-3" controlId="loginForm.username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="loginForm.password"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <div>
                        <p className="text-center ml-auto">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                    <Button variant="secondary" onClick={handleLogin}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
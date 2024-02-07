import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row } from 'react-bootstrap';

export default function UserInfoModal({ show, onHintClose, userInfo }) {

    return (
        <>
            <Modal 
                show={show}
                onHide={onHintClose}
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{color:"#6c757d"}}  closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-row pt-3 '>
                        <Image src="/android-chrome-512x512.png" width={50} height={50}/>
                        <span className="h4 fw-bold mb-0 ps-4 pt-2" style={{color:"#6c757d"}} >\\\ Backlogged</span>
                    </div>
                    <div className='py-5 d-flex justify-content-center text-center'>
                        <Row>
                            <h5 style={{color:"#6c757d"}} >
                                Currently logged in as: {userInfo}
                            </h5>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-end'>
                    <Button variant="secondary" onClick={onHintClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

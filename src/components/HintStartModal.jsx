import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function HintModal({ show, onClose }) {

    return (
        <>
            <Modal 
                show={show}
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Get Started</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-row pt-2'>
                        <Image src="/public/android-chrome-512x512.png" width={50} height={50}/>
                        <span className="h4 fw-bold mb-0 ps-4 pt-2" style={{color:"#6c757d"}} >\\\\\\ Backlogged</span>
                    </div>
                    <h2>
                        Just click the ADD button below to create your first Backlog item!
                    </h2>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button variant="secondary" onClick={onClose}>
                        Got It
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

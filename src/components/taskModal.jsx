import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

function MyVerticallyCenteredModal({ onNameChange, show, onClose }) {
  const nameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => onClose(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/Edit Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Name </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Name" onChange={(e) => nameChange(e)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => onClose(true)}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;

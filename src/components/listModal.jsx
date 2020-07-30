import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

function MyVerticallyCenteredModal({ onTitleChange, show, onClick, onClose }) {
  return (
    <Modal show={show} size="lg" centered>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/Edit List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              List title
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Title"
            onChange={(e) => {
              onTitleChange(e.target.value);
            }}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;

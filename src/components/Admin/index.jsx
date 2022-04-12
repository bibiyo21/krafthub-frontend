import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";
const Admin = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Wrapper>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>User Management</Card.Title>
            <table className="table table-responsive table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Name 1 Last Name 1</td>
                  <td>Active</td>
                  <td><Button onClick={handleShow} variant="warning" ><i className="fas fa-pencil"></i></Button></td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Wrapper>
      <UserModal show={show} handleClose={handleClose} />
    </>
  );
};

const UserModal = ({ show, handleClose }) => {
  const onBookMaker = () => {
    console.log('booked');
  }

  return ReactDOM.createPortal(
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update First Name 1 Last Name 1</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Account Status</label>
        <Form.Group className="mb-3">
          <select className="form-select">
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
            <option value={2}>Remove</option>
          </select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onBookMaker}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById('modal')
  );
}

export default Admin;

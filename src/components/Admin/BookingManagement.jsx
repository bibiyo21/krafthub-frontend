import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";

const BookingManagement = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Wrapper>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Booking Management</Card.Title>
            <table className="table table-responsive table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Requestor</th>
                  <th>Maker</th>
                  <th>Status</th>
                  <th>Schedule</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Name 1 Last Name 1</td>
                  <td>Maker First Name 1 Maker Last Name 1</td>
                  <td><span className="text-warning">Pending</span></td>
                  <td>January 1, 2022 14:30</td>
                  <td><Button onClick={handleShow} variant="warning" ><i className="fas fa-book"></i></Button></td>
                </tr>
                <tr>
                  <td>First Name 1 Last Name 1</td>
                  <td>Maker First Name 1 Maker Last Name 1</td>
                  <td><span className="text-info">In Progress</span></td>
                  <td>January 1, 2022 14:30</td>
                  <td><Button onClick={handleShow} variant="warning" ><i className="fas fa-book"></i></Button></td>
                </tr>
                <tr>
                  <td>First Name 1 Last Name 1</td>
                  <td>Maker First Name 1 Maker Last Name 1</td>
                  <td><span className="text-success">Done</span></td>
                  <td>January 1, 2022 14:30</td>
                  <td><Button onClick={handleShow} variant="warning" ><i className="fas fa-book"></i></Button></td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Wrapper>
      <BookingModal show={show} handleClose={handleClose} />
    </>
  );
};

const BookingModal = ({ show, handleClose }) => {
  const onBookMaker = () => {
    console.log('booked');
  }

  return ReactDOM.createPortal(
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update <b className="text-primary">First Name 1 Last Name 1</b> Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Maker</label>
        <Form.Group className="mb-3">
          <select className="form-select">
            <option>Maker First Name 1 Maker Last Name 1</option>
            <option>Maker First Name 2 Maker Last Name 2</option>
            <option>Maker First Name 3 Maker Last Name 3</option>
          </select>
        </Form.Group>
        <label>Booking Status</label>
        <Form.Group className="mb-3">
          <select className="form-select">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onBookMaker}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById('modal')
  );
}

export default BookingManagement;

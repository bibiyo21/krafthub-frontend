import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Col, Button, Modal, Form, Label } from "react-bootstrap";

const AvailabilityList = ({ list = null }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log('rerender')
  }, [list]);

  if (list === null) {
    return "";
  }

  // if (!list.length) {
  //   console.log(list)
  //   return <p>No Result </p>
  // }

  return (
    <>
      <section class="upcoming-meetings mt-5 py-5" id="meetings">
        <div class="container">
          <div class="row">
          {
            list.map((availability) => {
              const { first_name, last_name, profession, specialty, time_in, time_out } = availability
              return (
                <Col md="3" className="mb-3">
                  <div className="meeting-item">
                    <div className="thumb bg-white">
                      <i className="fas fa-user card-img-top fa-5x text-center my-4"></i>
                    </div>
                    <div className="down-content">
                      <h3>{`${first_name} ${last_name}`}</h3>
                      <p><b>{profession}</b> : {specialty} </p>
                      <p><b>Time Availability:</b> {time_in} to {time_out}</p>
                      <div class="d-grid gap-2">
                        <Button onClick={() => handleShow()} className="btn block btn-success">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </div>
      </section>
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
        <Modal.Title>Schedule Booking with Maker Worker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Schedule</label>
        <Form.Group className="mb-3">
          <input type="date" className="form-control" placeholder="Date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <input type="time" className="form-control" placeholder="Date" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onBookMaker}>
          Book now
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById('modal')
  );
}

export default AvailabilityList;

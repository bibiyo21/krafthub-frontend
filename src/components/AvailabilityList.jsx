import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Col, Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingsServiceAPI from "../api/services/Bookings/BookingsService";

const AvailabilityList = ({ list = null }) => {
  const [show, setShow] = useState(false);
  const [makerId, setMakerId] = useState(null);

  const handleClose = () => {
      setMakerId(null)
      setShow(false)
    };
  const handleShow = ({ selectedId }) => {
      setMakerId(selectedId);
      setShow(true);
    };

  if (list === null) {
    return "";
  }

  const onChange = event => {
    event.persist()
    const {id, name, value, type} = event.target

    if (type === 'radio') {
      setShow(prev => ({...prev, payment: id}))
    } else {
      setShow(prev => ({...prev, [name]: value}))
    }
  }
 
  
  return (
    <>
      <section class="upcoming-meetings mt-5 py-5" id="meetings">
        <div class="container">
          <div class="row">
          {
            list.map((availability, index) => {
              const { first_name, last_name, profession, specialty, time_in, time_out, id } = availability
              return (
                <Col md="3" className="mb-3" key={`availability_${index}`}>
                  <div className="meeting-item">
                    <div className="thumb bg-white">
                      <i className="fas fa-user card-img-top fa-5x text-center my-4"></i>
                    </div>
                    <div className="down-content">
                      <h3>{`${first_name} ${last_name}`}</h3>
                      <p><b>{profession}</b> : {specialty} </p>
                      <p><b>Time Availability:</b> {time_in} to {time_out}</p>
                      <div class="d-grid gap-2">
                        <Button onClick={() => handleShow({selectedId: id})} className="btn block btn-success">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </div>
      </section>
      <BookingModal show={show} handleClose={handleClose} makerId={makerId} onChange={Onchange}/>
    </>
    
  );
};

const BookingModal = ({ show, handleClose, makerId, onChange }) => {
  const form = useRef(null);
  const onBookMaker = () => {
    BookingsServiceAPI.bookJob({
      maker_id: makerId,
      eta: `${form.current['date'].value} ${form.current['time'].value}`,
      additional_info: form.current['additional_info'].value
    }).then((data) => {
      toast.success(data.message);
      handleClose();
    })
  }

  return ReactDOM.createPortal(
    <>
      <Modal show={show} onHide={handleClose} onChange={onChange}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Booking with Maker Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Schedule</label>
          <Form ref={form}>
            <Form.Group className="mb-3">
              <input type="date" className="form-control" name="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <input type="time" className="form-control" name="time" />
            </Form.Group>
            <label>Description of Job</label>
            <Form.Group className="mb-3">
              <textarea className="form-control" name="additional_info"></textarea>
            </Form.Group>
            
            <label>Mode of Payment</label>
            <Form.Group className="mb-3">
          <label>
            <input
              type="radio"
              name="payment"
              id="cash"
              checked={payment === 'Cash'}
              onChange={onChange}
            />
            Cash Payment
          </label>
 
          <label>
            <input
              type="radio"
              name="payment"
              id="gcash"
              checked={payment === 'GCash'}
              onChange={onChange}
            />
            Gcash Payment
          </label>
            
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onBookMaker}>
            Book now
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>,
    document.getElementById('modal')
  );
}

export default AvailabilityList;

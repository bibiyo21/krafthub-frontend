import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Col, Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingsServiceAPI from "../api/services/Bookings/BookingsService";

const AvailabilityList = ({ list = null }) => {
  const [show, setShow] = useState(false);
  const [makerId, setMakerId] = useState(null);
  const [checked, setChecked] = useState({ cash: true, gcash: false });
  
  const changeRadio = (e) => {
    setChecked(() => {
      return {
        cash: false,
        gcash: false,
        [e.target.value]: true
      };
    });
  };
  
  const handleClose = () => {
      setMakerId(null)
      setShow(false)
      setChecked(false)
    };
  
  const handleShow = ({ selectedId }) => {
      setMakerId(selectedId);
      setShow(true);
      setChecked(true);
    };
  
    const prof = {profession};
    const amountS = '0';
  
  if(prof === 'Carpentry') {
    
      amountS = '300';
  } else if (prof === 'Plumbing') {
      amountS = '400';
  } else if (prof ==='Cleaning') {
      amountS = '450';
  } else if (prof ==='Electrician') {
      amountS = '550';
  } else {
    amountS = '500';
  }
  

  if (list === null) {
    return "";
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
      <BookingModal show={show} handleClose={handleClose} makerId={makerId} changeRadio={changeRadio} checked={checked} />
    </>
    
  );
};

const BookingModal = ({ show, handleClose, makerId, changeRadio, checked }) => {
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
      <Modal checked={checked} show={show} onHide={handleClose} changeRadio={changeRadio} >
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
            <label>Message</label>
            <Form.Group className="mb-3">
              <textarea className="form-control" name="additional_info"></textarea>
            </Form.Group>
            
            <label> Amount </label> <p> amountS </p>
                  
            <label>Mode of Payment</label>
            <Form.Group className="mb-3">
          <label>
            <input
              type="radio"
              checked={checked.cash}
              value="cash"
               name="choice"
              onChange={changeRadio}
            />
            Cash Payment
          </label>
 
          <label>
            <input
               type="radio"
              checked={checked.gcash}
              value="gcash"
              name="choice"
              onChange={changeRadio}
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

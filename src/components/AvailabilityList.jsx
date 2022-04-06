import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Col, Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingsServiceAPI from "../api/services/Bookings/BookingsService";
import image from "../images/QRCode.png";
import * as dayjs from 'dayjs'



const AvailabilityList = ({ list = null }) => {
  const [show, setShow] = useState(false);
  const [makerId, setMakerId] = useState(null);
  const [checked, setChecked] = useState({ cash: true, gcash: false });
  const [radioValue, setRadioValue] = useState(null);
  const [amountS, setAmount] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [minDate, setMinDate] = useState(null);
  const [status, setStatus] = useState(false);
  
  
  const today = date => date.toISOString().slice(0, 10);
      
  console.log(today(new Date()));
  console.log(dayjs(today(new Date())).format('HH:mm'));
  
  const changeRadio = (e) => {
    console.log([e.target.value].toString());
    setRadioValue([e.target.value].toString())
       
    if([e.target.value].toString() === 'gcash') {
      setShowModal(true)
    } else { 
       setShowModal(false)

    }
    setChecked(() => {
      return {
        cash: false,
        gcash: false,
        [e.target.value]: true
      };
    });
 
    
  };
  
    
  const handleOnClose = () => {
        setShowModal(false)

    };
  
  const handleClose = () => {
      setMakerId(null)
      setAmount(null)
      setShow(false)
      setChecked(false)
    };
  
  const handleShow = ({ selectedId , timeout}) => {
      setMakerId(selectedId);
      setShow(true);
      setChecked(true);
      setMinDate(today(new Date()));
    
         
    console.log(dayjs(timeout).format('HH:mm'));
      
    console.log(selectedId);
     
        BookingsServiceAPI.getScheduled({maker_id: selectedId}).then(({ results }) => {
              
              console.log (results);
              setStatus(false);
              for (let i = 0; i < results.length; i++) {
                  if((results[i].makerid === selectedId) && (results[i].status === 'pending')) 
                  {
                    setStatus(true);
                    break;
                  }
              }
          
        });
     
 
      console.log(status);

    };
  
    const getProfession = ({ selectedProf }) => {
      
       
                if(selectedProf === 'Carpentry') {
                    setAmount('Php300.00');
                } else if (selectedProf === 'Plumbing') {
                    setAmount('Php400.00');
                } else if (selectedProf ==='Cleaning') {
                    setAmount('Php450.00');
                } else if (selectedProf ==='Electrician') {
                    setAmount('Php550.00');
                } else {
                   setAmount('Php500.00');
                }
      
   
 
    };

  

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
              const { first_name, last_name, profession, specialty, time_in, time_out, id , status} = availability
          
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
                        <Button onClick={() => handleShow({selectedId: id, timeout: time_out}, getProfession({selectedProf: profession}) )} className="btn block btn-success">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
              
            })}
          </div>
        </div>
      </section>
      <BookingModal show={show} handleClose={handleClose} makerId={makerId} changeRadio={changeRadio} checked={checked} amountS={amountS} showModal={showModal} handleOnClose={handleOnClose} image={image} minDate={minDate} radioValue={radioValue} status={status}  />
    </>
    
  );
};




const BookingModal = ({ show, handleClose, makerId, changeRadio, checked , amountS, showModal, handleOnClose, image, minDate, radioValue, status}) => {
  const form = useRef(null);
  const onBookMaker = () => {
    BookingsServiceAPI.bookJob({
      maker_id: makerId,
      eta: `${form.current['date'].value} ${form.current['time'].value}`,
      additional_info: form.current['additional_info'].value +'|'+ amountS + '|' + radioValue
    }).then((data) => {
      toast.success(data.message);
      handleClose();
    })
  }

  
  return ReactDOM.createPortal(
    <>
      <Modal status={status} radioValue={radioValue} image={image} minDate={minDate} checked={checked} show={show} onHide={handleClose} changeRadio={changeRadio} amountS={amountS} showModal={showModal} handleOnClose={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Booking with Maker Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Schedule</label>
          <Form ref={form}>
            <Form.Group className="mb-3">
              <input type="date" min={minDate}  className="form-control" name="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <input type="time" className="form-control" name="time" />
            </Form.Group>
            <label>Message</label>
            <Form.Group className="mb-3">
              <textarea className="form-control" name="additional_info"></textarea>
            </Form.Group>
            
            <label> Amount </label> <p> {amountS} </p>
                  
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
            
           <Modal text="GCASH QR" show={showModal}>
              <Modal.Title>Pay with QR Code</Modal.Title>
              <Modal.Body>
              
              <img src={image} width= "25%" height="50%" alt="Gcash QR Code"/>
              </Modal.Body>
               <Modal.Footer>
              <Button variant="primary" onClick={handleOnClose}>
               Close
               </Button>
              </Modal.Footer>
            </Modal>
            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onBookMaker}  disabled={status}>
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

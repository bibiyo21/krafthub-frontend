import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";
import BookingsServiceAPI from "../../api/services/Bookings/BookingsService";
import * as dayjs from 'dayjs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

const ScheduledBooking = () => {
  const STATUS_ATTR = {
    pending: {color: 'text-primary', msg: "Pending for Acceptance"},
    done: {color: 'text-success', msg: "Done"},
    paid: {color: 'text-warning', msg: "Paid"},
    cancelled: {color: 'text-danger', msg: "Cancelled"},
    in_progress: {color: 'text-info', msg: "Accepted"},
  }
  
  
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [scheduledBookings, setScheduledBookings] = useState(null);
  const [bookingState, setBookingState] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [additionalInfo, setadditionalInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusDone , setStatusDone] = useState(true);
  const [statusCancel , setStatusCancel] = useState(true);

  const handleClose = () => {
    setShow(false)
    setBookingState(null)
    setBookingId(null);
    
   
    
  };
  
   const showFilter = ({status}) => {
    
    
     var  table = document.getElementById("bookings");
     var  tr = table.getElementsByTagName("tr");
      for (var  i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          const txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase() === status.toUpperCase()) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
     }
    
    
    
  };

  const handleShow = ({bookingId, status, additional_info}) => {
    setShow(true);
    setBookingState(status);
    setadditionalInfo(additional_info);
    console.log(bookingState);
    setBookingId(bookingId);
    
    
     
      if(status === "cancelled") {
      setStatusCancel(false); 
    } else {
      setStatusCancel(true);
    }
    
     if(status === "done") {
      setStatusDone(false); 
    } else {
      setStatusDone(true);
    }
    
    
  };

  const loadScheduledBooking = () => {
    BookingsServiceAPI.getScheduled().then(({ results }) => {
      
        console.log(results);
      setScheduledBookings(results);
      
      
    })
  }

  const onChangeStatus = () => {
    BookingsServiceAPI.updateBookingStatus({
      id: bookingId,
      status: bookingState
    }).then((data) => {
      toast.success(data.message);
      handleClose();
      loadScheduledBooking()
    })
  }
  
  
  
   const onSubmit = ({ reason }) => { 
      setLoading(true);
     console.log(reason);

   
   };
  
  const onSubmitDone = ({ rate }) => { 
    setLoading(true);
     console.log(rate);
   
   };

  useEffect(() => {
    loadScheduledBooking()
  }, []);

  return (
    <>
      <Wrapper>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Scheduled Bookings</Card.Title>
    
            <div>
              <Button onClick={() => showFilter({ status: "Pending for Acceptance"})} variant="primary" >Pending Status</Button>
              <Button  onClick={() => showFilter({ status: "Done"})} variant="primary" >Done Status</Button>
              <Button onClick={() => showFilter({ status: "Paid"})} variant="primary" >Paid Status</Button>
              <Button onClick={() => showFilter({ status: "Cancelled"})} variant="primary" >Cancelled Status</i></Button>
              <Button onClick={() => showFilter({ status: "Accepted"})} variant="primary" >Accepted Status</i></Button>  
             </div>
            <table  id = "bookings" className="table table-responsive table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Maker</th>
                  <th>Status</th>
                  <th>Schedule</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  scheduledBookings && scheduledBookings.map(({
                    bookingid, first_name, last_name, status, eta, additional_info
                  }) => {
                    return (<tr>
                      <td>{first_name} {last_name}</td>
                      <td><span className={STATUS_ATTR[status].color}>{STATUS_ATTR[status].msg}</span></td> 
                      <td>{dayjs(eta).format('MMMM DD, YYYY HH:mm')}</td>
                      <td>{additional_info}</td>
                      <td>
                        <div className="btn-group">
                           
                           <Button disabled={status === 'in_progress' || status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "cancelled", additional_info: additional_info})} variant="danger" >Cancel<i className="fas fa-times"></i></Button>
                           <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "done"})} variant="success" >Done<i className="fas fa-check"></i></Button>
                             </div>
                      </td>
                    </tr>)
                  })
                }
                
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Wrapper>
      <BookingModal show={show} handleClose={handleClose} status={STATUS_ATTR?.[bookingState]?.msg} onChangeStatus={onChangeStatus} handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} loading={loading} onSubmitDone={onSubmitDone} statusDone={statusDone} statusCancel={statusCancel}/>
    </>
  );
};

const BookingModal = ({ show, handleClose, status, onChangeStatus , handleSubmit, register, onSubmit, loading, onSubmitDone , statusDone , statusCancel }) => {
  return ReactDOM.createPortal(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to set this booking to <b>{status}</b> ?

          <Form onSubmit={handleSubmit(onSubmit)}>
             <Form.Group className="mb-3">
                <input type="text" hidden ={statusCancel} className="form-control" placeholder="Reason" {...register("reason")}/>
              </Form.Group>
              <Button variant="primary" hidden ={statusCancel} type="submit" disabled={loading}>
                Post Reason
              </Button>


          </Form>
            
            <Form onSubmit={handleSubmit(onSubmitDone)}>
                       <Form.Group className="mb-3">
                          <input type="text" className="form-control" hidden ={statusDone} placeholder="Rate the Service" {...register("rate")}/>
                        </Form.Group>
                        <Button variant="primary" hidden ={statusDone} type="submit" disabled={loading}>
                          Post a Rating
                        </Button>
                  </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onChangeStatus()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>,
    document.getElementById('modal')
  );
}

export default ScheduledBooking;

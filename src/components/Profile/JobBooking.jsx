import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";
import BookingsServiceAPI from "../../api/services/Bookings/BookingsService";
import * as dayjs from 'dayjs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

const JobBooking = () => {
  const STATUS_ATTR = {
    pending: {color: 'text-warning', msg: "Pending for Acceptance"},
    done: {color: 'text-success', msg: "Done"},
    paid: {color: 'text-success', msg: "Paid"},
    cancelled: {color: 'text-danger', msg: "Cancelled"},
    in_progress: {color: 'text-info', msg: "Accepted"},
  }
  
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [scheduledBookings, setScheduledBookings] = useState(null);
  const [bookingState, setBookingState] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [statusCancel , setStatusCancel] = useState(true);
  const [table] = useState(null);
  const [tr] = useState(null);

const [loading, setLoading] = useState(false);
  
  const handleClose = () => {
    setShow(false)
    setBookingState(null)
    setBookingId(null);
  };

  const handleShow = ({bookingId, status}) => {
    setShow(true);
    console.log(bookingId +'--'+ status);
    setBookingState(status);
    setBookingId(bookingId);
    
    if(status === "cancelled") {
      setStatusCancel(false); 
    } else {
      setStatusCancel(true);
    }
   
    
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

  const loadScheduledBooking = () => {
    BookingsServiceAPI.getJobs().then(({ results }) => {
      setScheduledBookings(results);
      console.log(results);
    })
  };

  const onChangeStatus = () => {
    
       console.log(bookingId +'--'+ bookingState);
    BookingsServiceAPI.updateBookingStatus({
      id: bookingId,
      status: bookingState,
    }).then((data) => {
      toast.success(data.message);
      handleClose();
      loadScheduledBooking()
    })
  }

    
   const onSubmit = ({ reason }) => { 
    setLoading(true);
     console.log(reason);
   
       BookingsServiceAPI.updateBookingReason({
      id: bookingId,
      reason: reason
    }).then((data) => {
      console.log(data.message);
    })
     
       setLoading(false);
     
   };
  

  
  useEffect(() => {
    loadScheduledBooking()
  }, []);

  return (
    <>
      <Wrapper>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Job Bookings</Card.Title>
            <div>
              <Button onClick={() => showFilter({ status: "Pending for Acceptance"})} variant="primary" >Pending Status</Button>
              <Button  onClick={() => showFilter({ status: "Done"})} variant="primary" >Done Status</Button>
              <Button onClick={() => showFilter({ status: "Paid"})} variant="primary" >Paid Status</Button>
              <Button onClick={() => showFilter({ status: "Cancelled"})} variant="primary" >Cancelled Status</Button>
              <Button onClick={() => showFilter({ status: "Accepted"})} variant="primary" >Accepted Status</Button>  
             </div>
            <table id = "bookings" className="table table-responsive table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Requestor</th>
                  <th>Status</th>
                  <th>Schedule</th>
                  <th>Description</th>
                  <th>Action</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {
                  scheduledBookings && scheduledBookings.map(({
                    bookingid, first_name, last_name, status, eta, additional_info, amount
                  }) => {
                    return (<tr>
                      <td>{first_name} {last_name}</td>
                      <td><span className={STATUS_ATTR[status].color}>{STATUS_ATTR[status].msg}</span></td>
                      <td>{dayjs(eta).format('MMMM DD, YYYY HH:mm')}</td>
                      <td>{additional_info}</td>
                      <td>{amount}</td>
                      <td>
                        <div className="btn-group">
                          <Button disabled={status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "in_progress"})} variant="info" >Accept<i className="fas fa-spinner"></i></Button>
                          <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "cancelled"})} variant="danger" >Cancel<i className="fas fa-times"></i></Button>
                           <Button disabled={status === 'done' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "paid"})} variant="warning" >Paid<i className="fas fa-check"></i></Button>
                         
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
      <BookingModal show={show} handleClose={handleClose} status={STATUS_ATTR?.[bookingState]?.msg} onChangeStatus={onChangeStatus} statusCancel={statusCancel} handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} loading={loading} />
    </>
  );
};

const BookingModal = ({ show, handleClose, status, onChangeStatus, statusCancel, handleSubmit, register, onSubmit, loading}) => {
  return ReactDOM.createPortal(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Job Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to set this job to <b>{status}</b> ?

                    <Form onSubmit={handleSubmit(onSubmit)}>
                       <Form.Group className="mb-3">
                          <input type="text" className="form-control" hidden ={statusCancel} placeholder="Reason" {...register("reason")}/>
                        </Form.Group>
                        <Button variant="primary" hidden ={statusCancel} type="submit" disabled={loading}>
                          Post Reason
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

export default JobBooking;

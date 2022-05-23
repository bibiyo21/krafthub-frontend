import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";
import BookingsServiceAPI from "../../api/services/Bookings/BookingsService";
import * as dayjs from 'dayjs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";
import "jspdf-autotable";

const BookingManagement = () => {
   const STATUS_ATTR = {
    pending: {color: 'text-warning', msg: "Pending for Acceptance"},
    done: {color: 'text-success', msg: "Done"},
    paid: {color: 'text-success', msg: "Paid"},
    cancelled: {color: 'text-danger', msg: "Cancelled"},
    in_progress: {color: 'text-info', msg: "Accepted"},
  }
  const [show, setShow] = useState(false);
  const [scheduledBookings, setScheduledBookings] = useState(null);
  const [bookingState, setBookingState] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  

  const handleClose = () => {
    setShow(false)
    setBookingState(null)
    setBookingId(null);
  };

  const handleShow = ({bookingId, status}) => {
    setShow(true)
    setBookingState(status)
    
    console.log(bookingState);
    setBookingId(bookingId);
  };

  const loadScheduledBooking = () => {
    BookingsServiceAPI.getScheduledAll().then(({ results }) => {
      
        console.log(results);
      setScheduledBookings(results);
      
      
    })
  }
  
  const printToPdf = () => {
     
  const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Booking Summary Report";
    const headers = [["Booking ID", "First Name", "Last Name", "Status", "Schedule" , "Amount", "Other Details", "Reason for Cancellation"]];

    const data = scheduledBookings.map(elt=> [elt.bookingid, elt.first_name, elt.last_name,elt.status, elt.eta, elt.amount, elt.additional_info, elt.cancellation_reason]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
     
  }
  
  const onChangeStatus = () => {
    BookingsServiceAPI.updateBookingStatus({
      id: bookingId,
      status: bookingState,
    }).then((data) => {
      toast.success(data.message);
      handleClose();
      loadScheduledBooking()
    })
  }

  useEffect(() => {
    loadScheduledBooking()
  }, []);

  return (
    <>
      <Wrapper>
                               

        <Card className="mb-4">
         <div id="divToPrint">
          <Card.Body>
            <Card.Title> Booking Summary Report </Card.Title>
            <Button onClick={() => printToPdf({})} variant="success" >
               Export to PDF</Button>
             <div class="overflow-auto">
            <table className="table table-responsive table-condensed table-striped table-hover" id = "simple_table">
              <thead>
                <tr>
                  <th>Maker</th>
                  <th>Status</th>
                  <th>Schedule</th>
                  <th>Description</th>
                  <th>Payment</th>
                  <th>Cancellation Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  scheduledBookings && scheduledBookings.map(({
                    bookingid, first_name, last_name, status, eta, additional_info, amount, cancellation_reason
                  }) => {
                    return (<tr>
                      <td>{first_name} {last_name}</td>
                      <td><span className={STATUS_ATTR[status].color}>{STATUS_ATTR[status].msg}</span></td>
                      <td>{dayjs(eta).format('MMMM DD, YYYY HH:mm')}</td>
                      <td>{additional_info}</td>
                       <td>{amount}</td>
                        <td>{cancellation_reason}</td>
                      <td>
                        <div className="btn-group">
                            <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "pending"})} variant="Primary" >Pending<i className="fas fa-check"></i></Button>
                            <Button disabled={status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "in_progress"})} variant="info" >In Progress<i className="fas fa-spinner"></i></Button>
                            <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "done"})} variant="success" >Done<i className="fas fa-check"></i></Button>
                            <Button disabled={status === 'in_progress' || status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "cancelled"})} variant="danger" >Cancel<i className="fas fa-times"></i></Button>
                            <Button disabled={status === 'done' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "paid"})} variant="warning" >Paid<i className="fas fa-check"></i></Button>
                            
                              </div>
                      </td>
                    </tr>)
                  })
                }
                
              </tbody>
            </table>
         </div>
          </Card.Body>
         </div>
        </Card>
         
         
      </Wrapper>
      <BookingModal show={show} handleClose={handleClose} status={STATUS_ATTR?.[bookingState]?.msg} onChangeStatus={onChangeStatus} />
    </>
  );
};

const BookingModal = ({ show, handleClose, status, onChangeStatus }) => {
  return ReactDOM.createPortal(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to set this booking to <b>{status}</b>
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

export default BookingManagement;

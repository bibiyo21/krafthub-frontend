import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import Wrapper from "./Wrapper";
import BookingsServiceAPI from "../../api/services/Bookings/BookingsService";
import * as dayjs from 'dayjs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";

const BookingManagement = () => {
   const STATUS_ATTR = {
    pending: {color: 'text-warning', msg: "Pending"},
    done: {color: 'text-success', msg: "Done"},
    paid: {color: 'text-success', msg: "Paid"},
    cancelled: {color: 'text-danger', msg: "Cancelled"},
    in_progress: {color: 'text-info', msg: "In Progress"},
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
     
    const doc = new jsPDF('p', 'pt', 'letter');
    const htmlstring = '';
    const tempVarToCheckPageHeight = 0;
    const pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector  
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"  
            return true
        }
    };
    margins = {
        top: 150,
        bottom: 60,
        left: 40,
        right: 40,
        width: 600
    };
    const y = 20;
    doc.setLineWidth(2);
    doc.autoTable({
        html: '#simple_table',
        startY: 70,
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 180,
            },
            1: {
                cellWidth: 180,
            },
            2: {
                cellWidth: 180,
            }
        },
        styles: {
            minCellHeight: 40
        }
    })
    doc.save('Bookings.pdf');
     
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
            <table className="table table-responsive table-condensed table-striped table-hover" id = "simple_table">
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
                            <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "pending"})} variant="success" ><i className="fas fa-check"></i></Button>
                            <Button disabled={status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "in_progress"})} variant="info" ><i className="fas fa-spinner"></i></Button>
                            <Button disabled={status === 'in_progress' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "done"})} variant="success" ><i className="fas fa-check"></i></Button>
                            <Button disabled={status === 'in_progress' || status === 'pending' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "cancelled"})} variant="danger" ><i className="fas fa-times"></i></Button>
                            <Button disabled={status === 'done' ? false : true} onClick={() => handleShow({bookingId: bookingid, status: "paid"})} variant="warning" ><i className="fas fa-check"></i></Button>
                            
                              </div>
                      </td>
                    </tr>)
                  })
                }
                
              </tbody>
            </table>
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

import React from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import Navigations from "../Navigations";

const Wrapper = ({ children }) => {
  return (
    <>
      <Navigations />
      <section class="upcoming-meetings p-5" id="meetings">
        <div class="container">
        <Row>
          <Col md={3}>
            <Card>
              <Nav className="flex-column">
                <Nav.Link href={`/admin/user-management`} className="text-dark">User Management</Nav.Link>
                <Nav.Link href={`/admin/booking-management`} className="text-dark">Booking Management</Nav.Link>
              </Nav>
            </Card>
          
          </Col>
          <Col md={9}>
              { children }
          </Col>
        </Row>
        </div>
      </section>
    </>
  );
};

export default Wrapper;

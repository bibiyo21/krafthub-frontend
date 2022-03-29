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
                <Nav.Link href={`/profile`} className="text-dark">Profile</Nav.Link>
                <Nav.Link href={`/profile/job`} className="text-dark">Jobs</Nav.Link>
                <Nav.Link href="/" className="text-dark">Scheduled Booking</Nav.Link>
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

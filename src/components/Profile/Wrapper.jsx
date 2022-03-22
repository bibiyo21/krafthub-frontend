import React from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import Navigations from "../Navigations";

const Wrapper = ({ children }) => {
  return (
    <>
      <Navigations />
      <div className="container-fluid mt-3 pt-3">
      <Row>
        <Col md={3}>
          <Card>
            <Nav className="flex-column">
              <Nav.Link href={`/profile/job`}>Jobs</Nav.Link>
              <Nav.Link href="/">Scheduled Booking</Nav.Link>
            </Nav>
          </Card>
        
        </Col>
        <Col md={9}>
            { children }
        </Col>
      </Row>
      </div>
    </>
  );
};

export default Wrapper;

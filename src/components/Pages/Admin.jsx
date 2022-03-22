import React from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import Navigations from "../Navigations";

const Admin = () => {
  return (
    <>
      <Navigations />
      <div className="container-fluid mt-3 pt-3">
      <Row>
        <Col md={3}>
          <Card>
            <Nav className="flex-column">
              <Nav.Link href="/home">Users</Nav.Link>
              <Nav.Link href="/home">Bookings</Nav.Link>
            </Nav>
          </Card>
        
        </Col>
        <Col md={9}>Coming Soon!</Col>
      </Row>
      </div>
    </>
  );
};

export default Admin;

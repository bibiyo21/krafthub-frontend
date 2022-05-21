import React from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import Navigations from "../Navigations";

const Wrapper = ({ children }) => {
  
  const [showSP, setShowSP] = useState(false);
   const [showClient, setShowClient] = useState(true);
  const [buttonName, setbuttonName] = "as Client";
  
   const handleSP = () => {
        setShowSP(true);
     setShowClient(false);
    };
  
    const handleC = () => {
        setShowSP(false);
     setShowClient(true);

    };
  
  return (
    <>
      <Navigations />
      <section class="upcoming-meetings p-5" id="meetings">
        <div class="container">
        <Row>
          <Col md={3}>
            <Card>
              <Nav className="flex-column">
                <div>
                        <Button onClick={() => handleC() )} className="btn block btn-warning">Client</Button> | 
                        <Button onClick={() => handleSP() )} className="btn block btn-primary">Service Provider</Button>
                </div>
                <Nav.Link href={`/profile`} className="text-dark">Profile</Nav.Link>
                <Nav.Link href={`/profile/job`} className="text-dark">Jobs</Nav.Link>
                <Nav.Link href="/bookings/scheduled" className="text-dark" hidden = {showClient}>Scheduled Booking</Nav.Link>
                <Nav.Link href="/bookings/jobs" className="text-dark" hidden = {showSP} >Scheduled Jobs</Nav.Link>
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

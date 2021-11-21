import React, { useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";

const AvailabilityList = ({ list = null }) => {

  useEffect(() => {
    console.log('rerender')
  }, [list]);

  if (list === null) {
    return "";
  }

  // if (!list.length) {
  //   console.log(list)
  //   return <p>No Result </p>
  // }
  

  return (
    <div className="container-fluid mt-3">
      <Row>
        {
          list.map((availability) => {
            const { first_name, last_name, profession, specialty, time_in, time_out } = availability
            return (
              <Col md="3" className="mb-3">
                <Card style={{ width: "18rem" }}>
                  <i className="fas fa-user card-img-top fa-5x text-center my-4"></i>
                  <Card.Body>
                    <Card.Title className="text-center">{`${first_name} ${last_name}`}</Card.Title>
                    <Card.Text>
                      <b>{profession}</b> : {specialty} 
                    </Card.Text>
                    <Card.Text>
                      <b>Time Availability:</b> {time_in} to {time_out}
                    </Card.Text>
                    <Button variant="primary" className="btn-block">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
    
  );
};

export default AvailabilityList;

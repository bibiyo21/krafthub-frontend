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
    <section class="upcoming-meetings mt-5 py-5" id="meetings">
      <div class="container">
        <div class="row">
        {
          list.map((availability) => {
            const { first_name, last_name, profession, specialty, time_in, time_out } = availability
            return (
              <Col md="3" className="mb-3">
                <div className="meeting-item">
                  <div className="thumb bg-white">
                    <i className="fas fa-user card-img-top fa-5x text-center my-4"></i>
                  </div>
                  <div className="down-content">
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <p><b>{profession}</b> : {specialty} </p>
                    <p><b>Time Availability:</b> {time_in} to {time_out}</p>
                    <div class="d-grid gap-2">
                      <Button className="btn block btn-success">Book Now</Button>
                    </div>
                  </div>
                </div>
                
              </Col>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AvailabilityList;

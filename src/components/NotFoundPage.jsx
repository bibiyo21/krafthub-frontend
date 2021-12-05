import React from "react";
import { Card } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <>
      <div className="container pt-3">
      <Card>
          <Card.Body>
            <h2>404 Not Found</h2>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default NotFoundPage;

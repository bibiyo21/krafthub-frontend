import React from "react";

const Profile = () => {
  return (
    <>
      <Card>
        <Nav className="flex-column">
        <Nav.Link href={`/profile/job`}>Jobs</Nav.Link>
        <Nav.Link href="/">Scheduled Booking</Nav.Link>
        </Nav>
    </Card>
    </>
  );
};

export default Profile;

import React from "react";
import Wrapper from "./Wrapper";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <Wrapper>
        Hi, {user.first_name}
      </Wrapper>
    </>
  );
};

export default Profile;

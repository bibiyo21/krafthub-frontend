import React, { useState } from "react";
import AvailabilityList from "../AvailabilityList";
import Navigations from "../Navigations";
import SearchBar from "../SearchBar";
import Admin  from "../Admin";
import AuthenticationAPI from "../../api/services/Authentication/AuthenticationService";

const Home = () => {
  const [availabilityList, setAvailabilityList] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  
  if(user.access_level === 4) {
      return (
    <>
      <Admin />
    </>
  );
  } else {
    
      return (
    <>
      <Navigations />
      <div className="container pt-3">
        <SearchBar setAvailabilityResult={setAvailabilityList} />
      </div>
      <AvailabilityList list={availabilityList} />
    </>
  );
    
  }
  

};

export default Home;

import React, { useState } from "react";
import AvailabilityList from "../AvailabilityList";
import Navigations from "../Navigations";
import SearchBar from "../SearchBar";
import Admin  from "../Admin/Index";
import AuthenticationAPI from "../api/services/Authentication/AuthenticationService";

const Home = () => {
  const [availabilityList, setAvailabilityList] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <>
        {user.access_level === 4 && (
                      
           <Admin />
         )} 
    
      {user.access_level === 1 && (
                      
               <Navigations />
          <div className="container pt-3">
            <SearchBar setAvailabilityResult={setAvailabilityList} />
          </div>
          <AvailabilityList list={availabilityList} />
         )} 
    
     
    </>
  );
};

export default Home;

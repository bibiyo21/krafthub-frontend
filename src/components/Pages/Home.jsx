import React, { useState } from "react";
import AvailabilityList from "../AvailabilityList";
import Navigations from "../Navigations";
import SearchBar from "../SearchBar";
import Admin  from "../Admin/Index";

const Home = () => {
  const [availabilityList, setAvailabilityList] = useState(null);
  return (
    <>
        {user.access_level === 4 && (
                      
           <Admin />
           </>
         )} 
    
    
      <Navigations />
      <div className="container pt-3">
        <SearchBar setAvailabilityResult={setAvailabilityList} />
      </div>
      <AvailabilityList list={availabilityList} />
    </>
  );
};

export default Home;

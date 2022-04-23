import React, { useState } from "react";
import AvailabilityList from "../AvailabilityList";
import Navigations from "../Navigations";
import SearchBar from "../SearchBar";

const Home = () => {
  const [availabilityList, setAvailabilityList] = useState(null);
  return (
    <>
      <Navigations />
      <div className="container pt-3">
        <SearchBar setAvailabilityResult={setAvailabilityList} />
      </div>
      <AvailabilityList list={availabilityList} />
    </>
  );
};

export default Home;

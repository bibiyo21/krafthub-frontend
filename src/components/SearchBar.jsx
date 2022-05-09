import React, { useState, useEffect } from "react";
import JobsServiceAPI from "../api/services/Jobs/JobsService";
import { useForm } from "react-hook-form";
import AvailabilitiesServiceAPI from "../api/services/Availabilities/AvailabilitiesService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as dayjs from 'dayjs'

const SearchBar = ({
  setAvailabilityResult = null
}) => {
  const [jobs, setJobs] = useState(null);
  const [jobTypes, setJobTypes] = useState(null);
  const [jobID, setJobID] = useState(null);
  
  const [timeSearchVal, setTimeSearchVal] = useState(null);
  
  const { register, handleSubmit } = useForm();
  const onSearch = ({ userName, job, jobType, timeSearchIn, timeSearchOut }) => {
    
    if(timeSearchIn !== "Select time:" && timeSearchOut !== "Select time:") {
      
         AvailabilitiesServiceAPI.get({}).then(({ results }) => {

              setTimeSearchVal(results);

          });

              console.log(timeSearchVal);
      
         const timeResult = timeSearchVal ?
               
               timeSearchVal.filter(function(timeSearchVal){ return (timeSearchVal.time_in.toLowerCase() === timeSearchIn.toLowerCase()) && 
                                                                                    (timeSearchVal.time_out.toLowerCase() === timeSearchOut.toLowerCase())
                                                            })
                : [];
      
      
         setAvailabilityResult(timeResult);
      
      
    } else if (timeSearchIn !== "Select time:") {
      
      AvailabilitiesServiceAPI.get({}).then(({ results }) => {

              setTimeSearchVal(results);

          });

              console.log(timeSearchVal);
      
         setAvailabilityResult(timeSearchVal.filter(function(timeSearchVal){ return (timeSearchVal.time_in.toLowerCase() === timeSearchIn.toLowerCase()) 
                                                                            }));
      
    } else if (timeSearchOut !== "Select time:") {
      
      AvailabilitiesServiceAPI.get({}).then(({ results }) => {

              setTimeSearchVal(results);

          });

              console.log(timeSearchVal);
      
         setAvailabilityResult(timeSearchVal.filter(function(timeSearchVal){ return (timeSearchVal.time_out.toLowerCase() === timeSearchOut.toLowerCase()) 
                                                                            }));
      
    } else { 
      
            AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {
              if (setAvailabilityResult !== null) {

                    if (results.length !== 0) {
                      setAvailabilityResult(results);
                    } else {

                          job = jobs.filter(function(jobs){ return jobs.title.toLowerCase() === userName.toLowerCase() });
                          if(job.length !== 0) {

                              job = job[0].id;
                              userName = "";
                               AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {    
                                  if (setAvailabilityResult !== null) {
                                      if (results.length !== 0) {
                                      setAvailabilityResult(results);
                                      } else {
                                        toast.success("No Data Found.");
                                      }
                                    } 

                                })

                          } else { 


                              if(jobTypes !== null) {
                                 jobType = jobTypes.filter(function(jobTypes){ return jobTypes.title.toLowerCase() === userName.toLowerCase() });


                                if(jobType.length !== 0 ) {

                                    jobType = jobType[0].id;
                                   job = "";
                                userName = "";
                                 AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {    
                                    if (setAvailabilityResult !== null) {

                                         if (results.length !== 0) {
                                            setAvailabilityResult(results);
                                           } 

                                      } 

                                  })
                              } else {
                                             toast.warning("No Data Found.");
                                             return;
                               }



                            }    

                          } 



                    }

              } 



            })
      
    }

  };

  const onJobSearch = (e) => {
    e.preventDefault();
    JobsServiceAPI.getByTypes(e.target.value).then(({ results }) => {
      setJobTypes(results);
    })
  }
 

  useEffect(() => {
    AvailabilitiesServiceAPI.get({}).then(({ results }) => {
      if (setAvailabilityResult !== null) {
        setAvailabilityResult(results);
      }
    })

    
    JobsServiceAPI.getAllJobTypes().then(({ results }) => {
      setJobTypes(results);
    })
    
    JobsServiceAPI.get().then(({ results }) => {
      setJobs(results);
    })
  }, [])

  return (
    <section class="contact-us" id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 align-self-center">
            <div class="row">
              <div class="col-lg-12">
                <form className="p-3" id="contact" onSubmit={handleSubmit(onSearch)}>
                  <div class="row">
                    <div class="col-lg-3">
                      <fieldset>
                        <input type="text" className="form-control" placeholder="Search Maker" {...register("userName")} />
                      </fieldset>
                      
                    </div>
                   <div class="col-lg-3">
                        <fieldset>
                           <select id="TimePicker" name="TimePicker"  {...register("timeSearchIn")} >
                                                 <option value="Select time:">Select Time In:</option>
                                               <option value="8:00 AM">8:00 AM</option>
                                                        <option value="8:30 AM">8:30 AM</option>
                                                        <option value="9:00 AM">9:00 AM</option>
                                                        <option value="9:30 AM">9:30 AM</option>
                                                        <option value="10:00 AM">10:00 AM</option>
                                                        <option value="10:30 AM">10:30 AM</option>
                                                        <option value="11:00 AM">11:00 AM</option>
                                                        <option value="11:30 AM">11:30 AM</option>
                                                        <option value="12:00 NN">12:00 NN</option>
                                                        <option value="12:30 NN">12:30 NN</option>
                                                        <option value="01:00 PM">01:00 PM</option>
                                                        <option value="01:30 PM">01:30 PM</option>
                                                        <option value="02:00 PM">02:00 PM</option>
                                                        <option value="02:30 PM">02:30 PM</option>
                                                        <option value="03:00 PM">03:00 PM</option>
                                                        <option value="03:30 PM">03:30 PM</option>
                                                        <option value="04:00 PM">04:00 PM</option>
                                                        <option value="04:30 PM">04:30 PM</option>
                                                        <option value="05:00 PM">05:00 PM</option>
                                                        <option value="05:30 PM">05:30 PM</option>
                                                        <option value="06:00 PM">06:00 PM</option>
                                                        <option value="06:30 PM">06:30 PM</option>
                                                        <option value="07:00 PM">07:00 PM</option>
                                                        <option value="07:30 PM">07:30 PM</option>
                                                        <option value="08:00 PM">08:00 PM</option>
                                                        <option value="08:30 PM">08:30 PM</option>
                                                        <option value="09:00 PM">09:00 PM</option>
                                                        <option value="09:30 PM">09:30 PM</option>
                                                        <option value="10:00 PM">10:00 PM</option>
                                                        <option value="10:30 PM">10:30 PM</option>
                                              </select>
                             </fieldset>
                        </div>

                       <div class="col-lg-3">
                        <fieldset>
                           <select id="TimePicker" name="TimePicker"  {...register("timeSearchOut")} >
                                                 <option value="Select time:">Select Time Out:</option>
                                               <option value="8:00 AM">8:00 AM</option>
                                                        <option value="8:30 AM">8:30 AM</option>
                                                        <option value="9:00 AM">9:00 AM</option>
                                                        <option value="9:30 AM">9:30 AM</option>
                                                        <option value="10:00 AM">10:00 AM</option>
                                                        <option value="10:30 AM">10:30 AM</option>
                                                        <option value="11:00 AM">11:00 AM</option>
                                                        <option value="11:30 AM">11:30 AM</option>
                                                        <option value="12:00 NN">12:00 NN</option>
                                                        <option value="12:30 NN">12:30 NN</option>
                                                        <option value="01:00 PM">01:00 PM</option>
                                                        <option value="01:30 PM">01:30 PM</option>
                                                        <option value="02:00 PM">02:00 PM</option>
                                                        <option value="02:30 PM">02:30 PM</option>
                                                        <option value="03:00 PM">03:00 PM</option>
                                                        <option value="03:30 PM">03:30 PM</option>
                                                        <option value="04:00 PM">04:00 PM</option>
                                                        <option value="04:30 PM">04:30 PM</option>
                                                        <option value="05:00 PM">05:00 PM</option>
                                                        <option value="05:30 PM">05:30 PM</option>
                                                        <option value="06:00 PM">06:00 PM</option>
                                                        <option value="06:30 PM">06:30 PM</option>
                                                        <option value="07:00 PM">07:00 PM</option>
                                                        <option value="07:30 PM">07:30 PM</option>
                                                        <option value="08:00 PM">08:00 PM</option>
                                                        <option value="08:30 PM">08:30 PM</option>
                                                        <option value="09:00 PM">09:00 PM</option>
                                                        <option value="09:30 PM">09:30 PM</option>
                                                        <option value="10:00 PM">10:00 PM</option>
                                                        <option value="10:30 PM">10:30 PM</option>
                                              </select>
                             </fieldset>
                        </div>

                   
                    <div class="col-lg-3">
                      <fieldset className="text-center">
                        <button type="submit" id="form-submit" class="button">
                        <i className="fa fa-search"></i>
                          Search
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default SearchBar;

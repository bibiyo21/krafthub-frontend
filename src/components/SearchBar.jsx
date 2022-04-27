import React, { useState, useEffect } from "react";
import JobsServiceAPI from "../api/services/Jobs/JobsService";
import { useForm } from "react-hook-form";
import AvailabilitiesServiceAPI from "../api/services/Availabilities/AvailabilitiesService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = ({
  setAvailabilityResult = null
}) => {
  const [jobs, setJobs] = useState(null);
  const [jobTypes, setJobTypes] = useState(null);
  const [jobID, setJobID] = useState(null);
  
  const { register, handleSubmit } = useForm();
  const onSearch = ({ userName, job, jobType }) => {
    
    
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
                    
                    for( var i = 0; i < jobs.length; i++) {
                    
                    
                       JobsServiceAPI.getByTypes(jobs[i].id).then(({ results }) => {
                        setJobTypes(results);
                      })
                      
                      
                      if(jobTypes.length !== 0) {
                         jobType = jobTypes.filter(function(jobTypes){ return jobTypes.title.toLowerCase() === userName.toLowerCase() });
                        
                           
                        if(jobType.length !== 0 ) {

                            jobType = jobType[0].id;
                           job = "";
                        userName = "";
                         AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {    
                            if (setAvailabilityResult !== null) {
                                if (results.length !== 0) {
                                setAvailabilityResult(results);
                                  break;
                                } 
                              } 

                          })
                      }
                      
                     
                        
                        
                      } 
                     
                        
                    }    
                       
                  } 
              
              
                
            }

      } 
      

      
    })
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

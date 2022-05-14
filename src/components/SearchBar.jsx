import React, { useState, useEffect } from "react";
import JobsServiceAPI from "../api/services/Jobs/JobsService";
import { useForm } from "react-hook-form";
import AvailabilitiesServiceAPI from "../api/services/Availabilities/AvailabilitiesService";

const SearchBar = ({
  setAvailabilityResult = null
}) => {
  const [jobs, setJobs] = useState(null);
  const [jobTypes, setJobTypes] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSearch = ({ userName, job, jobType }) => {
    AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {
      if (setAvailabilityResult !== null) {
        setAvailabilityResult(results);
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
                      <fieldset>
                        <select defaultValue="" className="form-select" {...register("job")} onChange={onJobSearch}>
                          <option value="" disabled >Choose a Profession</option>
                          {
                            jobs && jobs.map((job, index) => {
                              return <option key={`job-${index}`} value={job.id}>{job.title}</option>
                            })
                          }
                        </select>
                      </fieldset>
                    </div>
                    <div class="col-lg-3">
                      <fieldset>
                      <select defaultValue="" className="form-select" {...register("jobType")}>
                        <option value="" disabled >Choose a Specialist</option>
                        {
                          jobTypes && jobTypes.map((job, index) => {
                            return <option key={`jobtype-${index}`} value={job.id}>{job.title}</option>
                          })
                        }
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

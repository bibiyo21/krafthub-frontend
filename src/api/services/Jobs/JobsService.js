import CommonService from "../common/commonService";

class JobsService extends CommonService {
  get = () => {
    return this.http
      .get(`/api/job-types`)
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);

        throw error;
      });
  };

  getByTypes = (jobId) => {
    return this.http
      .get(`/api/job-types/${jobId}`)
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);

        throw error;
      });
  };
}

const JobsServiceAPI = new JobsService();

export default JobsServiceAPI;

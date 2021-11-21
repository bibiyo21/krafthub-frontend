import CommonService from "../common/commonService";

class AvailabilitiesService extends CommonService {
  get = (params) => {
    return this.http
      .get(
        `/api/availabilities`,{ params }
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
}

const AvailabilitiesServiceAPI = new AvailabilitiesService();

export default AvailabilitiesServiceAPI;

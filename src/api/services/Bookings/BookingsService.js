import CommonService from "../common/commonService";

class BookingsService extends CommonService {
  getScheduled = (params) => {
    return this.http
      .get(
        `/api/bookings/scheduled`,{ params }
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  
  getScheduledAll = (params) => {
    return this.http
      .get(
        `/api/bookings/scheduledAll`,{ params }
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  getJobs = (params) => {
    return this.http
      .get(
        `/api/bookings/jobs`,{ params }
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  bookJob = (params) => {
    return this.http
      .post(
        `/api/book`, params
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
    });
  }

  updateBookingStatus = (params) => {
    return this.http
      .post(
        `/api/bookings/updatestatus`, params
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
    });
  }
}

const BookingsServiceAPI = new BookingsService();

export default BookingsServiceAPI;

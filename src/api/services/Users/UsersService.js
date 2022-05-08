import CommonService from "../common/commonService";

class UsersService extends CommonService {
  saveUser = (params) => {
    return this.http
      .put(`/api/users`, params)
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);

        throw error;
      });
  };
  
  updateUserStatus = (params) => {
    return this.http
      .post(
        `/api/user/updatestatus`, params
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
    });
  }; 
  
   updateUserValidity = (params) => {
    return this.http
      .post(
        `/api/user/updatevalidity`, params
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
    });
  }; 
    
   getAllUsers = (params) => {
    return this.http
      .get(
        `/api/userAll`,{ params }
      )
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  
  
}

const UsersServiceAPI = new UsersService();

export default UsersServiceAPI;

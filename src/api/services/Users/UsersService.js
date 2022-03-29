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
}

const UsersServiceAPI = new UsersService();

export default UsersServiceAPI;

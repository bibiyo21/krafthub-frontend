import CommonService from "../common/commonService";

class AuthenticationService extends CommonService {
  login = (params) => {
    return this.http
      .post(`/login`, { params })
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);

        throw error;
      });
  };
}

const AuthenticationAPI = new AuthenticationService();

export default AuthenticationAPI;

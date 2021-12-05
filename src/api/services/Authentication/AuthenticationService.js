import CommonService from "../common/commonService";

class AuthenticationService extends CommonService {
  login = (params) => {
    return this.http
      .post(`api/login`, params )
      .then(({ data }) => this.saveToLocalStorage(data))
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  register = (params) => {
    return this.http
      .post(`api/register`, params)
      .then(({ data }) => this.saveToLocalStorage(data))
      .catch((error) => {
        console.log(error);

        throw error;
      });
  };

  logout = () => {
    return this.http.post(`api/logout`).then(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    })
  }

  saveToLocalStorage = ({ token, user }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
}

const AuthenticationAPI = new AuthenticationService();

export default AuthenticationAPI;

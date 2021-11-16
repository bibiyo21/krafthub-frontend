import { axiosInstance } from "../../config/axios";

class CommonService {
  http;

  constructor() {
    this.http = axiosInstance;
  }
}

export default CommonService;

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
});

class APIClient {
  endpoint

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get(this.endpoint)
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance
      .get(this.endpoint)
      .then((res) => res.data);
  };

  post = (body) => {
    console.log('from axios')
    console.log(body)
    return axiosInstance
      .post(this.endpoint,body)
      .then((res) => res.data);
  };

  put = (id,body) => {
    return axiosInstance
      .put(`${this.endpoint}/${id}`,body)
      .then((res) => res.data);
  };

  delete = (id) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
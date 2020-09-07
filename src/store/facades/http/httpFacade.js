import axios from 'axios';
import AxiosHttp from './AxiosHttp';

class HttpFacade {
  getProvider() {
    switch (process.env.REACT_APP_HTTP_PROVIDER) {
      case 'axios':
      default:
        return new AxiosHttp(createAxiosInstance());
    }
  }
}

export default new HttpFacade();

function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_URL || 'http://localhost:5000',
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  });
}

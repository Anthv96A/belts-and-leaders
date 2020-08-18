import axios from 'axios';
import AxiosHttp from './AxiosHttp';
// import mockServer from './MockServer';

class HttpFacade {
  getProvider() {
    switch (process.env.NODE_ENV) {
      case 'development':
      default:
        // mockServer();
        return new AxiosHttp(createAxiosInstance());
    }
  }
}

export default new HttpFacade();

function createAxiosInstance() {
  return axios.create({
    baseUrl: process.env.URL || 'http://localhost',
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  });
}

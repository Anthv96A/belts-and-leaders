import { format } from 'react-string-format';
import BaseHttp from './BaseHttp';
import ApplicationError from '../../../error/ApplicationError';

class AxiosHttp extends BaseHttp {
  constructor(axios) {
    super();
    this._axios = axios;
  }

  async onGetAsync(url) {
    try {
      const response = await this._axios.get(url);
      if (!super.isStatusCodeOk(response.status)) throw new ApplicationError(response.statusText, response.status);

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async onGetOneAsync(url, id) {
    try {
      const response = await this._axios.get(format(url, id));
      if (!super.isStatusCodeOk(response.status)) throw new ApplicationError(response.statusText, response.status);

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async onCreateAsync(url, body) {
    try {
      const response = await this._axios.post(url, body);
      if (!super.isStatusCodeOk(response.status)) throw new ApplicationError(response.statusText, response.status);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async onDeleteAsync(url, id) {
    try {
      const response = await this._axios.delete(format(url, id));
      if (!super.isStatusCodeOk(response.status)) throw new ApplicationError(response.statusText, response.status);
    } catch (error) {
      throw error;
    }
  }

  async onUpdateAsync(url, id, body) {
    try {
      const response = await this._axios.put(format(url, id), body);
      if (!super.isStatusCodeOk(response.status)) throw new ApplicationError(response.statusText, response.status);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AxiosHttp;

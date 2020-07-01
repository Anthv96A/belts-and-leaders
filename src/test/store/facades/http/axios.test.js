import AxiosHttp from '../../../../store/facades/http/AxiosHttp';
import exceptions from '../../../helpers/exceptions';
import ApplicationError from '../../../../error/ApplicationError';

describe('Axios Http', () => {
  describe('Get', () => {
    it('Should get the response back as expected', async () => {
      const data = [{ message: 'Hello world' }];
      const axios = mockAxios((mock) => {
        mock.get = async (url) => {
          return { status: 200, data, url };
        };
      });
      const axiosHttp = new AxiosHttp(axios);
      const responseData = await axiosHttp.getAsync('get');

      expect(responseData).toEqual(data);
    });

    it('Should throw on a response status code of 400', async () => {
      await exceptions.exceptionHandlingAsync(async () => {
        const axios = mockAxios((mock) => {
          mock.get = async (url) => {
            return { status: 400, statusText: 'Bad Request', url };
          };
        });
        const axiosHttp = new AxiosHttp(axios);
        await axiosHttp.getAsync('get');
      }, err => assertApplicationError(err, 400, 'Bad Request'));
    });
  });

  describe('Get One', () => {
    it('Should get the response back as expected', async () => {
      const data = { message: 'Hello world' };
      const axios = mockAxios((mock) => {
        mock.get = async (url) => {
          return { status: 200, data, url };
        };
      });
      const axiosHttp = new AxiosHttp(axios);
      const responseData = await axiosHttp.getOneAsync('get');

      expect(responseData).toEqual(data);
    });

    it('Should throw on a response status code of 400', async () => {
      await exceptions.exceptionHandlingAsync(async () => {
        const axios = mockAxios((mock) => {
          mock.get = async (url) => {
            return { status: 400, statusText: 'Bad Request', url };
          };
        });
        const axiosHttp = new AxiosHttp(axios);
        await axiosHttp.getOneAsync('get');
      }, err => assertApplicationError(err, 400, 'Bad Request'));
    });
  });

  describe('Create', () => {
    it('Should get the response back as expected', async () => {
      const data = { message: 'Hello world' };
      const axios = mockAxios((mock) => {
        mock.post = async (url, body) => {
          return { status: 200, data: body, url };
        };
      });
      const axiosHttp = new AxiosHttp(axios);
      const responseData = await axiosHttp.createAsync('post', data);

      expect(responseData).toEqual(data);
    });

    it('Should throw on a response status code of 400', async () => {
      await exceptions.exceptionHandlingAsync(async () => {
        const axios = mockAxios((mock) => {
          mock.post = async (url) => {
            return { status: 400, statusText: 'Bad Request', url };
          };
        });
        const axiosHttp = new AxiosHttp(axios);
        await axiosHttp.createAsync('post', {});
      }, err => assertApplicationError(err, 400, 'Bad Request'));
    });
  });

  describe('Update', () => {
    it('Should get the response back as expected', async () => {
      const data = { message: 'Hello world' };
      const axios = mockAxios((mock) => {
        mock.put = async (url, body) => {
          return { status: 200, data: body, url };
        };
      });
      const axiosHttp = new AxiosHttp(axios);
      const responseData = await axiosHttp.updateAsync('put', 'id', data);

      expect(responseData).toEqual(data);
    });

    it('Should throw on a response status code of 400', async () => {
      await exceptions.exceptionHandlingAsync(async () => {
        const axios = mockAxios((mock) => {
          mock.put = async (url) => {
            return { status: 400, statusText: 'Bad Request', url };
          };
        });
        const axiosHttp = new AxiosHttp(axios);
        await axiosHttp.updateAsync('put', 'id', {});
      }, err => assertApplicationError(err, 400, 'Bad Request'));
    });
  });

  describe('Delete', () => {
    it('Should get the response back as expected', async () => {
      let called = 0;
      const axios = mockAxios((mock) => {
        mock.delete = async (url) => {
          called += 1;
          return { status: 204, url };
        };
      });
      const axiosHttp = new AxiosHttp(axios);
      await axiosHttp.deleteAsync('delete', 'id');

      expect(called).toEqual(1);
    });

    it('Should throw on a response status code of 400', async () => {
      await exceptions.exceptionHandlingAsync(async () => {
        const axios = mockAxios((mock) => {
          mock.delete = async (url) => {
            return { status: 400, statusText: 'Bad Request', url };
          };
        });
        const axiosHttp = new AxiosHttp(axios);
        await axiosHttp.deleteAsync('delete', 'id');
      }, err => assertApplicationError(err, 400, 'Bad Request'));
    });
  });
});

function assertApplicationError(err, status, msg) {
  expect(err).toBeInstanceOf(ApplicationError);
  expect(err.status).toBe(status);
  expect(err.message).toBe(msg);
}


function mockAxios(config = null) {
  const mock = {
    get: async (url) => { return { url }; },
    post: async (url, body) => { return { url, body }; },
    put: async (url, body) => { return { url, body }; },
    patch: async (url, body) => { return { url, body }; },
    delete: async (url) => { return { url }; }
  };

  if (config) config(mock);
  return mock;
}

class BaseHttp {
  async getAsync(url) {
    return this.onGetAsync(url);
  }

  async getOneAsync(url, id) {
    return this.onGetOneAsync(url, id);
  }

  async createAsync(url, body) {
    return this.onCreateAsync(url, body);
  }

  async deleteAsync(url, id) {
    return this.onDeleteAsync(url, id);
  }

  async updateAsync(url, id, body) {
    return this.onUpdateAsync(url, id, body);
  }

  async onGetAsync(url) {
    throw new Error(`Not implemented ${url}`);
  }

  async onGetOneAsync(url, id) {
    throw new Error(`Not implemented ${url} ${id}`);
  }

  async onCreateAsync(url, body) {
    throw new Error(`Not implemented ${url} ${body}`);
  }

  async onDeleteAsync(url, id) {
    throw new Error(`Not implemented ${url} ${id}`);
  }

  async onUpdateAsync(url, id, body) {
    throw new Error(`Not implemented ${url} ${id} ${body}`);
  }

  isStatusCodeOk(code) {
    const statusCode = typeof code === 'string' ? Number(code) : code;
    return statusCode <= 299 && statusCode >= 200;
  }
}

export default BaseHttp;

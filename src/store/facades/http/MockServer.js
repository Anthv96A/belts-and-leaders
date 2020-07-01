import { Server } from 'miragejs';
import * as routes from '../../actions/routes';

function register() {
  const server = createMockServer();

  server.get(routes.usersRoot, (schema) => {
    return schema.db.users;
  });
  server.post(routes.usersRoot, (_, request) => {
    return JSON.parse(request.requestBody).data;
  });
}

export default register;

function createMockServer() {
  const server = new Server();

  server.db.loadData({
    users: [...loadUsers()]
  });
  return server;
}

function loadUsers() {
  return [
    {
      id: 1,
      name: 'test1',
      email: 'test1@example.com',
      maturityLevel: 25,
      belt: 'black',
      specialistArea: 'Test area 1',
      championStartDate: new Date()
    },
    {
      id: 2,
      name: 'test2',
      email: 'test2@example.com',
      maturityLevel: 24,
      belt: 'black',
      specialistArea: 'Test area 2',
      championStartDate: new Date()
    },
    {
      id: 3,
      name: 'test3',
      email: 'test3@example.com',
      maturityLevel: 23,
      belt: 'black',
      specialistArea: 'Test area 3',
      championStartDate: new Date()
    }
  ];
}

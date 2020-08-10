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
      championStartDate: new Date(),
      rank: 1
    },
    {
      id: 2,
      name: 'test2',
      email: 'test2@example.com',
      maturityLevel: 24,
      belt: 'black',
      specialistArea: 'Test area 2',
      championStartDate: new Date(),
      rank: 2
    },
    {
      id: 3,
      name: 'test3',
      email: 'test3@example.com',
      maturityLevel: 23,
      belt: 'black',
      specialistArea: 'Test area 3',
      championStartDate: new Date(),
      rank: 3
    },
    {
      id: 4,
      name: 'test4',
      email: 'test4@example.com',
      maturityLevel: 24,
      belt: 'black',
      specialistArea: 'Test area 4',
      championStartDate: new Date(),
      rank: 4
    },
    {
      id: 5,
      name: 'test5',
      email: 'test5@example.com',
      maturityLevel: 25,
      belt: 'black',
      specialistArea: 'Test area 5',
      championStartDate: new Date(),
      rank: 5
    },
    {
      id: 6,
      name: 'test6',
      email: 'test6@example.com',
      maturityLevel: 22,
      belt: 'black',
      specialistArea: 'Test area 6',
      championStartDate: new Date(),
      rank: 6
    },
    {
      id: 7,
      name: 'test7',
      email: 'test7@example.com',
      maturityLevel: 10,
      belt: 'yellow',
      specialistArea: 'Test area 7',
      championStartDate: new Date(),
      rank: 7
    }
  ];
}

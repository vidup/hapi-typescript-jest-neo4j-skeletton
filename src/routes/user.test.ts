import UserRoutes from './user';

const userGet = UserRoutes.find(r => r.path === '/');

test.skip('Result should be an array of names', async () => {
  const users: string[] = await userGet.handler();
  expect(users.length).toBe(6);
});

import User from './user';

test('getAll should return 6 users if no parameters is given', async () => {
  const users = await User.getAll();
  expect(users.length).toBe(6);
});

test.skip('getAll should return only men if "men" gender parameter is given', async () => {
  const users = await User.getAll('men');
  expect(users.length).toBe(3);
});

test.skip('getAll should return only women if "women" gender parameter is given', async () => {
  const users = await User.getAll('women');
  expect(users.length).toBe(3);
});

import User, { TGender } from './user';
import { neo4j } from '../db';

interface ITestUser {
  gender: TGender;
}

interface IRecord {
  user: ITestUser;
}

const initQuery = `
  MATCH (u:User)
  RETURN u { .gender } as user
`;

const getTestUsers = async (): Promise<ITestUser[]> => {
  const records = await neo4j.getRecords(initQuery);
  return records.map(r => r.user);
};

const testObject = {} as { users: ITestUser[] };

beforeAll(async () => {
  const users = await getTestUsers();
  testObject.users = users;
});

test('getAll should return the correct number users if no parameters is given', async () => {
  const users = await User.getAll();
  expect(users.length).toBe(testObject.users.length);
});

test('getAll should return only men if "men" gender parameter is given', async () => {
  const users = await User.getAll('M');
  expect(users.length).toBe(
    testObject.users.filter(u => u.gender === 'M').length
  );
});

test('getAll should return only women if "women" gender parameter is given', async () => {
  const users = await User.getAll('F');
  expect(users.length).toBe(
    testObject.users.filter(u => u.gender === 'F').length
  );
});

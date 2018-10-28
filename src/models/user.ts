import { neo4j } from '../db';
import { isNil } from '../utils';

type TGender = 'W' | 'M';

class User {
  getAll = async (gender?: TGender) => {
    const records = await neo4j.getRecords(
      `
      MATCH (u:User ${!isNil(gender) ? '{gender: {gender}}' : ''})
      RETURN u { .* } as user
    `,
      { gender }
    );

    return records.map(r => r.user);
  };
}

export default new User();

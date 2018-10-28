import { neo4j } from '../db';
import { isNil } from '../utils';

export type TGender = 'F' | 'M';

class User {
  getAll = async (gender?: TGender) => {
    console.log(gender);
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

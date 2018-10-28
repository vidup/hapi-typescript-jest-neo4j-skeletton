import 'dotenv/config';
import neo4j from 'neo4j-driver';
import ITransaction from '../../node_modules/neo4j-driver/types/v1/transaction';

import { object } from 'joi';

type TParameter = string | number | object;

export interface IParameters {
  [key: string]: string | number | object;
}

export interface ICustomTransaction extends ITransaction {
  getRecord: (query: string, parameters?: IParameters) => Promise<any | null>;
  getRecords: (
    query: string,
    parameters?: IParameters
  ) => Promise<Array<any | null>>;
}

const driver = neo4j.driver(
  `bolt://${process.env.NEO4J_HOST}`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS),
  { encrypted: false }
);

export default {
  session: () => driver.session(),
  int: neo4j.int,
  run: async (query: string, params: IParameters): Promise<any> => {
    const session = driver.session();

    try {
      const result = await session.run(query, params);
      session.close();
      return result;
    } catch (error) {
      session.close();
      throw error;
    }
  },
  getRecord: async (
    query: string,
    params?: IParameters
  ): Promise<any | null> => {
    const session = driver.session();

    try {
      const result = await session.run(query, params);
      session.close();

      if (result.records.length === 0) return null;
      return result.records[0].toObject();
    } catch (error) {
      session.close();
      throw error;
    }
  },
  getRecords: async (
    query: string,
    params?: IParameters
  ): Promise<Array<any | null>> => {
    const session = driver.session();

    try {
      const result = await session.run(query, params);
      session.close();

      const records = result.records.map(x => x.toObject());
      return records;
    } catch (error) {
      session.close();
      throw error;
    }
  },
  beginTransaction: () => {
    const session = driver.session();
    const tx = session.beginTransaction() as ICustomTransaction;

    tx.getRecord = async (query: string, params?: IParameters) => {
      const result = await tx.run(query, params);
      if (result.records.length === 0) return null;
      return result.records[0].toObject();
    };

    tx.getRecords = async (query: string, params?: IParameters) => {
      const result = await tx.run(query, params);
      const records = result.records.map(x => x.toObject());
      return records;
    };

    return { session, tx };
  }
};

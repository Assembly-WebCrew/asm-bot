import { createConnection, Connection } from 'typeorm';

import * as typeOrmOptions from './ormconfig'

export const dbConnection = async () => {
  return await createConnection(typeOrmOptions)
};

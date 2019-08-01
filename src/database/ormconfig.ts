import { ConnectionOptions } from "typeorm";

const typeOrmOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'asm.botdb172',
  database: 'asmbot',
  migrationsRun: true,
  synchronize: false,
  entities: ['src/database/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations'
  },
  uuidExtension: 'pgcrypto'
}

export = typeOrmOptions
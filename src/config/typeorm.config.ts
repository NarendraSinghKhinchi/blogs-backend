import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Log } from '../logs/schemas/logs.schema';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ep-divine-scene-a5sfmtnx-pooler.us-east-2.aws.neon.tech',
  port: 5432,
  username: process.env.NEON_USER,
  password: process.env.NEON_PASSWORD,
  database: 'neondb',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Log],
  synchronize: true,
};

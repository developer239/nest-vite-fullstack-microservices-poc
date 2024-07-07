import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const databaseConfigSchema = {
  DATABASE_HOST: Joi.string(),
  DATABASE_NAME: Joi.string(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_PORT: Joi.string(),
  RUN_MIGRATIONS: Joi.boolean().default(true),
}

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : undefined,
  runMigrations: process.env.RUN_MIGRATIONS === 'true',
}))

export type DatabaseConfigType = ConfigType<typeof databaseConfig>

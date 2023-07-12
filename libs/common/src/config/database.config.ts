import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const databaseConfigSchema = {
  DATABASE_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().required(),
  DATABASE_MAX_CONNECTIONS: Joi.number().required(),
  DATABASE_SSL_ENABLED: Joi.boolean().required(),
  DATABASE_REJECT_UNAUTHORIZED: Joi.boolean().required(),
  DATABASE_CA: Joi.string().optional().allow(''),
  DATABASE_KEY: Joi.string().optional().allow(''),
  DATABASE_CERT: Joi.string().optional().allow(''),
}

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS!, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
}))

export type DatabaseConfigType = ConfigType<typeof databaseConfig>

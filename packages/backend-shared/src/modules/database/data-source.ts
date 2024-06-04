import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { DataSource } from 'typeorm'

export const createDataSource = (
  moduleWithDataSource: any
): Promise<DataSource> =>
  new Promise(async (resolve) => {
    // this file is used from command line
    // if we are in dev mode then
    //   we need to set the host to 0.0.0.0 in case the app is running in a Docker container
    if (process.env.NODE_ENV === 'dev') {
      process.env.DATABASE_HOST = '0.0.0.0'
    }

    const app = await NestFactory.create(moduleWithDataSource)
    const dataSource = app.get(DataSource)
    await app.close()

    resolve(dataSource)
  })

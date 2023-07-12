/* eslint-disable @typescript-eslint/no-misused-promises, no-async-promise-executor */
import 'reflect-metadata'
import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DataSource } from 'typeorm'
import { WrappedConfigModule } from '@app/events/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/events/modules/database/database.module'

@Module({
  imports: [WrappedConfigModule.forRoot(), WrappedDatabaseModule],
})
class ModuleWithDataSource {}

export const AppDataSource: Promise<DataSource> = new Promise(
  async (resolve) => {
    const app = await NestFactory.create(ModuleWithDataSource)
    const dataSource = app.get(DataSource)
    await app.close()

    resolve(dataSource)
  }
)

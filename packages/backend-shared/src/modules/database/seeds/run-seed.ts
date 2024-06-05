import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DataSource } from 'typeorm'

export const clearDatabase = async (app: INestApplication) => {
  const dataSource = app.get(DataSource)
  const entities = dataSource.entityMetadatas
  await Promise.all(
    entities.map(async (entity) => {
      const repository = dataSource.getRepository(entity.name)
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`
      )
    })
  )
}

export const runSeed = async (seedModule: any, seedServices: any[]) => {
  const app = await NestFactory.create(seedModule)

  await clearDatabase(app)

  for (const seedService of seedServices) {
    await app.get(seedService).run()
  }

  await app.close()
}

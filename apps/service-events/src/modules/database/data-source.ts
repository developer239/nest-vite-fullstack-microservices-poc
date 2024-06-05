import 'reflect-metadata'
import {
  createDataSource,
  SeedModule as ModuleWithDataSource,
} from 'backend-shared'
import { DataSource } from 'typeorm'
import { EventSeedModule } from 'src/modules/database/seeds/event/event-seed.module'

export const AppDataSource: Promise<DataSource> = createDataSource(
  ModuleWithDataSource.forRoot(__dirname, {
    imports: [EventSeedModule],
  })
)

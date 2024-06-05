import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { createDataSource, SeedModule } from 'backend-shared'
import { EventSeedModule } from 'src/modules/database/seeds/event/event-seed.module'

export const AppDataSource: Promise<DataSource> = createDataSource(
  SeedModule.forRoot(__dirname, {
    imports: [EventSeedModule],
  })
)

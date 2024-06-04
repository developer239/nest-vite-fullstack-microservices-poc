import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { createDataSource, SeedModule } from 'backend-shared'
import { EventSeedModule } from 'src/modules/database/seeds/user/event-seed.module'

export const AppDataSource: Promise<DataSource> = createDataSource(
  SeedModule.forRoot({
    imports: [EventSeedModule],
  })
)

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { createDataSource, SeedModule } from 'backend-shared'
import { UserSeedModule } from 'src/modules/database/seeds/user/user-seed.module'

export const AppDataSource: Promise<DataSource> = createDataSource(
  SeedModule.forRoot({
    imports: [UserSeedModule],
  })
)

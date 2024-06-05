import 'reflect-metadata'
import {
  createDataSource,
  SeedModule as ModuleWithDataSource,
} from 'backend-shared'
import { DataSource } from 'typeorm'
import { UserSeedModule } from 'src/modules/database/seeds/user/user-seed.module'

export const AppDataSource: Promise<DataSource> = createDataSource(
  ModuleWithDataSource.forRoot(__dirname, {
    imports: [UserSeedModule],
  })
)

import { Module } from '@nestjs/common'
import { DatabaseModule } from '@shared/common/modules/database/database.module'

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
      cli: {
        entitiesDir: 'apps/auth/src',
        migrationsDir: 'apps/auth/src/modules/database/migrations',
        subscribersDir: 'apps/auth/subscriber',
      },
    }),
  ],
})
export class WrappedDatabaseModule {}

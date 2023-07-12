import { Module } from '@nestjs/common'
import { DatabaseModule } from '@shared/common/modules/database/database.module'

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
      cli: {
        entitiesDir: 'apps/events/src',
        migrationsDir: 'apps/events/src/modules/database/migrations',
        subscribersDir: 'apps/events/subscriber',
      },
    }),
  ],
})
export class WrappedDatabaseModule {}

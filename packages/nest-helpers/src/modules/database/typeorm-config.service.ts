import { Inject, Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { appConfig, AppConfigType } from '../../config/app.config'
import {
  databaseConfig,
  DatabaseConfigType,
} from '../../config/database.config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly databaseConfigValues: DatabaseConfigType,
    @Inject(appConfig.KEY)
    private readonly appConfigValues: AppConfigType,
    @Inject('WORKING_DIRECTORY') private readonly workingDir: string
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isLocalDevelopment = ['0.0.0.0', 'database'].includes(
      this.databaseConfigValues.host!
    )

    // For some reason, Vitest doesn't like the js file extension even though it shouldn't load migrations
    const isVitest =
      this.appConfigValues.nodeEnv === 'test' ||
      this.appConfigValues.nodeEnv === 'ci'

    return {
      type: 'postgres',
      database: this.databaseConfigValues.name,
      host: this.databaseConfigValues.host,
      username: this.databaseConfigValues.user,
      password: this.databaseConfigValues.password,
      port: this.databaseConfigValues.port,
      autoLoadEntities: true,
      logging: ['error'],
      migrationsRun: !isLocalDevelopment,
      migrations: isVitest
        ? []
        : [`${this.workingDir}/migrations/**/*{.ts,.js}`],
      cli: {
        entitiesDir: `${this.workingDir}/../../../src/modules/database/entities`,
        migrationsDir: `${this.workingDir}/../../../src/modules/database/migrations`,
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions
  }
}

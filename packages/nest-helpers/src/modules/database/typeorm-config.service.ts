import * as path from 'node:path'
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
      extra: {
        socketPath: this.databaseConfigValues.host,
      },
      autoLoadEntities: true,
      logging: ['query', 'error', 'warn', 'info', 'log', 'migration'],
      migrationsRun: this.databaseConfigValues.runMigrations,
      migrations: isVitest
        ? []
        : [
            // Note: this is a hack because this file lives in the nest-helpers package
            // and there is a difference when working in CLI vs in APP
            // you can safely ignore this as long as migrationsRun is false "NONE" value doesn't matter as no migrations will be found
            this.databaseConfigValues.runMigrations &&
            this.workingDir === 'NONE'
              ? path.join(
                  path.resolve(__dirname, '../../../../../../'),
                  'apps',
                  '**',
                  'dist',
                  'modules',
                  'database',
                  'migrations',
                  '*{.ts,.js}'
                )
              : path.join(this.workingDir, 'migrations', '**', '*{.ts,.js}'),
          ],
      cli: {
        entitiesDir: `${this.workingDir}/../../../src/modules/database/entities`,
        migrationsDir: `${this.workingDir}/../../../src/modules/database/migrations`,
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions
  }
}

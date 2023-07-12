import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from '@shared/common/modules/database/typeorm-config.service'

export interface IDatabaseModuleOptions {
  entities: string[]
  migrations: string[]
  cli: {
    entitiesDir: string
    migrationsDir: string
    subscribersDir: string
  }
}

@Module({})
export class DatabaseModule {
  static forRoot(moduleOptions: IDatabaseModuleOptions) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [TypeOrmConfigService],
          useFactory: (configService: TypeOrmConfigService) => {
            const baseConfig = configService.createTypeOrmOptions()

            return {
              ...baseConfig,
              entities: moduleOptions.entities,
              migrations: moduleOptions.migrations,
              cli: moduleOptions.cli,
            }
          },
          extraProviders: [TypeOrmConfigService],
        }),
      ],
    }
  }
}

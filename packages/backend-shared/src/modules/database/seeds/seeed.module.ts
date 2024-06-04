import { InternalServerErrorException, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { databaseConfig } from '../../../config/database.config'
import { TypeOrmConfigService } from '../typeorm-config.service'
import { appConfig } from '../../../config/app.config'

@Module({})
export class SeedModule {
  static forRoot({ imports }: { imports: any[] }) {
    return {
      module: SeedModule,
      imports: [
        ...imports,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig, appConfig],
        }),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: (options) => {
            if (!options) {
              throw new InternalServerErrorException(
                'No options provided to TypeOrmModule.forRootAsync'
              )
            }

            return new DataSource(options).initialize()
          },
        }),
      ],
    }
  }
}

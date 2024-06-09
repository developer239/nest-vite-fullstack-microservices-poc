import { InternalServerErrorException, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { appConfig } from '../../../config/app.config'
import { databaseConfig } from '../../../config/database.config'
import { HackProvideWorkingDirModule } from '../provide-working-dir.module'
import { TypeOrmConfigService } from '../typeorm-config.service'

@Module({})
export class SeedModule {
  static forRoot(
    workingDir: string,
    { imports }: { imports: any[] } = { imports: [] }
  ) {
    return {
      module: SeedModule,
      imports: [
        ...imports,
        HackProvideWorkingDirModule.forRoot(workingDir),
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

import { InternalServerErrorException, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { HackProvideWorkingDirModule } from './provide-working-dir.module'
import { TypeOrmConfigService } from './typeorm-config.service'

@Module({})
export class DatabaseModule {
  static forRootAsync() {
    return {
      module: DatabaseModule,
      imports: [
        HackProvideWorkingDirModule.forRoot('NONE'),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options) => {
            if (!options) {
              throw new InternalServerErrorException(
                'No options provided to TypeOrmModule.forRootAsync'
              )
            }

            const dataSource = await new DataSource(options).initialize()
            return dataSource
          },
        }),
      ],
    }
  }
}

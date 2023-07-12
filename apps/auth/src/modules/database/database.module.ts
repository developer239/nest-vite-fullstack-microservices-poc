import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { TypeOrmConfigService } from '@app/auth/modules/database/typeorm-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('No options provided to TypeOrmModule.forRootAsync')
        }

        const dataSource = await new DataSource(options).initialize()
        return dataSource
      },
    }),
  ],
})
export class DatabaseModule {}

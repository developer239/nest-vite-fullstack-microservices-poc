import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { databaseConfig } from '@app/auth/config/database.config'
import { UserSeedModule } from '@app/auth/modules/database/seeds/user/user-seed.module'
import { TypeOrmConfigService } from '@app/auth/modules/database/typeorm-config.service'

@Module({
  imports: [
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('No options provided to TypeOrmModule.forRootAsync')
        }

        return new DataSource(options).initialize()
      },
    }),
  ],
})
export class SeedModule {}

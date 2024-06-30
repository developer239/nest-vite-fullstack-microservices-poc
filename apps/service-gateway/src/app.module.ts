import { Module } from '@nestjs/common'
import { HomeModule } from 'nest-helpers'
import { ConfigModule } from 'src/modules/config/config.module'
import { GraphQLModule } from 'src/modules/graphql/graphql.module'

@Module({
  imports: [ConfigModule, HomeModule, GraphQLModule],
})
export class AppModule {}

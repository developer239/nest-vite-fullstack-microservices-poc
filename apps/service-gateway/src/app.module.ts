import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { WrappedGraphQLModule } from 'src/modules/graphql/graphql.module'

@Module({
  imports: [WrappedConfigModule, HomeModule, WrappedGraphQLModule],
})
export class AppModule {}

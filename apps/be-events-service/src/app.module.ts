import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { GraphQLModule } from '@nestjs/graphql'
import { EventModule } from 'src/modules/events/events.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // TODO: add complexity plugin
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req, res }: any) => ({ req, res }),
    }),
    EventModule,
  ],
})
export class AppModule {}

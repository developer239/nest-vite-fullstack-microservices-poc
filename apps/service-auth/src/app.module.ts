import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from 'src/modules/users/user.module'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    UserModule,
  ],
})
export class AppModule {}

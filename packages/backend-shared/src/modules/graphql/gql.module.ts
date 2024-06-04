import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'

@Module({})
export class WrappedGraphQLModule {
  static forRoot() {
    return {
      module: WrappedGraphQLModule,
      imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          introspection: true,
          plugins: [ApolloServerPluginInlineTrace()],
        }),
      ],
    }
  }
}

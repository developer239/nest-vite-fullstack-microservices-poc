import { Module } from '@nestjs/common'
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'

@Module({})
export class GraphQLModule {
  static forRoot() {
    return {
      module: GraphQLModule,
      imports: [
        BaseGraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          introspection: true,
          plugins: [ApolloServerPluginInlineTrace()],
        }),
      ],
    }
  }
}

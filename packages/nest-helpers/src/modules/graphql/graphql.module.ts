import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql'

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

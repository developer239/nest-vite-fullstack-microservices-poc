import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { ApolloComplexityPlugin, HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { IntrospectAndCompose } from '@apollo/gateway'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      server: {
        plugins: [new ApolloComplexityPlugin(50)],
      },
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          // TODO: get ports fron .env
          subgraphs: [
            { name: 'auth', url: 'http://localhost:8081/graphql' },
            { name: 'events', url: 'http://localhost:8082/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}

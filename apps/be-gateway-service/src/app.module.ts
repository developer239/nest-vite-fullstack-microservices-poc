import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { IntrospectAndCompose } from '@apollo/gateway'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://localhost:8080/graphql' },
            { name: 'events', url: 'http://localhost:8081/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
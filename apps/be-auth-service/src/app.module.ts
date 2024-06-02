import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from 'src/modules/users/user.module'
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
    UserModule,
  ],
})
export class AppModule {}

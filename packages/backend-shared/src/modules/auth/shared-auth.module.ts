import { DynamicModule, Module, Global, Type } from '@nestjs/common'
import { IUserVerificationService } from './constants'
import { FirebaseService } from './services/firebase.service'
import { FirebaseStrategy } from './strategies/firebase.strategy'

export interface IAsyncModuleOptions {
  userVerificationService: Type<IUserVerificationService>
}

@Global()
@Module({})
export class SharedAuthModule {
  static forRoot({
    userVerificationService,
  }: IAsyncModuleOptions): DynamicModule {
    return {
      module: SharedAuthModule,
      providers: [
        FirebaseService,
        FirebaseStrategy,
        {
          provide: IUserVerificationService,
          useClass: userVerificationService,
        },
      ],
      exports: [FirebaseService, FirebaseStrategy],
    }
  }
}

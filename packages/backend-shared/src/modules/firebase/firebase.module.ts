import { DynamicModule, Module, Global, Type } from '@nestjs/common'
import { IUserVerificationService } from './constants'
import { FirebaseService } from './services/firebase.service'
import { FirebaseStrategy } from './strategies/firebase.strategy'

export interface IAsyncModuleOptions {
  userVerificationService: Type<IUserVerificationService>
}

@Module({})
export class FirebaseModule {
  static forRoot({
    userVerificationService,
  }: IAsyncModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
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

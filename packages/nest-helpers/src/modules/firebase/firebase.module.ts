import { DynamicModule, Module, Type } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface'
import { PassportModule } from '@nestjs/passport'
import { IUserVerificationService } from './constants'
import { FirebaseService } from './services/firebase.service'
import { FirebaseStrategy } from './strategies/firebase.strategy'

export interface IAsyncModuleOptions {
  userVerificationService: Type<IUserVerificationService>
  imports?: ModuleMetadata['imports']
  inject?: ModuleMetadata['providers']
}

@Module({})
export class FirebaseModule {
  static forRoot({
    imports,
    inject,
    userVerificationService,
  }: IAsyncModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      imports: [PassportModule, ...(imports ? imports : [])],
      providers: [
        FirebaseService,
        FirebaseStrategy,
        {
          provide: IUserVerificationService,
          useClass: userVerificationService,
        },
        ...(inject ? inject : []),
      ],
      exports: [FirebaseService, FirebaseStrategy],
    }
  }
}

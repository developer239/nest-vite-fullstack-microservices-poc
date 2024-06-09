import { Global, Module } from '@nestjs/common'

@Global()
@Module({})
export class HackProvideWorkingDirModule {
  static forRoot(workingDir: string) {
    return {
      module: HackProvideWorkingDirModule,
      providers: [
        {
          provide: 'WORKING_DIRECTORY',
          useValue: workingDir,
        },
      ],
      exports: ['WORKING_DIRECTORY'],
    }
  }
}

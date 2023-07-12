import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public getHello(): string {
    return 'Hello world from common library!';
  }
}

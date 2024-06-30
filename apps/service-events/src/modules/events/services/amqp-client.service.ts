import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  CHECK_USER_EXISTS_CMD,
  ICheckUserExistsInput,
  ICheckUserExistsResult,
} from 'amqp-contracts'
import { firstValueFrom } from 'rxjs'
import { AMQP_SERVICE_AUTH } from 'src/constants'

@Injectable()
export class AMQPClientService {
  constructor(
    @Inject(AMQP_SERVICE_AUTH) private readonly rabbitClient: ClientProxy
  ) {}

  async checkUserExists(userId: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.rabbitClient.send<ICheckUserExistsResult, ICheckUserExistsInput>(
          { cmd: CHECK_USER_EXISTS_CMD },
          { userId }
        )
      )

      if (!response) {
        throw new InternalServerErrorException('Error checking user existence')
      }

      return response.exists
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new InternalServerErrorException(
          'Error communicating with Auth service'
        )
      }
    }
  }
}

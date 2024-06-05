import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { AMQP_SERVICE_AUTH } from 'src/constants'

@Injectable()
export class AMQPClientService {
  constructor(
    @Inject(AMQP_SERVICE_AUTH) private readonly rabbitClient: ClientProxy
  ) {}

  async checkUserExists(userId: number): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.rabbitClient.send<{ exists: boolean }, { userId: number }>(
          { cmd: 'check_user_exists' },
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

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  AUTH_SYNC_USER_CMD,
  ISyncUserAuthorizedInput,
  ISyncUserResult,
} from 'amqp-contracts'
import { IUserVerificationService, UserRole } from 'nest-helpers'
import { firstValueFrom } from 'rxjs'
import { AMQP_SERVICE_AUTH } from 'src/constants'

@Injectable()
export class AmqpSyncUserClientService implements IUserVerificationService {
  constructor(
    @Inject(AMQP_SERVICE_AUTH) private readonly rabbitClient: ClientProxy
  ) {}

  async syncUser<
    TUser extends { id: string; email: string; role: UserRole },
  >(decodedToken: { uid: string; email: string }): Promise<TUser> {
    try {
      const response = await firstValueFrom(
        this.rabbitClient.send<ISyncUserResult, ISyncUserAuthorizedInput>(
          { cmd: AUTH_SYNC_USER_CMD },
          {
            decodedIdToken: {
              uid: decodedToken.uid,
              email: decodedToken.email,
            },
          }
        )
      )

      if (!response) {
        throw new InternalServerErrorException('Error checking user existence')
      }

      return {
        id: response.id,
        email: response.email,
        role: response.role,
      } as TUser
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

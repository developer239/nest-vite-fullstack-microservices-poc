import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  CHECK_USER_EXISTS_CMD,
  ISyncUserAuthorizedInput,
  ISyncUserResult,
} from 'backend-contracts'
import { IUserVerificationService, UserRole } from 'backend-shared'
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
          { cmd: CHECK_USER_EXISTS_CMD },
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

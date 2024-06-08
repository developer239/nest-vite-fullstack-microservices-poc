import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { FirebaseService } from 'backend-shared'
import { UserRepository } from 'src/modules/users/entities/user.repository'
import { RegisterInput } from 'src/modules/users/inputs/register.input'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  findAll() {
    return this.userRepository.findAll()
  }

  findById(id: string) {
    return this.userRepository.findOneById(id)
  }

  checkUserExists(userId: string) {
    return this.userRepository.checkUserExists(userId)
  }

  validateUserByFirebasePayload(decodedIdToken: {
    uid: string
    email: string
  }) {
    return this.userRepository.validateUserByFirebasePayload(decodedIdToken)
  }

  createUserFromFirebasePayload(email: string, uid: string) {
    return this.userRepository.createUserFromFirebasePayload(email, uid)
  }

  async register(data: RegisterInput): Promise<any> {
    try {
      const userRecord = await this.firebaseService.app.auth().createUser({
        email: data.email,
        password: data.password,
      })

      const newUser = await this.userRepository.createUser(userRecord.uid, data)

      return {
        user: newUser,
        accessToken: await this.firebaseService.app
          .auth()
          .createCustomToken(userRecord.uid),
      }
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new BadRequestException('Email already in use')
      } else if (error.code === 'auth/invalid-email') {
        throw new BadRequestException('Email is badly formatted')
      } else if (error.code === 'auth/configuration-not-found') {
        throw new InternalServerErrorException(
          'Firebase email password authentication is not enabled'
        )
      } else {
        throw new InternalServerErrorException('Failed to register user')
      }
    }
  }
}

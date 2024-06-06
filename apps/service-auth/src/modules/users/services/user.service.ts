import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/modules/users/entities/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from 'src/modules/users/entities/user.repository'
import { UpdateProfileInput } from 'src/modules/users/inputs/update-profile.input'

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

  async updateUserProfile(userId: string, updateData: UpdateProfileInput) {
    if (!(await this.checkUserExists(userId))) {
      throw new NotFoundException(`User with id ${userId} not found`)
    }

    const user = (await this.userRepository.updateProfile(userId, updateData))!

    return user
  }
}

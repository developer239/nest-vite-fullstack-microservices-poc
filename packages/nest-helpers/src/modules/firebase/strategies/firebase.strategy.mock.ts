/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-strategy'
import { UserRole } from '../roles/roles.types'

export interface IUser {
  id: string
  role: UserRole
}

@Injectable()
export class MockFirebaseStrategy extends PassportStrategy(
  class extends Strategy {
    override authenticate() {}
  },
  'firebase-strategy'
) {
  static mockUser?: Partial<IUser> = undefined

  override authenticate() {
    if (MockFirebaseStrategy.mockUser) {
      this.success(MockFirebaseStrategy.mockUser)
    } else {
      this.fail(401)
    }
  }

  static setMockUser(user?: Partial<IUser>) {
    MockFirebaseStrategy.mockUser = user
  }
}

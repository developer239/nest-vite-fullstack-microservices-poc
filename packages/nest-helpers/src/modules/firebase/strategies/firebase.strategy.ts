import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-strategy'
import { IUserVerificationService } from '../constants'
import { FirebaseService } from '../services/firebase.service'

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  Strategy,
  'firebase-strategy'
) {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userVerificationService: IUserVerificationService
  ) {
    super()
  }

  override async authenticate(req: Request) {
    const token = this.extractToken(req)
    if (!token) {
      return this.fail(new UnauthorizedException('No auth token provided'), 401)
    }

    try {
      const firebaseUser = await this.firebaseService.app
        .auth()
        .verifyIdToken(token)

      console.log('firebaseUser', firebaseUser)

      const user = await this.userVerificationService.syncUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
      })

      if (!user) {
        return this.fail(new UnauthorizedException('User not found'), 404)
      }

      return this.success(user)
    } catch (error) {
      console.log('firebaseUser failed', error)
      return this.fail(new UnauthorizedException(error.message), 401)
    }
  }

  private extractToken(req: Request): string | undefined {
    return req.headers.authorization?.split('Bearer ')[1]
  }
}

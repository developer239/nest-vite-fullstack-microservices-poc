import { Inject, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { gpcConfig, GpcConfigType } from '../../../config/gpc.config'

@Injectable()
export class FirebaseService {
  public readonly app: admin.app.App

  constructor(
    @Inject(gpcConfig.KEY)
    private readonly authConfigValues: GpcConfigType
  ) {
    if (this.authConfigValues.gcpGpcSaKey) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(this.authConfigValues.gcpGpcSaKey)
        ),
      })
    }
  }
}

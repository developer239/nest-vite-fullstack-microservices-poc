import { UserRole } from 'nest-helpers'

export const CHECK_USER_EXISTS_CMD = 'check_user_exists'

export interface ICheckUserExistsInput {
  userId: string
}

export interface ICheckUserExistsResult {
  exists: boolean
}

export const AUTH_SYNC_USER_CMD = 'auth_sync_user'

export interface ISyncUserAuthorizedInput {
  decodedIdToken: {
    uid: string
    email: string
  }
}

export interface ISyncUserResult {
  role: UserRole
  id: string
  email: string
}

import { UserRole } from './roles/roles.types'

export interface IUserPayload {
  id: string
  email: string
  role: UserRole
}

// TODO: rename
export abstract class IUserVerificationService {
  abstract syncUser<
    TUser extends { id: string; email: string; role: UserRole },
  >(decodedToken: { uid: string; email: string }): Promise<TUser>
}

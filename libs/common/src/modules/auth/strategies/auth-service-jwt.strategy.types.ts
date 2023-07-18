export const AUTH_SESSION_AUTHENTICATE_PATTERN = 'AUTH_SESSION_AUTHENTICATE'

export interface IAuthSessionAuthenticateResult {
  id: number
  email: string
  firstName: string
  lastName: string
}

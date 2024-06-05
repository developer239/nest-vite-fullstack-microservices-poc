export const CHECK_USER_EXISTS_CMD = 'check_user_exists'

export interface ICheckUserExistsInput {
  userId: number
}

export interface ICheckUserExistsResult {
  exists: boolean
}

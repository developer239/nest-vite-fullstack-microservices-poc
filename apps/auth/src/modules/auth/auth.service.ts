import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { DeepPartial } from 'typeorm'
import { RegisterRequestDTO } from '@app/auth/modules/auth/dto/register.dto'
import { RefreshTokenRepository } from '@app/auth/modules/auth/entities/refresh-token-repository'
import { UserEntity } from '@app/auth/modules/auth/entities/user.entity'
import { UsersRepository } from '@app/auth/modules/auth/entities/users.repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async validateUserByEmailPassword(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ email })

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user?.password)
      if (isValidPassword) {
        return user
      }
    }

    return null
  }

  async validateUserById(userId: number) {
    const user = await this.usersRepository.findOne({ id: userId })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'unauthorized',
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    return user
  }

  async login(user: UserEntity, ipAddress: string) {
    const token = this.jwtService.sign({
      id: user.id,
    })
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '7d',
      }
    )
    await this.refreshTokenRepository.addRefreshToken(
      user.id,
      refreshToken,
      ipAddress
    )

    return {
      accessToken: token,
      refreshToken,
      user,
    }
  }

  async register(dto: RegisterRequestDTO): Promise<void> {
    await this.usersRepository.create({
      ...dto,
    })
  }

  refreshAccessToken(user: UserEntity) {
    const accessToken = this.jwtService.sign({
      id: user.id,
    })

    return { accessToken }
  }

  findUsers(paginationOptions: { offset: number; limit: number }) {
    return this.usersRepository.findManyWithPagination(paginationOptions)
  }

  async updateUser(id: number, payload: DeepPartial<UserEntity>) {
    const result = await this.usersRepository.update(id, payload)
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'userNotFound',
        },
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async deleteUser(id: number) {
    const hasDeleted = await this.usersRepository.softDelete(id)

    if (!hasDeleted) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'userNotFound',
        },
        HttpStatus.NOT_FOUND
      )
    }
  }

  listUsers(ids: number[]) {
    return this.usersRepository.list(ids)
  }
}

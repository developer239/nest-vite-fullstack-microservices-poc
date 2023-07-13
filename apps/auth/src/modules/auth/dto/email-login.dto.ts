import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { UserDTO } from '@app/auth/modules/auth/dto/user.dto'
import { lowerCaseTransformer } from '@shared/common/utils/transformers/lower-case.transformer'

export class EmailLoginRequestDTO {
  @ApiProperty({
    example: 'owl@gmail.com',
    description: "Wise 🦉 owl's email address.",
  })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty({
    example: 'secret-password',
    description: "🔒 top-secret password, don't tell anyone!",
  })
  @IsNotEmpty()
  readonly password: string
}

export class EmailLoginResponseDTO {
  @ApiProperty({
    example: 'access-token-string',
    description: '🎟️ golden ticket to access our services.',
  })
  @IsNotEmpty()
  readonly accessToken: string

  @ApiProperty({
    example: 'refresh-token-string',
    description: '💦 refreshing token to keep you logged in.',
  })
  @IsNotEmpty()
  readonly refreshToken: string

  @ApiProperty({
    description: 'It is you! 👈👀👈',
  })
  readonly user: UserDTO
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class RefreshTokenRequestDTO {
  @ApiProperty({
    example: 'refresh-token-string',
    description: 'The refreshing token you received before.',
  })
  @IsNotEmpty()
  readonly refreshToken: string
}

export class RefreshTokenResponseDTO {
  @ApiProperty({
    example: 'access-token-string',
    description: '🎟️ new golden ticket to continue the journey.',
  })
  @IsNotEmpty()
  readonly accessToken: string
}

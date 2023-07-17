import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class RefreshTokenRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string
}

export class RefreshTokenResponseDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly accessToken: string
}

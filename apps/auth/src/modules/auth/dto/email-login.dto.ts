import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { UserDTO } from '@app/auth/modules/auth/dto/user.dto'
import { lowerCaseTransformer } from '@shared/common/utils/transformers/lower-case.transformer'

export class EmailLoginRequestDTO {
  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}

export class EmailLoginResponseDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly accessToken: string

  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string

  @ApiProperty()
  readonly user: UserDTO
}

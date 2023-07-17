import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly id: number

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty()
  @IsNotEmpty()
  readonly lastName: string
}

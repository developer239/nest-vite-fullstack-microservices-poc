import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UserDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique user ID.',
  })
  @IsNotEmpty()
  readonly id: number

  @ApiProperty({
    example: 'owl@gmail.com',
    description: 'Your wise owl email address.',
  })
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    example: 'Owl',
  })
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({
    example: 'Bert',
  })
  @IsNotEmpty()
  readonly lastName: string
}

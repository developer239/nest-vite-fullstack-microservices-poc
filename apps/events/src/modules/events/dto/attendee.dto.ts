import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class AttendeeDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number

  @ApiProperty()
  @IsNumber()
  readonly userId: number
}

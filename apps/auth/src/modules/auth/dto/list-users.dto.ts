import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class ListUsersDTO {
  @ApiProperty({ type: [Number] })
  @Transform(({ value }) => value.map(Number))
  @IsNumber({}, { each: true })
  readonly ids: number[]
}

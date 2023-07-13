import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty } from 'class-validator'

export class UpsertEventDto {
  @ApiProperty() @IsNotEmpty() title: string

  @ApiProperty() @IsNotEmpty() description: string

  @ApiProperty() @IsNotEmpty() capacity: number

  @ApiProperty() @IsNotEmpty() @Type(() => Date) @IsDate() startsAt: Date
}

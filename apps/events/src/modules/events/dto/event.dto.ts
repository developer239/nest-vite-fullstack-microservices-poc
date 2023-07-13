import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class EventDTO {
  @ApiProperty() @IsNotEmpty() id: number

  @ApiProperty() @IsNotEmpty() title: string

  @ApiProperty() @IsNotEmpty() description: string

  @ApiProperty() @IsNotEmpty() capacity: number

  @ApiProperty() @IsNotEmpty() startsAt: Date

  @ApiProperty() @IsNotEmpty() ownerUserId: number

  @ApiProperty({ isArray: true }) @IsNotEmpty() attendeeUserIds: number
}

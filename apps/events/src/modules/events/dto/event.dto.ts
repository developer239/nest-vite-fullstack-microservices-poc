import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

// TODO: update DTO and include owner and attendees (first name, last name) information
export class EventDTO {
  @ApiProperty() @IsNotEmpty() id: number

  @ApiProperty() @IsNotEmpty() title: string

  @ApiProperty() @IsNotEmpty() description: string

  @ApiProperty() @IsNotEmpty() capacity: number

  @ApiProperty() @IsNotEmpty() startsAt: Date

  @ApiProperty() @IsNotEmpty() ownerUserId: number

  @ApiProperty({ isArray: true }) @IsNotEmpty() attendeeUserIds: number
}

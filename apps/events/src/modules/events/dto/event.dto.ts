import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { AttendEventDto } from '@app/events/modules/events/dto/attend-event.dto'
import { AttendeeDto } from '@app/events/modules/events/dto/attendee.dto'

export class EventDTO {
  @ApiProperty() @IsNotEmpty() id: number

  @ApiProperty() @IsNotEmpty() title: string

  @ApiProperty() @IsNotEmpty() description: string

  @ApiProperty() @IsNotEmpty() capacity: number

  @ApiProperty() @IsNotEmpty() cost: number

  @ApiProperty() @IsNotEmpty() startsAt: Date

  @ApiProperty() @IsNotEmpty() ownerUserId: number

  @ApiProperty({ isArray: true })
  @Type(() => AttendEventDto)
  attendees: AttendeeDto
}

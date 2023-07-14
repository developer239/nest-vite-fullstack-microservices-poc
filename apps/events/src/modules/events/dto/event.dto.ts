import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { UserDTO } from '@app/events/modules/events/dto/user.dto'

export class EventDTO {
  @ApiProperty() @IsNotEmpty() id: number

  @ApiProperty() @IsNotEmpty() title: string

  @ApiProperty() @IsNotEmpty() description: string

  @ApiProperty() @IsNotEmpty() capacity: number

  @ApiProperty() @IsNotEmpty() startsAt: Date

  @ApiProperty() @IsNotEmpty() owner: UserDTO

  @ApiProperty({ isArray: true }) @IsNotEmpty() attendees: UserDTO
}

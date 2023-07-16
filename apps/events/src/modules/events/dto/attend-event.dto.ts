import { IsNotEmpty, IsString } from 'class-validator'

export class AttendEventDto {
  @IsNotEmpty()
  @IsString()
  stripeToken: string
}

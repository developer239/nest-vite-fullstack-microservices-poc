import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AttendEventDto {
  @ApiProperty({ description: 'Stripe payment method id.' })
  @IsNotEmpty()
  @IsString()
  stripeToken: string
}

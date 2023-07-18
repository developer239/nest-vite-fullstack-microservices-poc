import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class AttendEventDto {
  @ApiProperty({ description: 'Stripe payment method id.' })
  @IsOptional()
  @IsString()
  stripeToken: string
}

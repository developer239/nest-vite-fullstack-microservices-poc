import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RefundChargeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsString()
  entityType: string

  @IsNotEmpty()
  @IsNumber()
  entityId: number
}

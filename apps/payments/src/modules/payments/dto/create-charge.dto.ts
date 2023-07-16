import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateChargeDto {
  @IsNumber()
  entityId: number

  @IsString()
  @IsNotEmpty()
  entityType: string

  @IsNumber()
  userId: number

  @IsNumber()
  amount: number

  @IsString()
  @IsNotEmpty()
  stripeToken: string
}

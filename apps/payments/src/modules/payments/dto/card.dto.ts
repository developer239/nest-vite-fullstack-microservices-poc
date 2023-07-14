import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string

  @IsNumber()
  expMonth: number

  @IsNumber()
  expYear: number

  @IsCreditCard()
  number: string
}

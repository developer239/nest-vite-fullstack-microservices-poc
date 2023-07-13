import { PartialType } from '@nestjs/swagger'
import { UserDTO } from '@app/auth/modules/auth/dto/user.dto'

export class MeDTO extends PartialType(UserDTO) {}

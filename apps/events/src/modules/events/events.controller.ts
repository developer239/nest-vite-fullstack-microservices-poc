import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { EventDTO } from '@app/events/modules/events/dto/event.dto'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { EventsService } from '@app/events/modules/events/events.service'
import { GetUserPayload } from '@shared/common/modules/auth/decorators/get-user-payload.decorator'
import { AuthServiceJwtStrategy } from '@shared/common/modules/auth/strategies/auth-service-jwt.strategy'
import { IAuthServiceJwtStrategyPayload } from '@shared/common/modules/auth/strategies/auth-service-jwt.strategy.types'

@ApiTags('Events')
@Controller({
  path: 'events',
  version: '1',
})
export class EventsController {
  constructor(public service: EventsService) {}

  @Get()
  @ApiOkResponse({
    type: EventDTO,
    isArray: true,
  })
  public list() {
    return this.service.listEvents()
  }

  @Get(':id')
  @ApiOkResponse({
    type: EventDTO,
  })
  public detail(@Param('id', ParseIntPipe) id: number) {
    return this.service.detail(id)
  }

  @ApiBearerAuth()
  @UseGuards(AuthServiceJwtStrategy)
  @Post()
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: EventDTO,
  })
  public create(
    @GetUserPayload() user: IAuthServiceJwtStrategyPayload,
    @Body() data: UpsertEventDto
  ) {
    return this.service.createEvent(user.id, data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthServiceJwtStrategy)
  @Patch(':id')
  @ApiOkResponse({
    type: EventDTO,
  })
  public update(
    @GetUserPayload() user: IAuthServiceJwtStrategyPayload,
    @Param('id', ParseIntPipe) eventId: number,
    @Body() data: UpsertEventDto
  ) {
    return this.service.updateEvent(user.id, data, eventId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthServiceJwtStrategy)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public delete(
    @GetUserPayload() user: IAuthServiceJwtStrategyPayload,
    @Param('id', ParseIntPipe) eventId: number
  ) {
    return this.service.deleteEvent(user.id, eventId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthServiceJwtStrategy)
  @Post(':id/attendees/me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: EventDTO,
  })
  public attend(
    @GetUserPayload() user: IAuthServiceJwtStrategyPayload,
    @Param('id', ParseIntPipe) eventId: number
  ) {
    return this.service.attendEvent(user.id, eventId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthServiceJwtStrategy)
  @Delete(':id/attendees/me')
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: EventDTO,
  })
  public leave(
    @GetUserPayload() user: IAuthServiceJwtStrategyPayload,
    @Param('id', ParseIntPipe) eventId: number
  ) {
    return this.service.leaveEvent(user.id, eventId)
  }
}

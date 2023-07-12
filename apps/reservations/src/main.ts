import { NestFactory } from '@nestjs/core'
import { ReservationsModule } from '@app/reservations/reservations.module'

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule)
  await app.listen(3000)
}

void bootstrap()

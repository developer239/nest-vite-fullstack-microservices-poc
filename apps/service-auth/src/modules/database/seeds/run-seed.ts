import { runSeed, SeedModule } from 'nest-helpers'
import { UserSeedModule } from 'src/modules/database/seeds/user/user-seed.module'
import { UserSeedService } from 'src/modules/database/seeds/user/user-seed.service'

void runSeed(
  SeedModule.forRoot(__dirname, {
    imports: [UserSeedModule],
  }),
  [UserSeedService]
)

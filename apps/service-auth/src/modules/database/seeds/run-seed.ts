import { runSeed, SeedModule } from 'backend-shared'
import { UserSeedService } from 'src/modules/database/seeds/user/user-seed.service'
import { UserSeedModule } from 'src/modules/database/seeds/user/user-seed.module'

void runSeed(
  SeedModule.forRoot(__dirname, {
    imports: [UserSeedModule],
  }),
  [UserSeedService]
)

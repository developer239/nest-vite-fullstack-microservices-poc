import { Module } from '@nestjs/common'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { TestingEntityService } from '@shared/common/modules/testing/testing-entity.service'

@Module({
  imports: [],
  providers: [TestingEntityService, TestingDatabaseService],
  exports: [TestingEntityService, TestingDatabaseService],
})
export class TestingModule {}

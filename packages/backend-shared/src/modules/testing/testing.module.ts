import { Module } from '@nestjs/common'
import { TestingDatabaseService } from './testing-database.service'
import { TestingEntityService } from './testing-entity.service'

@Module({
  imports: [],
  providers: [TestingEntityService, TestingDatabaseService],
  exports: [TestingEntityService, TestingDatabaseService],
})
export class TestingModule {}

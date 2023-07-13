/* eslint-disable security/detect-object-injection */
import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { EntityTarget } from 'typeorm'
import { DataSource } from 'typeorm/data-source/DataSource'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

type IConstructorOf<TEntity> = new () => TEntity

@Injectable()
export class TestingEntityService {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  public async saveFixture<TEntity extends EntityHelper, TData>(
    model: IConstructorOf<TEntity>,
    data?: TData
  ): Promise<TEntity> {
    const instance = new model()

    if (data) {
      const keys = Object.keys(data)
      for (const key of keys) {
        // @ts-ignore
        instance[key] = data[key]
      }
    }

    const result = await instance.save()

    // select entity from DB because of class-transformer
    const entity = await this.dataSource.manager.findOne<TEntity>(model, {
      where: {
        // @ts-ignore
        id: result.id,
      },
    })!

    return entity!
  }

  public findOneById<TEntity extends EntityTarget<{ id: number }>>(
    entity: TEntity,
    id: number
  ) {
    return this.dataSource.manager.findOne(entity, {
      where: {
        id,
      },
    })
  }

  public list<TEntity extends EntityHelper>(
    entityClass: string
  ): Promise<TEntity[]> {
    return this.dataSource.manager.find<TEntity>(entityClass)
  }
}

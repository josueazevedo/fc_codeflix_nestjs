import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/core/category/infra/db/sequelize/category.model';

const models = [CategoryModel];

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}

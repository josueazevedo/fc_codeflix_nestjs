import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryModel } from 'src/core/category/infra/db/sequelize/category.model';
import { CATEGORY_PROVIDERS } from './categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}

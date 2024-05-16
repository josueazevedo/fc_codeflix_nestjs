import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../shared/infra/testing/setup-db';
import { ICategoryRepository } from '../../../domain/category.repository';
import { CategorySequelizeRepository } from '../../../infra/db/sequelize/category-sequelize.repository';
import { CategoryModel } from '../../../infra/db/sequelize/category.model';
import { CreateCategoryUseCase } from '../../create-category.usecase';

describe('Create Category UseCase Integration test', () => {
  let useCase: CreateCategoryUseCase;
  let repository: ICategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    const input = {
      name: 'Movie',
    };
    const output = await useCase.execute(input);
    const entity = await repository.findById(Uuid.from(output.id));
    expect(output).toStrictEqual({
      id: entity.entity_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  });

  it('should create a category with full data', async () => {
    const input = {
      name: 'Movie',
      description: 'some description',
      is_active: false,
    };
    const output = await useCase.execute(input);
    const entity = await repository.findById(Uuid.from(output.id));
    expect(output).toStrictEqual({
      id: entity.entity_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  });
});

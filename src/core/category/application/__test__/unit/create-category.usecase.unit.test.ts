import { ICategoryRepository } from '../../../domain/category.repository';
import { CategoryInMemoryRepository } from '../../../infra/db/in-memory/category-in-memory.repository';
import { CreateCategoryUseCase } from '../../create-category.usecase';

describe('Create Category Usecase unit test', () => {
  let useCase: CreateCategoryUseCase;
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const input = {
      name: 'Movie',
    };

    const output = await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toBeTruthy();
    expect(output.id).toBeTruthy();
    expect(output.name).toBe(input.name);
  });

  it('should create a category with full data', async () => {
    const input = {
      name: 'Movie',
      description: 'some description',
      is_active: false,
    };

    await useCase.execute(input);
    const output = await useCase.execute(input);

    expect(output).toBeTruthy();
    expect(output.id).toBeTruthy();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.is_active).toBe(input.is_active);
  });
});

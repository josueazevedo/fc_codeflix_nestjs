import { IUseCase } from '../../shared/application/use-case.interface';
import { NotFoundError } from '../../shared/domain/erros/not-found.error';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { Category } from '../domain/category.aggregate';
import { ICategoryRepository } from '../domain/category.repository';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.findById(
      Uuid.from(input.id),
    );

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    this.update(category, input);

    await this.categoryRepository.update(category);

    return {
      id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    };
  }

  private update(category: Category, input: UpdateCategoryInput) {
    input.name && category.changeName(input.name);

    if ('description' in input) {
      category.changeDescription(input.description);
    }

    input.is_active === true && category.activate();
    input.is_active === false && category.deactivate();
  }
}

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export type UpdateCategoryOutput = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
};

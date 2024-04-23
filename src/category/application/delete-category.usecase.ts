import { IUseCase } from "../../shared/application/use-case.interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ICategoryRepository } from "../domain/category.repository";

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<void> {
    await this.categoryRepository.delete(Uuid.from(input.id));
  }
}

export type DeleteCategoryInput = {
  id: string;
};

export type DeleteCategoryOutput = void;

import { NotFoundError } from "../../../../shared/domain/erros/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { InvalidUuidError } from "../../../../shared/exceptions/invalid-uuid.exception";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../../delete-category.usecase";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const uuid = Uuid.create();

    expect(async () => await useCase.execute({ id: uuid.id })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should delete a category", async () => {
    const items = [Category.create({ name: "test 1" })];
    await repository.bulkInsert(items);
    await useCase.execute({
      id: items[0].category_id.id,
    });
    expect(await repository.findAll()).toHaveLength(0);
  });
});

import { NotFoundError } from "../../../../shared/domain/erros/not-found.error";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../../update-category.usecase";

describe("Update Category Usecase Unit Test", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should thows error if category not found", async () => {
    const spyUpdate = jest.spyOn(repository, "update");

    const input = {
      id: "afedde72-6d85-4e33-b12d-611d8c7c7fab",
      name: "Category Test",
      description: "Category Description Test",
      is_active: true,
    };

    expect(async () => {
      await useCase.execute(input);
    }).rejects.toThrow(NotFoundError);

    expect(spyUpdate).toHaveBeenCalledTimes(0);
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");

    const entity = Category.fake().aCategory().build();

    await repository.insert(entity);

    const expectName = "New Category Name";
    const expectDescription = "New Category Description";
    const expectIsActive = !entity.is_active;

    const input = {
      id: entity.category_id.id,
      name: expectName,
      description: expectDescription,
      is_active: expectIsActive,
    };

    const output = await useCase.execute(input);

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: expectName,
      description: expectDescription,
      is_active: expectIsActive,
      created_at: entity.created_at,
    });
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = Category.create({ name: "Movie" });
    (repository as any).items = [entity];

    let output = await useCase.execute({
      id: entity.category_id.id,
      name: "test",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        description?: null | string;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description: null | string;
        is_active: boolean;
        created_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.category_id.id,
          name: "test",
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.category_id.id,
          name: "test",
          is_active: false,
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.category_id.id,
          name: "test",
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.category_id.id,
          name: "test",
          is_active: true,
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: false,
        },
        expected: {
          id: entity.category_id.id,
          name: "test",
          description: "some description",
          is_active: false,
          created_at: entity.created_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        ...("name" in i.input && { name: i.input.name }),
        ...("description" in i.input && { description: i.input.description }),
        ...("is_active" in i.input && { is_active: i.input.is_active }),
      });
      expect(output).toStrictEqual({
        id: entity.category_id.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at,
      });
    }
  });
});

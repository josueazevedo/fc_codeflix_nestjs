import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { ListCategoriesUseCase } from "../../list-category.usecase";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  it("should return empty items with default search params", async () => {
    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [],
      total: 0,
      current_page: 1,
      per_page: 15,
      last_page: 0,
    });
  });

  it("should return output sorted by created_at when input param is empty", async () => {
    const items = [
      Category.create({ name: "test 1" }),
      Category.create({
        name: "test 2",
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    await repository.bulkInsert(items);

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => ({
        id: i.category_id.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at,
      })),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should return output using pagination, sort and filter", async () => {
    const items = [
      Category.create({ name: "a" }),
      Category.create({
        name: "AAA",
      }),
      Category.create({
        name: "AaA",
      }),
      Category.create({
        name: "b",
      }),
      Category.create({
        name: "c",
      }),
    ];

    repository.bulkInsert(items);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[1], items[2]].map((i) => ({
        id: i.category_id.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at,
      })),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0]].map((i) => ({
        id: i.category_id.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at,
      })),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0], items[2]].map((i) => ({
        id: i.category_id.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at,
      })),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});

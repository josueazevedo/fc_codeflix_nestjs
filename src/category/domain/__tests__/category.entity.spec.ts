import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  it("should create a category", () => {
    const expected = {
      name: "Movie",
      description: "some description",
      is_active: true,
      createdAt: new Date(),
    };
    const category = Category.create({
      name: expected.name,
      description: expected.description,
      is_active: expected.is_active,
    });
    expect(category.name).toBe(expected.name);
    expect(category.description).toBe(expected.description);
    expect(category.is_active).toBe(expected.is_active);
    expect(category.created_at).toStrictEqual(expected.createdAt);
    expect(category.entity_id).toBeDefined();
    expect(category.entity_id).toBeInstanceOf(Uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should create a existing category", () => {
    const expected = {
      category_id: Uuid.from("7cdbd1c4-a0c5-40fd-a284-07a75c85bcff"),
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
    };
    const category = Category.from(expected);
    expect(category.name).toBe(expected.name);
    expect(category.description).toBe(expected.description);
    expect(category.is_active).toBe(expected.is_active);
    expect(category.created_at).toStrictEqual(expected.created_at);
    expect(category.entity_id).toBe(expected.category_id);
    expect(category.entity_id).toBeInstanceOf(Uuid);
    expect(category.category_id.id).toBe(expected.category_id.id);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should activate category", () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should deactivate category", () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should change name", () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: true,
    });
    category.changeName("Movie 2");
    expect(category.name).toBe("Movie 2");
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should change description", () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: true,
    });
    category.changeDescription("some description 2");
    expect(category.description).toBe("some description 2");
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should return category in JSON", () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: true,
    });
    expect(category.toJSON()).toStrictEqual({
      category_id: category.entity_id.id,
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: category.created_at,
    });
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should create category with default values", () => {
    const category = Category.create({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();
    expect(category.description).toBeNull();
    expect(category.created_at).toBeDefined();
    expect(category.entity_id).toBeDefined();
    expect(category.entity_id).toBeInstanceOf(Uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      Category.create({
        name: "",
      });
    }).toThrow("Validation Error");
    expect(validateSpy).toHaveBeenCalled();
  });
});

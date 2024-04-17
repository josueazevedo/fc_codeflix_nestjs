import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/erros/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

class StubEntity extends Entity {
  entity_id: Uuid;

  constructor(id?: Uuid) {
    super();
    this.entity_id = id || Uuid.create();
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
describe("In-Memory Repository Unit Test", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    expect(repository.items).toStrictEqual([entity]);
  });

  it("should find an entity by id", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    const entityFound = await repository.findById(entity.entity_id);
    expect(entityFound).toStrictEqual(entity);
  });

  it("should find all entities", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    const entitiesFound = await repository.findAll();
    expect(entitiesFound).toStrictEqual([entity]);
  });

  it("should update an entity", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    const entityUpdated = new StubEntity(entity.entity_id);
    await repository.update(entityUpdated);
    expect(repository.items).toStrictEqual([entityUpdated]);
  });

  it("should delete an entity", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    await repository.delete(entity.entity_id);
    expect(repository.items).toStrictEqual([]);
  });

  it("should return null if entity not found", async () => {
    const entity = new StubEntity();
    await repository.insert(entity);
    const id = Uuid.create();
    await expect(repository.findById(id)).resolves.toBeNull();
  });

  it("should bulk insert entitys", () => {
    const entities = [new StubEntity(), new StubEntity()];
    repository.bulkInsert(entities);
    expect(repository.items).toStrictEqual(entities);
  });

  it("should throw an error when update entity not found", () => {
    const entity = new StubEntity();
    expect(repository.update(entity)).rejects.toThrow(NotFoundError);
  });

  it("should throw an error when delete entity not found", () => {
    const entity = new StubEntity();
    expect(repository.delete(entity.entity_id)).rejects.toThrow(NotFoundError);
  });
});

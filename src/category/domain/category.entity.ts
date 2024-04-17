import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validator.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category-validator";

export type CategoryConstructorProps = {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  public constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id;
    this.name = props.name;
    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  public static create(props: CategoryCreateCommand): Category {
    const entity = new Category({
      category_id: Uuid.create(),
      name: props.name,
      description: props.description ?? null,
      is_active: props.is_active ?? true,
      created_at: new Date(),
    });
    Category.validate(entity);
    return entity;
  }

  public static from(props: CategoryConstructorProps): Category {
    const entity = new Category(props);
    Category.validate(entity);
    return entity;
  }

  get entity_id(): Uuid {
    return this.category_id;
  }

  public changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  public changeDescription(description: string | null): void {
    this.description = description;
    Category.validate(this);
  }

  public activate(): void {
    this.is_active = true;
  }

  public deactivate(): void {
    this.is_active = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  public toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}

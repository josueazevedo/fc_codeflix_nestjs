import { InvalidUuidError } from "../../exceptions/invalid-uuid.exception";
import { ValueObject } from "../value-object";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class Uuid extends ValueObject {
  readonly id: string;

  private constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validate();
  }

  static create(): Uuid {
    return new Uuid();
  }

  static from(id: string): Uuid {
    return new Uuid(id);
  }

  private validate() {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}

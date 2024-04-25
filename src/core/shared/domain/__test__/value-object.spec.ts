import { ValueObject } from "../value-object";

describe("Value Object", () => {
  it("should be equals", () => {
    const vo1 = new StringValueObject("value 1");
    const vo2 = new StringValueObject("value 1");

    expect(vo1.equals(vo2)).toBeTruthy();
    expect(vo1.equals(vo1)).toBeTruthy();
    expect(vo2.equals(vo1)).toBeTruthy();
    expect(vo1.equals(vo2)).toBeTruthy();
    expect(vo2.equals(vo2)).toBeTruthy();
  });

  it("should not be equals", () => {
    const vo1 = new StringValueObject("value 1");
    const vo2 = new StringValueObject("value 2");

    expect(vo1.equals(vo2)).toBeFalsy();
    expect(vo1.equals(vo1)).toBeTruthy();
    expect(vo2.equals(vo1)).toBeFalsy();
    expect(vo1.equals(vo2)).toBeFalsy();
    expect(vo2.equals(vo2)).toBeTruthy();
    expect(vo1.equals(null)).toBeFalsy();
  });

  it("should not be equals if type is different", () => {
    const vo1 = new StringValueObject("any");
    const vo2 = new NumberValueObject(2);

    expect(vo1.equals(vo2 as any)).toBeFalsy();
  });
});

class StringValueObject extends ValueObject {
  constructor(public value: string) {
    super();
  }
}

class NumberValueObject extends ValueObject {
  constructor(public value: number) {
    super();
  }
}

import { InvalidUuidError } from "../../../exceptions/invalid-uuid.exception";
import { Uuid } from "../uuid.vo";

describe("Uuid unit tests", () => {
  it("should generate a uuid", () => {
    const uuid = Uuid.create();
    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined();
  });

  it("should generate a uuid with a value", () => {
    const expectedUuid = "7cdbd1c4-a0c5-40fd-a284-07a75c85bcff";
    const uuid = Uuid.from(expectedUuid);
    expect(uuid).toBeDefined();
    expect(uuid.id).toBe(expectedUuid);
  });

  it("should throw an error if the uuid is invalid", () => {
    expect(() => Uuid.from("invalid-uuid")).toThrow(new InvalidUuidError());
  });

  it("should call validate method", () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
    const uuid = Uuid.create();
    expect(validateSpy).toHaveBeenCalled();
    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined();
  });
});

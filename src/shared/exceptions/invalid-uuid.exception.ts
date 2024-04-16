export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valida UUID");
    this.name = "InvalidUuidError";
  }
}

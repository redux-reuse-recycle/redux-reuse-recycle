export default class TypeCheckError extends Error {
  public static readonly NAME = "TypeCheckError";

  constructor(message: string) {
    super(message);
    this.name = TypeCheckError.NAME;
  }
}

export default class ParseError extends Error {
  public static readonly NAME: string = "ParseError";

  constructor(message: string) {
    super(message);
    this.name = ParseError.NAME;
  }
}

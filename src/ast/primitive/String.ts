import Primitive from "./Primitive";

export default class String extends Primitive {
  constructor(value: string = "") {
    super(value);
  }
}

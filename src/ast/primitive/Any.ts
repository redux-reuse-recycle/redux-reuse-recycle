import Primitive from "./Primitive";

export default class Any extends Primitive {
  constructor(value: any = "undefined") {
    super(value);
  }
}

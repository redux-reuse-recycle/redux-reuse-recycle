import Type from "./Type";
import AnyType from "./AnyType";

export default class ArrayType extends Type {
  public readonly innerType: Type;

  constructor(innerType: Type = new AnyType()) {
    super();
    this.innerType = innerType;
  }
}

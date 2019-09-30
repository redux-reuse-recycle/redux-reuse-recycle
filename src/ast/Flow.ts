import Value from "./Value";
import Declaration from "./Declaration";
import { Modifier } from "typescript";

export default class Flow extends Value {
  public readonly declarations: Declaration[];
  public readonly modifiers: Modifier[];

  constructor(declarations: Declaration[], modifiers: Modifier[]) {
    super();
    this.declarations = declarations;
    this.modifiers = modifiers;
  }
}

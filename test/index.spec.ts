import 'mocha';
import { expect } from "chai";

import { main } from "../src/index";

describe("Program Initialization",  () => {
  it("Does not crash when main is called", () => {
    expect(main()).to.equal(0);
  })
})

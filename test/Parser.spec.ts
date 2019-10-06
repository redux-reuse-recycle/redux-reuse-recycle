import 'mocha';
import { expect } from "chai";
import TestFactory from './utils/TestFactory';

describe("Parser", () => {

  it("Should successfully parse all valid .flo files", async () => {
    return TestFactory.readPrograms("/Users/gregory_gzik/src/flowscript/test/resources/valid")
      .then((programs) => programs.map((program) => console.log(program.fileName)));
  });

  it("Should reject the parsing of all invalid .flo files", () => {

  });
})

import 'mocha';
import * as FileSystem from "fs";

import Logger from "../src/utils/Logger";
import TestFactory from "./utils/TestFactory";
import ParserVisitor from '../src/visitor/ParserVisitor';
import TypeCheckVisitor from '../src/visitor/TypeCheckVisitor';

const file = process.argv.pop() || "";

// Defined here so that test case can be dynamically skipped.
const testCase = {
  title: "FloScript Pipeline on a Single File",
  body: () => {
    it("Should Pass Parsing", async () => {
      const program = await TestFactory.readProgram(file)
      new ParserVisitor(program).parse();
    });

    it("Should Pass TypeChecking", async () => {
      const program = await TestFactory.readProgram(file);
      const parser = new ParserVisitor(program);
      const ast = parser.parse();
      new TypeCheckVisitor().typecheck(ast);
    });

    // TODO: Test for CodeGen once Implemented.
    it("Should Pass CodeGen");
  }
};

if (FileSystem.existsSync(file)) {
  describe(testCase.title, testCase.body);
}
else {
  Logger.Log(`Skipping File.spec.ts because file ${file} does not exist!`)
  describe.skip(testCase.title, testCase.body);
}

import 'mocha';
import { VALID_PROGRAMS, INVALID_TYPECHECK_PROGRAMS } from "./utils/Constants";
import TestFactory from './utils/TestFactory';
import ParserVisitor from '../src/visitor/ParserVisitor';
import TypeCheckError from '../src/errors/TypeCheckError';
import TypeCheckVisitor from "../src/visitor/TypeCheckVisitor";
import { fail } from 'assert';
import Tokenizer from '../src/Tokenizer';

describe("TypeChecker", function () {
  const typecheck = (program: Tokenizer) => {
    const parser = new ParserVisitor(program);
    const ast = parser.parse();
    new TypeCheckVisitor(parser.getSymbolTable()).typecheck(ast);
  }

  before(async function () {
    const [validPrograms, invalidPrograms] = await Promise.all([
      TestFactory.readPrograms(VALID_PROGRAMS),
      TestFactory.readPrograms(INVALID_TYPECHECK_PROGRAMS)
    ]);


    describe("Typechecking Valid FloScript Files", () => {
      validPrograms.forEach((program) => {
        it(`${program.fileName}`, () => {
          typecheck(program.program);
        });
      })
    });

    describe("Typechecking Invalid FloScript Files", () => {
      invalidPrograms.forEach((program) => {
        it(`${program.fileName}`, () => {
          try {
            typecheck(program.program);
            fail("The program successfully typechecked! WHY!?!?!")
          }
          catch (error) {
            if (!(error instanceof TypeCheckError)) {
              throw error;
            }
          }
        })
      });
    });
  });

  it("It successfully typechecks a FloScript File", async () => {});
});

import 'mocha';
import { VALID_PROGRAMS, INVALID_PARSE_PROGRAMS } from "./utils/Constants";

import TestFactory from './utils/TestFactory';
import ParserVisitor from '../src/visitor/ParserVisitor';
import { fail } from 'assert';
import ParseError from '../src/errors/ParseError';

describe("Parse", function () {
  before(async function () {
    const [validPrograms, invalidPrograms] = await Promise.all([
      TestFactory.readPrograms(VALID_PROGRAMS),
      TestFactory.readPrograms(INVALID_PARSE_PROGRAMS)
    ]);


    describe("Parsing Valid FloScript Files", () => {
      validPrograms.forEach((program) => {
        it(`${program.context}`, () => {
          new ParserVisitor(program).parse();
        });
      })
    });

    describe("Parsing Invalid FloScript Files", () => {
      invalidPrograms.forEach((program) => {
        it(`${program.context}`, () => {
          try {
            new ParserVisitor(program).parse();
            fail("The program successfully parsed! WHY!?!?!")
          }
          catch (error) {
            if (!(error instanceof ParseError)) {
              throw error;
            }
          }
        })
      });
    });
  });

  it("It successfully parses a FloScript File", async () => {});
});

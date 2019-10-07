import { join } from "path";

const VALID_PROGRAMS = join(__dirname, "../resources/valid");
const INVALID_PARSE_PROGRAMS = join(__dirname, "../resources/invalid/parse");
const INVALID_TYPECHECK_PROGRAMS = join(__dirname, "../resources/invalid/typecheck");

export { VALID_PROGRAMS, INVALID_PARSE_PROGRAMS, INVALID_TYPECHECK_PROGRAMS };

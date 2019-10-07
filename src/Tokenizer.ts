import ParseError from "./errors/ParseError";

export default class Tokenizer {

    private readonly tokens: string[];
    private currentTokenIdx: number;
    private line: number;
    private column: number;

    constructor(program: string) {
        this.currentTokenIdx = 0;
        this.line = 1;
        this.column = 0;
        this.tokens = program.split('\n').join(' NEW_LINE ').match(/\S+/g) || [];
    }

    public top(): string | null {
        if (this.currentTokenIdx < this.tokens.length) {
            // Skip empty lines
            while ('NEW_LINE' === this.tokens[this.currentTokenIdx]) {
                this.currentTokenIdx++;
                this.line++;
                this.column = 0;
            }

            return this.tokens[this.currentTokenIdx];
        }

        return null;
    }

    public pop(): string {
        if (this.top() != null) {
            let token = this.tokens[this.currentTokenIdx];
            this.currentTokenIdx++;
            this.column++;
            return token;
        }
        throw new ParseError("Unexpected end of file.");
    }

    public popAndCheck(val: string): void {
        let token = this.pop();
        if (token != val){
            throw new ParseError("Unexpected token " + token);
        }
    }

    public replaceInToken(search: string | RegExp, replace: string): void {
        this.tokens[this.currentTokenIdx] = this.top()!.replace(search, replace)
    }

    public hasNext(): boolean {
        return this.top() !== null;
    }

    public getLine(): number {
        return this.line;
    }

    public getColumn(): number {
        return this.column;
    }
}
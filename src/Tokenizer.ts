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

    public pop(): string | null {
        if (this.top() != null) {
            let token = this.tokens[this.currentTokenIdx];
            this.currentTokenIdx++;
            this.column++;
            return token;
        }
        return null;
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
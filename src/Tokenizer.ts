import ParseError from "./errors/ParseError";
import Logger from "./utils/Logger";

export default class Tokenizer {

    private readonly tokens: string[];
    private currentTokenIdx: number;
    private line: number;
    private column: number;

    constructor(program: string) {
        this.currentTokenIdx = 0;
        this.line = 1;
        this.column = 0;
        this.tokens = program.replace(/;/g, ' ; ').replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .split('\n').join(' NEW_LINE ').match(/\S+/g) || [];
    }

    public top(): string | null {
        if (this.currentTokenIdx < this.tokens.length) {
            // Skip comments
            if (this.tokens[this.currentTokenIdx].startsWith('//')){
                while('NEW_LINE' !== this.tokens[this.currentTokenIdx]){
                    this.currentTokenIdx++;

                    if(this.currentTokenIdx >= this.tokens.length){
                        return null;
                    }
                }
            }

            // Skip empty lines
            while ('NEW_LINE' === this.tokens[this.currentTokenIdx]) {
                this.currentTokenIdx++;
                this.line++;
                this.column = 0;

                if(this.currentTokenIdx >= this.tokens.length){
                    return null;
                }
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
            Logger.Log("Consume "+token);
            return token;
        }
        throw new ParseError("Unexpected end of file.");
    }

    public popAndCheck(val: string): void {
        let token = this.pop();
        if (token != val){
            throw new ParseError("Unexpected token " + token + " in line " + this.line);
        }
    }

    public replaceInToken(search: string | RegExp, replace: string): boolean {
        let subs = this.top()!.search(search);
        this.tokens[this.currentTokenIdx] = this.top()!.replace(search, replace);
        return subs > -1;
    }

    public lineContains(search: string): boolean{
        let tempCounter = this.currentTokenIdx;
        while('NEW_LINE' !== this.tokens[tempCounter]){
            if(this.tokens[tempCounter] === search){
                return true;
            }
            tempCounter++;

            if(tempCounter >= this.tokens.length){
                return false;
            }
        }
        return false;
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
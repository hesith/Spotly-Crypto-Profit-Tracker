export default class SymbolDescription{
    id:string | undefined;
    symbol:string | undefined;
    name:string | undefined;

    constructor(id:string, symbol:string, name:string){
        this.id = id;
        this.symbol = symbol;
        this.name = name;
    }
}
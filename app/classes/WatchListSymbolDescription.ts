export default class WatchListSymbolDescription{
    id:string | undefined;
    symbol:string | undefined;

    constructor(id:string, symbol:string){
        this.id = id;
        this.symbol = symbol;
    }
}
export default class WatchListSymbolDescription{
    id:string | undefined;
    symbol:string | undefined;

    buyingPrice: string | undefined;
    investment: string | undefined;
    holdingQty: string | undefined;

    constructor(id:string | undefined, symbol:string | undefined, buyingPrice = '0', investment = '0', holdingQty = '0'){
        this.id = id;
        this.symbol = symbol;

        this.buyingPrice = buyingPrice.toString();
        this.investment = investment.toString();
        this.holdingQty = holdingQty.toString();

    }
}
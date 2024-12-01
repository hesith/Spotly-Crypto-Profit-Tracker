export default interface ICoinDataRetriever{
    baseEndpoint:string;
    resourceTicker:string
    resourceAllTickers:string;


    getDataBySymbol(symbol:string):object;
    getAllSymbolData(filter:string):any;
    getAllSymbolNameData():any;

}
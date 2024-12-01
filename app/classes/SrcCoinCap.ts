import ICoinDataRetriever from '../interfaces/ICoinDataRetriever';
import httpService from '../services/httpService';
import SymbolDescription from './SymbolDescription';


export default class SrcCoinCap implements ICoinDataRetriever{
    baseEndpoint: string;
    resourceTicker: string;
    resourceAllTickers: string;

    constructor(){
        this.baseEndpoint = "https://api.coincap.io/v2/";
        this.resourceTicker = "";
        this.resourceAllTickers = "assets/";
    }

    async getDataBySymbol(symbol: string) {
        return new Object;
    }

    async getAllSymbolData(filter:string) {
        var url = this.baseEndpoint+this.resourceAllTickers+filter;
        return (await httpService.sendGetRequest(url));
    }

    async getAllSymbolNameData(){
        var result1 = await this.getAllSymbolData("?limit=2000");
        var result2 = await this.getAllSymbolData("?limit=2000&offset=2000");

        var symbolNamesArr:SymbolDescription[] = [];
        
        var result = await result1.data.concat(await result2.data);

        (result).forEach((element: any) => {
            symbolNamesArr.push(new SymbolDescription(
                element.id,
                element.symbol,
                element.name
            ));
        });

        console.log(result.length);

        return symbolNamesArr;
    }


}
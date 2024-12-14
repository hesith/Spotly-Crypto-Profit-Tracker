import ICoinDataRetriever from '../interfaces/ICoinDataRetriever';
import httpService from '../services/httpService';
import SymbolDescription from './SymbolDescription';


export default class SrcCoinLore{
    baseEndpoint: string;
    resourceTicker: string;
    resourceAllTickers: string;

    resourceGlobalCoins:string;

    static symbolDownloadProgess = 0;

    constructor(){
        this.baseEndpoint = "https://api.coinlore.net/api/";
        this.resourceTicker = "";
        this.resourceAllTickers = "tickers";
        this.resourceGlobalCoins = "global";
    }

    async getDataByID(ids: string) {
        var url = this.baseEndpoint+"ticker/?id="+ids;
        return (await httpService.sendGetRequest(url));    
    }

    async getAllSymbolData(filter:string) {
        var url = this.baseEndpoint+this.resourceAllTickers+filter;
        return (await httpService.sendGetRequest(url));    
    }

    async getGlobalCoinData(){
        return (await httpService.sendGetRequest(this.baseEndpoint+this.resourceGlobalCoins));    
    }

    async  getAllSymbolNameData(){
        this.updateSymbolDownloadProgess(0);

        var resultGlobalCoinsData = await this.getGlobalCoinData();

        var coinsCount = +resultGlobalCoinsData[0].coins_count;
        console.log("Total Coins count is "+coinsCount);

        var pages = coinsCount - (coinsCount % 100);

        var symbolNamesArr:string[] = [];

        for(let i = 0; i <= pages; i+=100){
            var result = await this.getAllSymbolData("?start="+i+"&limit=100");
            
            (result.data).forEach((element: any) => {

                var symbDetails = new SymbolDescription(
                    element.id,
                    element.symbol,
                    element.name
                );

                symbolNamesArr.push(JSON.stringify(symbDetails));        
            });
            this.updateSymbolDownloadProgess(i/pages);
        }
        this.updateSymbolDownloadProgess(0);

        return symbolNamesArr;
    }

    updateSymbolDownloadProgess(progress : number){
        SrcCoinLore.symbolDownloadProgess = progress;
    }

}
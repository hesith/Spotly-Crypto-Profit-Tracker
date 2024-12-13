import asyncStorageService from "../services/asyncStorageService";
import WatchListSymbolDescription from "./WatchListSymbolDescription";

export default class WatchListManager{
    static spotWatchList:(WatchListSymbolDescription | undefined) [] = [];

    static AddToSpotWatchList(obj: WatchListSymbolDescription){
        if(this.spotWatchList.filter(element => element?.id == obj.id).length == 0){
            this.spotWatchList.push(obj);
            this.SetSpotWatchList();
        }
    }

    static ReomveFromSpotWatchList(id: string){
        this.spotWatchList = this.spotWatchList.filter(element => element?.id != id);
        this.SetSpotWatchList();
    }

    static UpdateSpotWatchList(newObj: WatchListSymbolDescription){
        var updatedSpotWatchList = this.spotWatchList.map((element) => {
            if(element?.id == newObj.id){
                return (new WatchListSymbolDescription(
                    newObj.id,
                    newObj.symbol,
                    newObj.buyingPrice,
                    newObj.investment,
                    newObj.holdingQty
                ))
            }else{
                return element;
            }
        });
        
        this.spotWatchList = updatedSpotWatchList;
        this.SetSpotWatchList();
    }

    static async SetSpotWatchList(){
        var content = JSON.stringify(this.spotWatchList);
        return await asyncStorageService.storeData('spotWL', content)
    }

    static async GetSpotWatchList(){
        try{
            //console.log("Reading Spot Watch List...")
            var content =  await asyncStorageService.readData('spotWL');
 
            if( content != null){
                this.spotWatchList = await JSON.parse(await content);
            }
    
            return await this.spotWatchList;
        }catch(e){
            console.log(e);
            return this.spotWatchList;
        }
        
    }
}
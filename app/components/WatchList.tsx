import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import AddCoin from "./AddCoin";
import { useEffect, useState } from "react";
import CoinDataManager from "../classes/CoinDataManager";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";
import NoData from "./NoData";
import { styles } from "../styles";

export default function WatchList(){
  const layout = useWindowDimensions();

  const[WLSource,setWLSource] = useState<(WatchListSymbolDescription|undefined)[]|null>(null);
  const[PriceData,setPriceData] = useState<any>(null);

  useEffect(() => {
    const LoadSpotWatchList = async () => {
      var wlSource = await WatchListManager.GetSpotWatchList();

      setWLSource(await wlSource);
    }
    LoadSpotWatchList()  
  }, [WLSource]);

  useEffect(() => {
    const GetCoinSnapshot = async () => {
      let ids:string|undefined = "";

      var wlSource = await WatchListManager.GetSpotWatchList();
      wlSource?.forEach(element => {

        if(ids?.length==0){
          ids = element?.id
        }else{
          ids = ids?.concat(","+element?.id)
        }
      });

      var ss = await CoinDataManager.getTickerData(ids);
      setPriceData(await ss);
      CoinDataManager.setSnapshot(await ss);
    }
    const interval = setInterval(async() => {
      GetCoinSnapshot()  
    }, 10000);

    return () => clearInterval(interval);

  },[PriceData]);

  function renderOption(item: any, index: any){
    return(
    <>
        <AddCoin {...{id:item.id, symbol:item.symbol, buyingPrice:item.buyingPrice, investment:item.investment, holdingQty:item.holdingQty, priceObj:PriceData}}/>
    </>
    )
  };


    if(WLSource?.length == 0){
      return (<NoData></NoData>)
    }else{
      return (
        <ScrollView
          style={[{
            flex: 1,
            flexDirection: 'column'
          }, 
          styles.BackgroundColorLight]}
        >

          {WLSource?.filter(element => element).map(renderOption)}



        </ScrollView>
      );
    }

    

    
}
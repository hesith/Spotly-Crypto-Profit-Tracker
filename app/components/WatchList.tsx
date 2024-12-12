import { ScrollView, Text, useWindowDimensions, View } from "react-native";
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

      var totInvestment =  (WLSource?.reduce((sum, current) => 
        sum + parseFloat((current?.investment) == undefined ? '0' : current?.investment), 0))?.toFixed(2)};
      var totCurrentValue = WLSource?.reduce((sum, current) => 
                sum + (PriceData == undefined ? 0 :parseFloat((PriceData?.filter((x: { id: string; }) => x.id == current?.id))[0]?.price_usd) * parseFloat((current?.holdingQty) == undefined ? '0' : current?.holdingQty)) , 0
      );

      var pnl = (totCurrentValue == undefined || totInvestment == undefined)? 0 : (totCurrentValue - parseFloat(totInvestment)).toFixed(2);
            
      return (
        <>
        <ScrollView
          style={[{
            flex: 1,
            flexDirection: 'column'
          }, 
          styles.BackgroundColorLight]}
        >

          {WLSource?.filter(element => element).map(renderOption)}



        </ScrollView>

        <View style={[{height: 60, marginTop: 1}, styles.BackgroundColorBasic, styles.paddedView, styles.FlexRow]}>
        <Text style={[{fontSize: 8, width: 80}, 
          styles.FontHintColor, styles.FontSymbol, styles.TextVerticalMiddle]}>
            Total Investment
            </Text> 
          <Text style={[{fontSize: 14},
            styles.FontBasicColor,
            styles.FontSymbol]}>$ </Text>
        <Text style={[{fontSize:16},styles.FontPrice, styles.FontBasicColor, styles.TextVerticalMiddle]}> 
          {totInvestment} 
          </Text>

          <Text style={[{fontSize: 8, width: 70, marginLeft: 30}, 
          styles.FontHintColor, styles.FontSymbol, styles.TextVerticalMiddle]}>
            Total Un. PNL
            </Text> 
            <Text style={[{fontSize: 14},
             (parseFloat(pnl.toString()) > 0)? styles.TextProfit : (parseFloat(pnl.toString()) < 0)? styles.TextLoss : styles.TextPNL, 
            styles.FontSymbol]}>
              {PriceData == null ? '' : '~ $'} </Text>
          <Text style={[{fontSize: 16}, 
            (parseFloat(pnl.toString()) > 0)? styles.TextProfit : (parseFloat(pnl.toString()) < 0)? styles.TextLoss : styles.TextPNL, 
            styles.FontPrice]}>  
            {PriceData == null ? '-- --' : pnl == '0.00' ? '0.00' :(parseFloat(pnl.toString())+0.02).toFixed(2)} 
          </Text> 
        </View>

        </>
      );
    }

    

    

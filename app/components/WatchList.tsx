import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AddCoin from "./AddCoin";
import { useEffect, useState } from "react";
import CoinDataManager from "../classes/CoinDataManager";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";
import NoData from "./NoData";
import { styles } from "../styles";
import React from "react";
import Logo from "./Logo";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import CommonRepo from "../classes/CommonRepo";

export default function WatchList(){
  const layout = useWindowDimensions();

  const[WLSource,setWLSource] = useState<(WatchListSymbolDescription|undefined)[]|null>(null);
  const[PriceData,setPriceData] = useState<any>(null);

  const[SortedBySymbol, setSortedBySymbol] = useState<Boolean | null>(null);
  const[SortBySymbolAscending, setSortBySymbolAscending] = useState(false);
  const[SortByInvestmentAscending, setSortByInvestmentAscending] = useState(false);

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
      
      let selected = CommonRepo.GetSelectedWatchListItems();
      let selecteditems = selected.length; 

      const BinIcon= (): IconElement =>{
        return (
  
          <Icon
            fill='#8F9BB3'
            name='trash-2'
            style={[{opacity: selecteditems > 0 ? 1 : 0}, styles.bin]} 
          />
        );
      }

      const ArrowIcon = (): IconElement =>{
        if(SortBySymbolAscending || SortByInvestmentAscending){
          return (
            <Icon
              fill='#8F9BB3'
              name='trending-up'
              style={[styles.sortArrow]}
            />
          );
        }else{
          return (
            <Icon
              fill='#8F9BB3'
              name='trending-down'
              style={[styles.sortArrow]}
            />
          );
        }

      } 

      function sortWLBySymbol(){
        setSortByInvestmentAscending(false);
        setSortedBySymbol(true);

        let arr = WLSource;

        if(!SortBySymbolAscending){
          arr?.sort((a,b) =>  (a?.symbol as unknown as string).localeCompare(b?.symbol as unknown as string));
          setSortBySymbolAscending(true)
        }else{
          arr?.sort((a,b) =>  (b?.symbol as unknown as string).localeCompare(a?.symbol as unknown as string));
          setSortBySymbolAscending(false)
        }

        if(arr != null){
          WatchListManager.ReplaceSpotWatchList(arr);
        }

      }

      function sortWLByInvestment(){
        setSortBySymbolAscending(false);
        setSortedBySymbol(false);

        let arr = WLSource;

        if(!SortByInvestmentAscending){
          arr?.sort((a,b) =>  parseFloat(a?.investment as unknown as string) - parseFloat(b?.investment as unknown as string));
          setSortByInvestmentAscending(true)
        }else{
          arr?.sort((a,b) =>  parseFloat(b?.investment as unknown as string) - parseFloat(a?.investment as unknown as string));
          setSortByInvestmentAscending(false)
        }

        if(arr != null){
          WatchListManager.ReplaceSpotWatchList(arr);
        }

      }

      function onDeleteSelected(){
        selected.forEach(id =>{
          WatchListManager.ReomveFromSpotWatchList(id);
        })
        CommonRepo.ClearSelectedWatchListItems();
      }

      if(WLSource != null){
        return (
          <>



    <View style={[{marginTop: 1, display: (WLSource.length > 1) ? 'flex' : 'none'}, styles.BackgroundColorBasic]}>
      <View
        style={[{height: 30, width: layout.width }]}  
      >
        <View style={[{ height: 30},styles.FlexRow]}>
          <Text 
          style={[{width: layout.width * 0.40, textAlign:"left", fontSize: 12 }, 
            styles.FontSymbolBold, styles.FontHintColor, styles.paddedTextHorizontal, styles.TextVerticalMiddle]}
            onPress={()=> sortWLBySymbol()}
            > 
                Symbol
                {SortedBySymbol == true ? <ArrowIcon></ArrowIcon> : <></>}                
            </Text> 

          <Text style={[{width: layout.width * 0.35, textAlign:"left", fontSize: 12, textAlignVertical: 'top' }, 
            styles.FontSymbolBold, , styles.FontHintColor, styles.TextVerticalMiddle]}
            onPress={()=> sortWLByInvestment()}
            >
            Investment {SortedBySymbol == false ? <ArrowIcon></ArrowIcon> : <>    </>}
             
          </Text>
          <Text 
          style={{width: layout.width * 0.25, textAlign: 'center', textAlignVertical: 'center'}}
          onPress={()=> onDeleteSelected()}
          >
            <Button onPress={()=> onDeleteSelected()} appearance="ghost" accessoryLeft={BinIcon}/> 
          </Text>
        </View>
      </View>
      </View>
      




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
              { (PriceData == null  || isNaN(parseFloat(pnl.toString())))? '-- --' : pnl == '0.00' ? '0.00' : Math.round(parseFloat(pnl.toString())+0.02)} 
            </Text> 
          </View>
  
          </>
        );
      }else{
        return (<Logo {...{'isWatchList':true}}></Logo>)
      }
      
    }

    

    

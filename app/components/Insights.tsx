import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { ScrollView, Text, useWindowDimensions } from "react-native";
import Pie from "./Pie";
import HorizontalBar from "./HorizontalBar";
import PieChartSymbol from "../classes/PieChartSymbol";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";
import BarChartSymbol from "../classes/BarChartSymbol";
import CoinDataManager from "../classes/CoinDataManager";

export default function Insights(){
    const layout = useWindowDimensions();

    const[WLSource,setWLSource] = useState<(WatchListSymbolDescription|undefined)[]|null>(null);
    const[PriceData,setPriceData] = useState<any>(null);

    const[PieData,setPieData] = useState<PieChartSymbol[]>([]);
    const[RiskPieData,setRiskPieData] = useState<PieChartSymbol[]>([]);
    const[BarData,setBarData] = useState<BarChartSymbol[]>([]);

    
    useEffect(() => {
        const LoadSpotWatchList = async () => {
        var wlSource = await WatchListManager.GetSpotWatchList();
    
        setWLSource(await wlSource);
        //
        let dataArr: any = [];
        let riskDataArr: any = [];

        let lowRobj: any = new Object();
        let midRobj: any = new Object();
        let highRobj: any = new Object();

        wlSource?.forEach(element => {
            let inv = parseFloat(element?.investment == undefined ? '0': element?.investment);
            let srcItem = PriceData?.filter((item: { symbol: any; }) => item.symbol == element?.symbol)[0];

            if(inv > 0){
                let symbExist = PieData.filter(e => e.text == element?.symbol);
                dataArr.push(new PieChartSymbol(
                    inv,
                    symbExist.length > 0 ? symbExist[0].color : GetRandomColor(),
                    element?.symbol
                ))

                if(srcItem?.market_cap_usd > 10000000000){
                    if(Object.keys(lowRobj).length > 0){
                        lowRobj.value  += inv
                    }else{
                        lowRobj = (new PieChartSymbol(
                            inv,
                            'lightgreen',
                            'Low'
                        ))
                    }
                 
                }else if(srcItem?.market_cap_usd > 1000000000){
                    if(Object.keys(midRobj).length > 0){
                        midRobj.value  += inv
                    }else{
                        midRobj = (new PieChartSymbol(
                            inv,
                            'orange',
                            'Medium'
                        ))
                    }
                   
                }else{
                    if(Object.keys(highRobj).length > 0){
                        highRobj.value  += inv
                    }else{
                        highRobj = (new PieChartSymbol(
                            inv,
                            'tomato',
                            'High'
                        ))
                    }
            
                }
            }
        });
        if(Object.keys(lowRobj).length > 0){ riskDataArr.push(lowRobj) }
        if(Object.keys(midRobj).length > 0){ riskDataArr.push(midRobj) }
        if(Object.keys(highRobj).length > 0){ riskDataArr.push(highRobj) }


        setPieData(dataArr);


        setRiskPieData(riskDataArr);

        //
        }

        LoadSpotWatchList()    
      }, [WLSource]);

      useEffect(()=>{
        const GetPrices = async () => {
            let data = await CoinDataManager.getSnapshot();
            setPriceData(await data);

            let dataArr: any[] = [];

            WLSource?.forEach(element => {
                let lastPrice = (data.filter((x: { symbol: string; }) => 
                        x.symbol == element?.symbol))[0].price_usd;

                let inv = parseFloat(element?.investment == undefined ? '0': element?.investment);
                let pnl;
                if (element?.holdingQty != undefined && element?.buyingPrice != undefined){
                     pnl = ((parseFloat(lastPrice)* parseFloat(element?.holdingQty == undefined ? '0' : element?.holdingQty)) - (parseFloat(element?.buyingPrice)*parseFloat(element?.holdingQty))).toFixed(2);
                }
                
                if(inv > 0){

                    dataArr.push(new BarChartSymbol(
                        parseFloat(pnl == undefined ? '0' : pnl),
                        element?.symbol,
                        parseFloat(pnl == undefined ? '0' : pnl) > 0 ? 'green' : 'red'
                    ))
                    
                }
            });
            setBarData(dataArr)
        }
        //
        const interval = setInterval(async() => {
            GetPrices()
        }, 1000);
    
        return () => clearInterval(interval);
        //
    },[BarData]) 

    function GetRandomColor(){
        let num = Math.floor(1000 + Math.random() * 9000);
        let color = '#ea' + num.toString();
        return (color)
    }

    return (
        <>
        <ScrollView contentContainerStyle={[{
            justifyContent: "center",
            alignItems: "center",
            width: layout.width, 
            height: 'auto'
            }, styles.BackgroundColorLight, styles.FlexColumnNowrap, styles.paddedView]}>

                <Text style={[{fontSize: 16},styles.FontBasicColor, styles.FontSymbolBold, {marginTop: 20}]}>
                    Portfolio Diversification
                </Text>
               <Pie {...PieData}></Pie>
               <Text style={[{fontSize: 16},styles.FontBasicColor, styles.FontSymbolBold, {marginTop: 80}]}>
                    Risk by Market Cap
                </Text>
               <Pie {...RiskPieData}></Pie>
               <Text style={[{fontSize: 16},styles.FontBasicColor, styles.FontSymbolBold, {marginTop: 80}]}>
                    Asset Performance
                </Text>
               <HorizontalBar {...BarData}></HorizontalBar>             

        </ScrollView>
        </>
    )

}
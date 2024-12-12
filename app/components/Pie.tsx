import { View, Text } from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import { useEffect, useState } from 'react';
import WatchListManager from '../classes/WatchListManager';
import WatchListSymbolDescription from '../classes/WatchListSymbolDescription';
import PieChartSymbol from '../classes/PieChartSymbol';


export default function Pie(){

    const[WLSource,setWLSource] = useState<(WatchListSymbolDescription|undefined)[]|null>(null);
    const[PieData,setPieData] = useState<PieChartSymbol[]>([]);

    
    useEffect(() => {
        const LoadSpotWatchList = async () => {
        var wlSource = await WatchListManager.GetSpotWatchList();
    
        setWLSource(await wlSource);

        //
        let dataArr: any = [];
    
        wlSource?.forEach(element => {
            let inv = parseFloat(element?.investment == undefined ? '0': element?.investment);
            if(inv > 0){
                let symbExist = PieData.filter(e => e.text == element?.symbol);
                dataArr.push(new PieChartSymbol(
                    inv,
                    symbExist.length > 0 ? symbExist[0].color : GetRandomColor(),
                    element?.symbol
                ))
            }
        });
        setPieData(dataArr);
        //

        }

        LoadSpotWatchList()  
      }, [WLSource]);


    function GetRandomColor(){
        let num = Math.floor(1000 + Math.random() * 9000);
        let color = '#ff' + num.toString();
        return (color)
    }
 



    return ( 
        <View style={{paddingTop: 30}}>
        <PieChart
        showText
        textColor="white"
        radius={150}
        textSize={14}
        data={PieData == null ? [] : PieData}
        font="MontserratBold"
        donut
        backgroundColor= '#222B45'
        />
        </View>
    
    )
}
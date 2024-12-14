import { View, Text, useWindowDimensions } from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import PieChartSymbol from '../classes/PieChartSymbol';
import NoData from './NoData';
import { styles } from '../styles';
import { useState } from 'react';
import React from 'react';


export default function Pie(props : PieChartSymbol[]){
    const layout = useWindowDimensions();

    const [PartitionVal, setPartitionVal] = useState<any>(null);

    var dataArr: PieChartSymbol[] = [];

    let sumVal = 0;

    if(Object.keys(props).length > 0){ 
        let arr = [];
        for(let k in props){
           arr.push(props[k])
           sumVal += props[k].value
        }
        dataArr = arr;

    }

    async function onPartitionPressed(para : any){
        para.inv = '$ ' + para.value.toString();
        para.perc = Math.round((para.value/sumVal)*100).toString() + '%';
        
        setPartitionVal(para);
        setTimeout(()=>{
            setPartitionVal(null);
        }, 10000)
    }

    if(dataArr.length > 0){
    return ( 
        <View style={{paddingTop: 30, width: layout.width -40}}>
        <PieChart
        showText
        textColor="white"
        radius={(layout.width - 40) * 0.5}
        textSize={14}
        data={dataArr == null ? [] : dataArr}
        font="MontserratBold"
        donut
        backgroundColor= '#222B45'
        onPress={(para: any) => onPartitionPressed(para) }
        centerLabelComponent={() => {
            return (<>
            <Text style={[{fontSize: 20, textAlign:'center'},styles.FontBasicColor, styles.FontSymbol]}>
                {PartitionVal?.text}
                </Text>
                <Text style={[{fontSize: 20, textAlign:'center'},styles.FontBasicColor, styles.FontSymbolBold]}>
                {PartitionVal?.perc}
                </Text>
                <Text style={[{fontSize: 14, textAlign:'center'},styles.FontBasicColor, styles.FontSymbol]}>
                {PartitionVal?.inv}
                </Text>
            </>
                
            )
                }}
        />
        </View>
    )
    }else{
        return(
            <View style={[{paddingTop: 30}, styles.noDataBorder]}>
                <NoData {...{'type':'chart'}}></NoData>
            </View>
        )
    }
}
import { View, Text, useWindowDimensions } from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import PieChartSymbol from '../classes/PieChartSymbol';
import NoData from './NoData';
import { styles } from '../styles';


export default function Pie(props : PieChartSymbol[]){
    const layout = useWindowDimensions();

    var dataArr: PieChartSymbol[] = [];

    if(Object.keys(props).length > 0){ 
        let arr = [];
        for(let k in props){
           arr.push(props[k])
        }
        dataArr = arr;

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
        />
        </View>
    )
    }else{
        return(
            <View style={[{paddingTop: 30}, styles.noDataBorder]}>
                <NoData></NoData>
            </View>
        )
    }
}
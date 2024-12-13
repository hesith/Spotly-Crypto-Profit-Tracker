import { useWindowDimensions, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { styles } from "../styles";
import BarChartSymbol from "../classes/BarChartSymbol";
import NoData from "./NoData";

export default function HorizontalBar(props : BarChartSymbol[]){
    const layout = useWindowDimensions();
    

    var dataArr: BarChartSymbol[] = [];

    if(Object.keys(props).length > 0){ 
        let arr = [];
        for(let k in props){
           arr.push(props[k])
        }
        dataArr = arr;

    }

   

    if(dataArr.length > 0){
        let high = dataArr.reduce(function(prev, current) {
            return (prev && prev.value > current.value) ? prev : current
          }).value;

        let low = dataArr.reduce(function(prev, current) {
            return (prev && prev.value < current.value) ? prev : current
        }).value;
    
        let diff = Math.round(high - low);
    return (
        <View style={{justifyContent: 'center', alignContent:'center', width: layout.width - 40, paddingTop: 30}}> 
            <BarChart
                horizontal
                width={  (layout.width - 60) } //highest - lowest as 1100
                barWidth={10}
                frontColor="lightgray"
                xAxisLabelTextStyle={styles.barChartText}
                yAxisTextStyle={styles.barChartValue}
                data={dataArr}
                yAxisThickness={0}
                xAxisThickness={0}
                noOfSections={4}
                rulesColor={'rgba(250, 250, 250, 0.5)'}
                yAxisAtTop
                maxValue={ high - Math.abs(low) > 0 ? high * 3 : diff * 2}  
                rotateYAxisTexts={180}
            />
        </View>
    );
    }else{
    return(
        <View style={[{paddingTop: 30}, styles.noDataBorder]}>
            <NoData {...{'type':'chart'}}></NoData>
        </View>
    )
}
}
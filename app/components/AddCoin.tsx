import { Button, Icon, IconElement, Input, Text } from "@ui-kitten/components";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import {styles} from '../styles';
import WatchListManager from "../classes/WatchListManager";
import { useState } from "react";

export default function AddCoin(props:any){
  const layout = useWindowDimensions();

    const [PreviousPrice, setPreviousPrice] = useState("---");

    var priceObj = [props.priceObj];

    var coinData;
    var lastPrice = "--";


    try{
      coinData = priceObj[0]?.filter((x: { id: string; }) => x.id == props.id);
      lastPrice = coinData[0].price_usd;



      if(PreviousPrice != lastPrice){
        setPreviousPrice(lastPrice);
      }

    }catch{
    }


    function onLongPressed(id:string){
      WatchListManager.ReomveFromSpotWatchList(props.id)
    }

    return (

      <View style={{backgroundColor:"white"}}>
      <TouchableOpacity
        style={[{height: layout.height * 0.1, width: layout.width }]} 
        onLongPress={()=> onLongPressed(props.id)}
      >
        <View style={[styles.FlexRow]}>
          <Text style={{width: layout.width * 0.25, backgroundColor:"black", color:"white", textAlign:"left" }}>
                {props.symbol}
          </Text>

          <Text style={{width: layout.width * 0.35, backgroundColor:"grey", textAlign:"right" }}>
            [Buying Price]
          </Text>

          <Text style={{width: layout.width * 0.4, backgroundColor:"red", textAlign:"right" }}> 
                {lastPrice}
          </Text>
        </View>

        <View style={[styles.FlexRow]}>
          <Text style={{width: layout.width * 0.25, backgroundColor:"black", color:"white", textAlign:"left" }}>
            [Qty]
          </Text>

          <Text style={{width: layout.width * 0.35, backgroundColor:"grey", textAlign:"right" }}>
            [Investment]
          </Text>

          <Text style={{width: layout.width * 0.4, backgroundColor:"red", textAlign:"right" }}>
            [Profit/Loss]
          </Text>
        </View>

      </TouchableOpacity>
      </View>) 

}
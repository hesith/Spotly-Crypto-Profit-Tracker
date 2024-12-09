import { Button, Icon, IconElement, Input, Text } from "@ui-kitten/components";
import { Pressable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import {styles} from '../styles';
import WatchListManager from "../classes/WatchListManager";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddCoin(props:any){
  const layout = useWindowDimensions();

    const [PreviousPrice, setPreviousPrice] = useState("-- --");
    const [PriceDiff, setPriceDiff] = useState(0); 

    var priceObj = [props.priceObj];

    var coinData:[any];
    var lastPrice = "-- --";
    
     const navigation = useNavigation();

    const ArrowIcon = (): IconElement =>{
      if(PriceDiff>0){
        return (
          <Icon
            fill='green'
            name='arrow-up'
            style={[styles.priceArrow]}
          />
        );
      }else if(PriceDiff<0){
        return (
          <Icon
            fill='red'
            name='arrow-down'
            style={[styles.priceArrow]}
          />
        );
      }else{
        return (
          <Icon
            name='alert-circle'
            style={[{opacity:0},styles.priceArrow]}
          />
        );
      }
      
    } 

    try{
      coinData = priceObj[0]?.filter((x: { id: string; }) => x.id == props.id);
      lastPrice = coinData[0].price_usd;

      if(PreviousPrice != lastPrice){
        let diff = parseInt(lastPrice)-parseInt(PreviousPrice);
        setPriceDiff(diff);
        setTimeout(() => {
          setPriceDiff(0)
        }, 10000);

        setPreviousPrice(lastPrice);
      }
    }catch{
    }


    function onLongPressed(){
      WatchListManager.ReomveFromSpotWatchList(props.id)
    }

    function onPressed(){
      try{
        navigation.navigate({name:'components/InvestmentDetails', params:coinData[0]} as never);    
      }
      catch{}
    }

    return (

      <View style={[{backgroundColor:"white"}]}>
      <TouchableOpacity
        style={[{height: layout.height * 0.1, width: layout.width }]}  
        onLongPress={()=> onLongPressed()}
        onPress={()=> onPressed()}
      >
        <View style={[styles.FlexRow]}>
          <Text style={[{width: layout.width * 0.25, backgroundColor:"black", color:"white", textAlign:"left" }, styles.FontSymbol]}>
                {props.symbol}
          </Text>

          <Text style={[{width: layout.width * 0.35, backgroundColor:"grey", textAlign:"right" }, styles.FontPrice]}>
            [Buying Price]
          </Text>

          <Text style={[{width: layout.width * 0.4, backgroundColor:"white", textAlign:"right", color: (PriceDiff>0)? 'green' : (PriceDiff<0)? 'red' : 'black'}, styles.FontPrice]}> 
            {lastPrice}  
            <ArrowIcon></ArrowIcon>   
          </Text>
        </View>

        <View style={[styles.FlexRow]}>
          <Text style={{width: layout.width * 0.25, backgroundColor:"black", color:"white", textAlign:"left" }}>
            [Qty]
          </Text>

          <Text style={{width: layout.width * 0.35, backgroundColor:"grey", textAlign:"right" }}>
            [Investment]
          </Text>

          <Text style={{width: layout.width * 0.4, backgroundColor:"green", textAlign:"right" }}>
            [Profit/Loss]
          </Text>
        </View>

      </TouchableOpacity>
      </View>) 

}
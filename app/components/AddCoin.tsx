import { Icon, IconElement, Text } from "@ui-kitten/components";
import { TouchableOpacity, useWindowDimensions, Vibration, View } from "react-native";
import {styles} from '../styles';
import WatchListManager from "../classes/WatchListManager";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CommonRepo from "../classes/CommonRepo";

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

    var pnl = ((parseFloat(lastPrice)*props.holdingQty) - (props.buyingPrice*props.holdingQty)).toFixed(2);

    async function onLongPressed(){
      Vibration.vibrate(50);

      if((await WatchListManager.GetSpotWatchList()).length == 1){
        WatchListManager.ReomveFromSpotWatchList(props.id)
      }
      else{
        CommonRepo.AddRemoveFromSelectedWatchListItems(props.id);
      }
    }

    function onPressed(){
      try{
        if(selectedWLitems.length > 0){
          CommonRepo.AddRemoveFromSelectedWatchListItems(props.id);
        }else{
          navigation.navigate({name:'components/InvestmentDetails', params:{priceObj:coinData[0], invObj:props}} as never);    
        }
      }
      catch{}
    }
    let selectedWLitems = CommonRepo.GetSelectedWatchListItems();
    let isSelected = selectedWLitems.filter(item => item == props.id).length; 

    return (

      <View style={[{marginTop: 1}, isSelected ? styles.BackgroundColorSelected : styles.BackgroundColorBasic]}>
      <TouchableOpacity
        style={[{height: 70, width: layout.width }]}  
        onLongPress={()=> onLongPressed()}
        onPress={()=> onPressed()}
      >
        <View style={[styles.FlexRow]}>
          <Text 
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.25, textAlign:"left"}, 
            styles.FontSymbol, styles.FontBasicColor, styles.paddedTextHorizontal, styles.TextVerticalBottom]}>
                {props.symbol}
          </Text> 

          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.35, textAlign:"right" }, 
            styles.FontPrice, styles.TextVerticalBottom]}>
            <Text  
           onLongPress={()=> onLongPressed()}
             onPress={()=> onPressed()}
            style={[{fontSize: 8},styles.FontSymbol, styles.FontHintColor]}>Buying Price  </Text>
            {props.buyingPrice == 0 ? '-- --' : props.buyingPrice}
          </Text>

          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.4, textAlign:"right", color: (PriceDiff>0)? 'green' : (PriceDiff<0)? 'red' : 'white'}, 
            styles.FontPrice, styles.paddedTextHorizontal]}> 
            {lastPrice}  
            <ArrowIcon></ArrowIcon>   
          </Text>
        </View>

        <View style={[styles.FlexRow]}>
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.25, color:"white", textAlign:"left", fontSize: 10 }, 
            styles.FontBasicColor, styles.paddedTextHorizontal, styles.FontSymbol, styles.TextVerticalBottom]}>
            {props.holdingQty == 0 ? '': props.holdingQty}
          </Text>

          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.35, textAlign:"right"}, 
            styles.TextVerticalBottom, styles.FontPrice]}>           
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{fontSize: 8},styles.FontSymbol, styles.FontHintColor]}>Investment  </Text>
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{fontSize: 14},
            styles.FontSymbol]}>$ </Text>
          {props.investment == '0' ?  '--' : parseFloat(props.investment).toFixed(2) }   
          </Text>

          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{width: layout.width * 0.4, textAlign:"right"}, 
            styles.TextVerticalBottom, styles.paddedViewHorizontal
          ]}>
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{fontSize: 8},styles.FontSymbol, styles.FontHintColor]}>Un. PNL  </Text>
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{fontSize: 14},
            (parseInt(pnl) > 0)? styles.TextProfit : (parseInt(pnl) < 0)? styles.TextLoss : styles.TextPNL, 
            styles.FontSymbol]}>{pnl == '0.00' ? '':'$'} </Text>
          <Text  
           onLongPress={()=> onLongPressed()}
           onPress={()=> onPressed()}
          style={[{fontSize: 16}, 
            (parseInt(pnl) > 0)? styles.TextProfit : (parseInt(pnl) < 0)? styles.TextLoss : styles.TextPNL, 
            styles.FontPrice]}>           
            {pnl == '0.00' || isNaN(parseFloat(pnl)) ? '--' : pnl}
          </Text>
          
          </Text>
        </View>

      </TouchableOpacity> 
      </View>) 

}
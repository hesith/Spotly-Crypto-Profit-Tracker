import { useWindowDimensions, View } from "react-native";
import { styles } from "../styles";
import { Divider, Input, Text } from "@ui-kitten/components";
import CoinDataManager from "../classes/CoinDataManager";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";

export default function InvestmentDetails({route}: any){
    const layout = useWindowDimensions();
    const navigation = useNavigation();

    var priceObj = route?.params.priceObj;
    var invObj = route?.params.invObj;
    
    const[Snapshot, setSnapshot] = useState<any>({price_usd: priceObj?.price_usd, percent_change_24h: priceObj?.percent_change_24h});

    const [BuyingPrice, setBuyingPrice] = useState<any>(invObj.buyingPrice);
    const [Investment, setInvestment] = useState<any>(invObj.investment);
    const [HoldingQty, setHoldingQty] = useState<any>(invObj.holdingQty);

    const buyingPriceRef = useRef<any>(null);
    const investmentRef = useRef<any>(null);
    const holdingQtyRef = useRef<any>(null);


    useEffect(() => {
      const GetCoinSnapshot = () => {
        var ss = CoinDataManager.getSnapshot();

        let coinSS = ss?.filter((x: { id: string; }) => x.id == priceObj?.id);

        setSnapshot(coinSS[0]);

      }    

      const interval = setInterval(async() => {
        GetCoinSnapshot()  
      }, 10000);
  
      return () => clearInterval(interval);
    }, [CoinDataManager.getSnapshot()]);

function onBuyingPriceChanged(value:string){
  try{
    if(!(value.endsWith('.')||value==''))
    {
      if(isNaN(parseFloat(value)) || parseFloat(value)==0){
        setBuyingPrice(0);
        setHoldingQty(0)
      }
      else{
        setBuyingPrice((parseFloat(value)));
        setHoldingQty((Investment/parseFloat(value)).toFixed(5))
      }
     
    }else{
      setBuyingPrice(value);
    }  
  }catch(e){
    console.log(e)
  }
}

function onInvestmentChanged(value:string){
  try{
    if(!(value.endsWith('.')||value==''))
      {
        if(isNaN(parseFloat(value)) || parseFloat(value)==0){
          setInvestment(0);
          setHoldingQty(0)
        }
        else{
          setInvestment(parseFloat(value));
          setHoldingQty((parseFloat(value)/BuyingPrice).toFixed(5))
        }
       
      }else{
        setInvestment(value);
      }  
  }catch(e){
    console.log(e)
  }
}

function onHoldingQtyChanged(value:string){
  try{
    if(!(value.endsWith('.')||value==''))
      {
        if(isNaN(parseFloat(value)) || parseFloat(value)==0){
          setInvestment(0);
          setHoldingQty(0);
        }else{
          setHoldingQty((parseFloat(value)).toFixed(5));
          setInvestment(parseFloat(value)*BuyingPrice)
        }

      }else{
        setHoldingQty(value);
      }  
  }catch(e){
    console.log(e)
  }  
}

function onCancelPressed(){
  navigation.goBack();
}

function onSavePressed(){
  let isValid = validate();

  if(isValid){

    var investmentDetailsObj = new WatchListSymbolDescription(
      priceObj?.id,
      priceObj?.symbol,
      BuyingPrice,
      Investment,
      HoldingQty
    );

    WatchListManager.UpdateSpotWatchList(investmentDetailsObj);

    navigation.goBack();
  }
}

function validate(){
  if(BuyingPrice == 0 || BuyingPrice.toString().endsWith('.') || BuyingPrice == ''){
    buyingPriceRef.current?.focus();
    return false;
  }
  if(Investment == 0 || Investment.toString().endsWith('.') || Investment == ''){
    investmentRef.current?.focus();
    return false;
  }
  if(HoldingQty == 0 || HoldingQty.toString().endsWith('.') || HoldingQty == ''){
    holdingQtyRef.current?.focus();
    return false;
  }
  return true;
}

    return(
        <View
          style={[{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }, styles.BackgroundColorLight]
        }
        >          
        <View style={[{width: layout.width, marginTop: 1 }, styles.paddedViewWithoutBottom, styles.FlexRow, styles.BackgroundColorBasic]}>     
            <Text 
            style={[
              {fontSize: 20, width: (layout.width - 40) * 0.5}, styles.FontSymbolBold
              ]}>
                {priceObj?.symbol}
              </Text>
            <Text 
            style={[
              {fontSize: 20, width: (layout.width - 40) * 0.5, textAlignVertical:'bottom', textAlign:'right' }, 
              styles.FontPrice
              ]}>
                 {Snapshot?.price_usd}
              </Text>
        </View>  

        <View style={[{width: layout.width }, styles.paddedViewWithoutTop, styles.FlexRow, styles.BackgroundColorBasic]}>     
        <Text style={[{fontSize: 12, width: (layout.width - 40) * 0.5},styles.FontSymbol]}>{priceObj?.name}</Text>
        <Text style={[
          {fontSize: 12, width: (layout.width - 40) * 0.5, color:(priceObj?.percent_change_24h < 0)? 'red':'green'}, 
          styles.FontPrice
          ]}>
            {Snapshot?.percent_change_24h}%
        </Text>
        </View>

        <View style={[{width: layout.width, borderTopWidth:1, borderTopColor:'rgba(250, 250, 250, 0.1)' }, styles.paddedView, styles.FlexRow]}>     
            <Text 
            style={[
              { width: (layout.width - 40) * 0.4}, styles.FontSymbol, styles.inputLabel
              ]}>
                Buying Price
              </Text>
            <Input
            size="small"
            inputMode="numeric"
            multiline={false}
            maxLength={11}
            textAlign="right"
            textStyle={[{fontSize:14},styles.FontPrice]}
            ref={buyingPriceRef}
            style={[
              {width: (layout.width - 40) * 0.4, backgroundColor: '#1A2138'},
              styles.input
              ]}
            onChangeText={txt => onBuyingPriceChanged(txt)}
            value={BuyingPrice.toString()}
            disabled = {priceObj == undefined}
            >
            </Input>    
            <Text 
            style={[
              { width: (layout.width - 40) * 0.1}, styles.FontSymbol, styles.inputCurrencyLabel
              ]}>
                USD
              </Text>        
        </View>  

        <View style={[{width: layout.width }, styles.paddedViewWithoutTop, styles.FlexRow]}>     
            <Text 
            style={[
              { width: (layout.width - 40) * 0.4}, styles.FontSymbol, styles.inputLabel
              ]}>
                Investment
              </Text>
              <Input
            size="small"
            inputMode="numeric"
            multiline={false}
            maxLength={15}
            textAlign="right"
            textStyle={[{fontSize:14},styles.FontPrice]}
            ref={investmentRef}
            style={[
              {width: (layout.width - 40) * 0.4, backgroundColor: '#1A2138'},
              styles.input
              ]}
              onChangeText={txt => onInvestmentChanged(txt)}
              value={Investment.toString()}
              disabled = {priceObj == undefined}

              >
            </Input>  
            <Text 
            style={[
              { width: (layout.width - 40) * 0.1}, styles.FontSymbol, styles.inputCurrencyLabel
              ]}>
                USD
              </Text>           
        </View>  

        <View style={[{width: layout.width }, styles.paddedViewWithoutTop, styles.FlexRow]}>     
            <Text 
            style={[
              { width: (layout.width - 40) * 0.4}, styles.FontSymbol, styles.inputLabel
              ]}>
                Holding Qty.
              </Text>
            <Input
            size="small"
            inputMode="numeric"
            multiline={false}
            maxLength={20}
            textAlign="right"
            textStyle={[{fontSize:14},styles.FontPrice]}
            ref={holdingQtyRef}
            style={[
              {width: (layout.width - 40) * 0.4, backgroundColor: '#1A2138'},
              styles.input
              ]}
              onChangeText={txt => onHoldingQtyChanged(txt)}
              value={'~ '+HoldingQty.toString()}
              disabled = {priceObj == undefined}

              >
            </Input>    
            <Text 
            style={[
              { width: (layout.width - 40) * 0.1}, styles.FontSymbol, styles.inputCurrencyLabel
              ]}>
                {priceObj?.symbol}
              </Text>        
        </View>  


        <View style={[{width: layout.width, justifyContent:'flex-end' }, styles.paddedViewWithoutTop, styles.FlexRowFlexEnd]}>     
         
              <Text 
              onPress={()=> onCancelPressed()}
            style={[
              { width: 55, textAlign:'center', marginRight: 20}, 
              styles.FontSymbolBold, 
              styles.buttonLabel
              ]}>
                Cancel
              </Text>
              <Text 
              onPress={()=> onSavePressed()}
            style={[
              { width: 40, textAlign:'center'}, 
              styles.FontSymbolBold, 
              styles.buttonLabelDotted
              ]}>
                Save
              </Text>
        </View>  

        </View>
    );
  
}
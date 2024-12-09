import { useWindowDimensions, View } from "react-native";
import { styles } from "../styles";
import { Input, Text } from "@ui-kitten/components";
import CoinDataManager from "../classes/CoinDataManager";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function InvestmentDetails({route}: any){
    const layout = useWindowDimensions();
    const navigation = useNavigation();

    var priceObj = route?.params;
    const[Snapshot, setSnapshot] = useState<any>({price_usd: priceObj.price_usd, percent_change_24h: priceObj.percent_change_24h});

    const [BuyingPrice, setBuyingPrice] = useState<any>("");
    const [Investment, setInvestment] = useState<any>("");
    const [HoldingQty, setHoldingQty] = useState<any>("");

    const buyingPriceRef = useRef<any>(null);
    const investmentRef = useRef<any>(null);
    const holdingQtyRef = useRef<any>(null);

    useEffect(() => {
      const GetCoinSnapshot = () => {
        var ss = CoinDataManager.getSnapshot();

        let coinSS = ss?.filter((x: { id: string; }) => x.id == priceObj.id);

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
        setHoldingQty(Investment/parseFloat(value))
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
          setHoldingQty(parseFloat(value)/BuyingPrice)
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
          setHoldingQty(parseFloat(value));
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


}

    return(
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: 'skyblue'
          }}
        >          
        <View style={[{width: layout.width }, styles.paddedViewWithoutBottom, styles.FlexRow]}>     
            <Text 
            style={[
              {fontSize: 20, width: (layout.width - 40) * 0.5}, styles.FontSymbolBold
              ]}>
                {priceObj.symbol}
              </Text>
            <Text 
            style={[
              {fontSize: 20, width: (layout.width - 40) * 0.5, textAlignVertical:'bottom', textAlign:'right' }, 
              styles.FontPrice
              ]}>
                 {Snapshot.price_usd}
              </Text>
        </View>  

        <View style={[{width: layout.width }, styles.paddedViewWithoutTop, styles.FlexRow]}>     
        <Text style={[{fontSize: 12, width: (layout.width - 40) * 0.5},styles.FontSymbol]}>{priceObj.name}</Text>
        <Text style={[
          {fontSize: 12, width: (layout.width - 40) * 0.5, color:(priceObj.percent_change_24h < 0)? 'red':'green'}, 
          styles.FontPrice
          ]}>
            {Snapshot.percent_change_24h}%
        </Text>
        </View>

        <View style={[{width: layout.width }, styles.paddedView, styles.FlexRow]}>     
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
              {width: (layout.width - 40) * 0.4},
              styles.input
              ]}
            onChangeText={txt => onBuyingPriceChanged(txt)}
            value={BuyingPrice.toString()}>
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
              {width: (layout.width - 40) * 0.4},
              styles.input
              ]}
              onChangeText={txt => onInvestmentChanged(txt)}
              value={Investment.toString()}>
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
              {width: (layout.width - 40) * 0.4},
              styles.input
              ]}
              onChangeText={txt => onHoldingQtyChanged(txt)}
              value={HoldingQty.toString()}>
            </Input>    
            <Text 
            style={[
              { width: (layout.width - 40) * 0.1}, styles.FontSymbol, styles.inputCurrencyLabel
              ]}>
                {priceObj.symbol}
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
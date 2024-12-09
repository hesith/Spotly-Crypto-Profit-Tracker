import { useWindowDimensions, View } from "react-native";
import { styles } from "../styles";
import { Input, Text } from "@ui-kitten/components";
import CoinDataManager from "../classes/CoinDataManager";
import { useEffect, useState } from "react";

export default function InvestmentDetails({route}: any){
    const layout = useWindowDimensions();

    var priceObj = route?.params;
    const[Snapshot, setSnapshot] = useState<any>({price_usd: priceObj.price_usd, percent_change_24h: priceObj.percent_change_24h});

    const [BuyingPrice, setBuyingPrice] = useState<any>("");
    const [Investment, setInvestment] = useState<any>("");
    const [HoldingQty, setHoldingQty] = useState<any>("");

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
      setBuyingPrice(parseFloat(value));
      setHoldingQty(Investment/parseFloat(value))
    }else{
      setBuyingPrice(value);
    }  
  }catch(e){
    console.log(e)
  }
  
}

function onInvestmentChanged(value:string){
  setInvestment(parseFloat(value));
}

function onHoldingQtyChanged(value:string){
  setHoldingQty(parseFloat(value));
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


        </View>
    );
  
}
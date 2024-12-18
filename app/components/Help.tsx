import { Button, Icon, IconElement } from "@ui-kitten/components";
import { View, Text, useWindowDimensions, ScrollView, Linking } from "react-native";
import { styles } from "../styles";
import React from "react";
import Constants from "expo-constants";

export default function Help(){
    const layout = useWindowDimensions();
    
    const EmailIcon = (): IconElement => (
        <Icon 
          fill='#8F9BB3'
          name='email'
          style={{width: 100, height: 100}}
        />
      );
    
    return (
        <ScrollView
        contentContainerStyle={{justifyContent:'center', alignItems: "center"}}
          style={[{
            flex: 1
          }, styles.BackgroundColorBasic, styles.paddedView]}
        >
              <View style={{ flex: 1, justifyContent: 'flex-start', width: layout.width - 40 }}>
                <Text style={[{fontSize: 20},styles.FontSymbolBold, styles.FontBasicColor]}>
                  Spotly - Crypto Profit Tracker <Text style={[{fontSize: 10},styles.FontSymbol, styles.FontBasicColor]}>
                  v{Constants.expoConfig?.version || Constants.manifest2?.runtimeVersion}</Text>
                </Text>
                <Text style={[{fontSize: 10},styles.FontSymbol, styles.FontBasicColor]}>
                  by <Text style={styles.FontSymbolBold}>Phantom Hook Labs</Text></Text>

                  <Text style={[{fontSize: 12, marginTop: 6},styles.FontSymbol, styles.FontBasicColor]}>

                  <Text 
                  style={[{textAlign:'justify'},styles.FontSymbolBold]}
                  >{'\n'}
                    Spotly</Text>, is a powerful tool designed for cryptocurrency enthusiasts and 
                  investors to efficiently track and analyze their digital assets on <Text 
                  style={[{textAlign:'justify'},styles.FontSymbolBold]}>
                    Spot</Text> trading. {'\n'}{'\n'}
                  The app enables users to:{'\n'}{'\n'}

                  ~ Track Profits {'\n'}{'\n'}
                  ~ Monitor holdings {'\n'}{'\n'}
                  ~ Observe Insightful Charts {'\n'}{'\n'}
                  ~ Track Market Price {'\n'}{'\n'}

                  <Text 
                  style={[{textAlign:'justify', fontSize: 10}]}>
                    * Disclaimer - Prices shown are averages calculated from multiple exchanges and may vary slightly 
                    from actual prices on specific platforms. *</Text>

                    {'\n'}{'\n'}{'\n'} 
                    
                  </Text>

                  <Text style={[{fontSize: 14},styles.FontSymbolBold, styles.FontBasicColor]}>
                 Tips on using the App{'\n'}{'\n'}
                </Text>
                <Text style={[{fontSize: 12, marginTop: 6},styles.FontSymbol, styles.FontBasicColor]}>
                ~ Search and select crypto to add them to the Watch List. {'\n'}{'\n'}
                ~ If the coin you are searching for didn't suggested on search bar, try updating symbol database by clicking 
                Download Icon next to it. Wait till download is complete and Restart the app to apply changes. {'\n'}{'\n'}
                ~ Click on a Watch List symbol record to add investment details. {'\n'}{'\n'}
                ~ Press and hold a Watch List symbol record to select/remove. {'\n'}{'\n'}

                {'\n'}{'\n'}</Text> 


                  <Text style={[{fontSize: 14},styles.FontSymbolBold, styles.FontBasicColor]}>
                  Couldn't find what you're looking for? Reach out to us, and we'll be happy to assist you! 
                </Text>

                
              </View>    
              <View style={{width: (layout.width -40 ), alignItems:'center'}}>
                <Button 
                style={{height: 150, width: 150}} 
                accessoryLeft={EmailIcon} 
                appearance="ghost"
                onPress={()=> Linking.openURL('mailto:phantomhooklabs@gmail.com?subject=Spotly - Crypto Profit Tracker')} 
                ></Button> 
                </View>

        </ScrollView>
)
}


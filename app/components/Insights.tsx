import React from "react";
import { styles } from "../styles";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import Pie from "./Pie";

export default function Insights(){
    const layout = useWindowDimensions();

    return (
        <>
        <ScrollView contentContainerStyle={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }, styles.BackgroundColorLight, styles.FlexColumn, styles.paddedView]}>

            <View
                style={{width: layout.width - 40, alignItems:'center'}}>
                <Text style={[{fontSize: 16},styles.FontBasicColor, styles.FontSymbolBold, {marginTop: 10}]}>
                    Portfolio Diversification
                </Text>
               <Pie></Pie>
            </View>
            

        </ScrollView>
        </>
    )

}
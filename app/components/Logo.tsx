import React from "react";
import {Image, useWindowDimensions, View} from 'react-native';
import { styles } from "../styles";

export default function Logo(props : any){
    const layout = useWindowDimensions();
    
    return (
        <>
        <View
                  style={[{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: layout.width,
                  }, props.isWatchList ? styles.BackgroundColorLight : styles.BackgroundColorBasic]}
                >
        <Image style={{opacity: props.isWatchList ? 0.05 : 1}} source={require('../../assets/images/spotly.png')}>

        </Image>
        </View>
        </>
    )
}
import { Spinner, styled, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { styles } from "../styles";

export default function NoData(){
    return (
        <View
          style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        styles.BackgroundColorLight]}
        >
              <Text style={[styles.FontSymbol, styles.FontHintColor]}>Add Crypto to continue</Text>        

        </View>
)
}
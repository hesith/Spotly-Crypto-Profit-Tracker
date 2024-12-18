import { Text } from "@ui-kitten/components";
import { View } from "react-native";
import { styles } from "../styles";

export default function NoData(props : any){

    return (
        <View
          style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        styles.BackgroundColorLight]}
        >
              <Text style={[styles.FontSymbol, styles.FontHintColor]}>
                {props.type == 'chart' ?  'Add Investment to continue' : 'Add Crypto to continue'}
                </Text>        

        </View>
)
}
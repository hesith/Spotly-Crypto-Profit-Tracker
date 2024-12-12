import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";
import { styles } from "../styles";

export default function LoadingIndicator(){
    return (
        <View
          style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }, styles.BackgroundColorBasic]}
        >
              <Spinner size="giant" status="success"/>         

        </View>
)
}
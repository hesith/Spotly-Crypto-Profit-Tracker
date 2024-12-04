import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

export default function LoadingIndicator(){
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'skyblue'
          }}
        >
              <Spinner size="giant"/>         

        </View>
)
}
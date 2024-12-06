import { Spinner, Text } from "@ui-kitten/components";
import { View } from "react-native";

export default function NoData(){
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'skyblue'
          }}
        >
              <Text>No Data</Text>        

        </View>
)
}
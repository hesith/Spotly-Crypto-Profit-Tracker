import { Text, View } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import AddCoin from "./AddCoin";
import { styles } from "../styles";

export default function WatchList(){
    //return <LoadingIndicator/>
    return (
        <View
          style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'skyblue'
          }, styles.FlexColumn]}
        >
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>
          <AddCoin/>



        </View>
      );
}
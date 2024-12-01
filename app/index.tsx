import { Text, View } from "react-native";
import CoinDataManager from "./classes/CoinDataManager";

export default function Index() {
  
  CoinDataManager.updateCoinDatabase();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

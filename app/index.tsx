import { Text, View } from "react-native";
import CoinDataManager from "./classes/CoinDataManager";
import asyncStorageService from "./services/asyncStorageService";

export default function Index() {
  
  asyncStorageService.storeData("test","testval");
  console.log(asyncStorageService.readData("test"));

  //CoinDataManager.updateCoinDatabaseFromLocal();
  //CoinDataManager.updateCoinDatabase();

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

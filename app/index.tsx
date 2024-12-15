
import { useEffect, useState } from "react";
import CoinDataManager from "./classes/CoinDataManager";
import Configurations from "./classes/Configurations";
import Home from "./components/Home";
import LoadingIndicator from "./components/LoadingIndicator";
import WatchListManager from "./classes/WatchListManager";
import WatchListSymbolDescription from "./classes/WatchListSymbolDescription";
import { AppState, AppStateStatus } from "react-native";
import { showAppOpenAd, loadAppOpenAd } from "./components/AppOpenAd";

export default function Index() {

  ConfigureCoinData()

  const [coinSource, setCoinSource] = useState<any>();

  useEffect(() => {
    const LoadCoinSource = async () => {
      try{
        var coinSource = await CoinDataManager.retrieveFromCoinsDatabase();
        setCoinSource(coinSource);
      }
      catch{
        CoinDataManager.updateCoinDatabaseFromLocal();
      }
    }
    LoadCoinSource()  

    //
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        showAppOpenAd(); // Show the ad when the app becomes active
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    loadAppOpenAd(); // Load the ad on initial app load

    return () => subscription.remove();
    //


  }, []);

  if(coinSource != undefined)
  {
    return <Home></Home> 
  }else
  {
    return <LoadingIndicator></LoadingIndicator> 
  }

}

async function ConfigureCoinData(){

  if(await Configurations.isFirstTime() == null)
  {
    WatchListManager.AddToSpotWatchList(
            new WatchListSymbolDescription(
              '90',
              'BTC'
            )
          )
    WatchListManager.AddToSpotWatchList(
            new WatchListSymbolDescription(
              '80',
              'ETH'
            )
          )
    console.log("First login to application.")
    Configurations.isFirstTime('false');
    CoinDataManager.updateCoinDatabaseFromLocal(); 
  }
  else
  {
    console.log("Login to application.")
  }
}

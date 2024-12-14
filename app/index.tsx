
import { useEffect, useState } from "react";
import CoinDataManager from "./classes/CoinDataManager";
import Configurations from "./classes/Configurations";
import Home from "./components/Home";
import LoadingIndicator from "./components/LoadingIndicator";

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
    console.log("First login to application.")
    Configurations.isFirstTime('false');
    CoinDataManager.updateCoinDatabaseFromLocal(); 
  }
  else
  {
    console.log("Login to application.")
  }
}

import { Autocomplete, AutocompleteItem, Icon, IconElement, Input } from "@ui-kitten/components";
import { Button, useWindowDimensions } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import CoinDataManager from "../classes/CoinDataManager";
import { List } from "ts-generic-collections-linq";

function renderOption(item: any, index: any){
  return(
  <>
  <AutocompleteItem
    key={index}
    title={JSON.parse(item).symbol}
  />
  </>
  )
};

export default function CoinSearch(){
    const layout = useWindowDimensions();

    const [allDataSource, setAllDataSource] = useState<List<any>|undefined>();
    const [dataSource, setDataSource] = useState<any>();
    const [typedText, setTypedText] = useState("");

    const SearchIcon = (): IconElement => (
        <Icon 
          name='search' 
        />
      );

      useEffect(() => {
        const LoadDataSource = async () => {
          var coinSource = await CoinDataManager.retrieveFromCoinsDatabase();
          setAllDataSource(await coinSource);
          setDataSource(coinSource?.toArray());
        }
        LoadDataSource()  
      }, []);


    function Filter(filterText:string){
      setDataSource((allDataSource?.where(i => 
  
        ((JSON.parse(i).symbol).toUpperCase().includes(filterText.trim().toUpperCase())) ||
        ((JSON.parse(i).name).toUpperCase().includes(filterText.trim().toUpperCase())) 

    ))?.toArray())
    }


    return (
    <>
    <Autocomplete 
    style={[{height: 50, width: layout.width}, styles.CenterContent]}
    value={typedText}
    placeholder="Add Coin"
    onChangeText={(newText)=> {
      Filter(newText.trim());
      setTypedText(newText);
    }}    
    accessoryRight={SearchIcon}
    >
      {dataSource?.map(renderOption)}

    </Autocomplete>

    </>
    
)
}

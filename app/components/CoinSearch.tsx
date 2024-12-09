import { Autocomplete, AutocompleteItem, Icon, IconElement, Input } from "@ui-kitten/components";
import { Button, useWindowDimensions, View } from "react-native";
import { styles } from "../styles";
import { useEffect, useRef, useState } from "react";
import CoinDataManager from "../classes/CoinDataManager";
import { List } from "ts-generic-collections-linq";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";

export default function CoinSearch(){
    const layout = useWindowDimensions();

    const [allDataSource, setAllDataSource] = useState<List<any>|undefined>();
    const [dataSource, setDataSource] = useState<any>();
    const [typedText, setTypedText] = useState("");
    const [acDropDownShown, setAcDropDownShown] = useState(false);


    const acRef = useRef<any>(null);

    const SearchIcon = (): IconElement => (
        <Icon 
          name='search'
          style={{opacity: 0.5}}
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


      function renderOption(item: any, index: any){
        return(
        <>
        <AutocompleteItem
          key={index}
          title={JSON.parse(item).symbol +" ("+ JSON.parse(item).name+")"}
          onPress={()=> {
            onItemSelected(item);
          }}
          style={[{display: (acDropDownShown == true) ? 'flex' : 'none' }]}
        />  
        </>
        )
      };

    function Filter(filterText:string){
      setAcDropDownShown(true);
      setDataSource((allDataSource?.where(i => 
  
        ((JSON.parse(i).symbol).toUpperCase().includes(filterText.trim().toUpperCase())) ||
        ((JSON.parse(i).name).toUpperCase().includes(filterText.trim().toUpperCase())) 

    ))?.toArray())
    }
  
    function onTyping(text:string){
      Filter(text.trim());
      setTypedText(text);
    }

    function onItemSelected(item: any){
      acRef.current.clear();
      setTypedText("");
      setAcDropDownShown(false);
      setDataSource(allDataSource?.toArray());
      
      WatchListManager.AddToSpotWatchList(
        new WatchListSymbolDescription(
          JSON.parse(item).id,
          JSON.parse(item).symbol
        )
      )
    }

    function onFocus(){
      setAcDropDownShown(true);
    }

    return (
    <>
    <Autocomplete 
    style={[{height: 50, width: layout.width}, styles.CenterContent, styles.FontSymbol]}
    value={typedText}
    placeholder="Add Coin"
    onChangeText={(newText)=> {
      onTyping(newText);
    }} 
    onFocus={()=> onFocus()}   
    accessoryRight={SearchIcon}
    ref={acRef}
    >

      {dataSource?.map(renderOption)}

    </Autocomplete>

    </>
    
)
}

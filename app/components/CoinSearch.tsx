import { Autocomplete, AutocompleteItem, Icon, IconElement, Text } from "@ui-kitten/components";
import { useWindowDimensions } from "react-native";
import { styles } from "../styles";
import { useEffect, useRef, useState } from "react";
import CoinDataManager from "../classes/CoinDataManager";
import { List } from "ts-generic-collections-linq";
import WatchListManager from "../classes/WatchListManager";
import WatchListSymbolDescription from "../classes/WatchListSymbolDescription";
import React from "react";
import CommonRepo from "../classes/CommonRepo";

export default function CoinSearch(){
    const layout = useWindowDimensions();

    const [allDataSource, setAllDataSource] = useState<List<any>|undefined>();
    const [dataSource, setDataSource] = useState<any>();
    const [typedText, setTypedText] = useState("");
    const [acDropDownShown, setAcDropDownShown] = useState(false);


    const acRef = useRef<any>(null);

    const SearchIcon = (): IconElement => (
        <Icon 
          fill='#8F9BB3'
          name='search'
        />
      );

      useEffect(() => {
        const LoadDataSource = async () => {
          var src = await CoinDataManager.retrieveFromCoinsDatabase();

          var coinSource;

          if(await src.toString().startsWith('Error'))
          {
            await CoinDataManager.updateCoinDatabaseFromLocal();
            coinSource = await CoinDataManager.retrieveFromCoinsDatabase();
          }
          else
          {
            coinSource = await src;
          }

          setAllDataSource(await coinSource);
          setDataSource(coinSource?.toArray());
        }
        LoadDataSource()  
      }, []);

      function renderText(item:any){
        return(
          <>
              <Text style={styles.FontSymbol}>
                {JSON.parse(item).symbol +" ("+ JSON.parse(item).name+")"}
              </Text>
          </>
        )
      }
      function renderOption(item: any, index: any){
        return(
        <>
        <AutocompleteItem
          key={index}
          title={renderText(item)} 
          onPress={()=> {
            onItemSelected(item);
          }}
          style={[{display: (acDropDownShown == true) ? 'flex' : 'none' }, styles.BackgroundColorMedium]}
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
      CommonRepo.ClearSelectedWatchListItems();
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

      acRef.current.blur();
    }

    function onFocus(){
      CommonRepo.ClearSelectedWatchListItems();
      setAcDropDownShown(true);
    }

    return (
    <>
    <Autocomplete 
    textStyle={styles.FontSymbol}
    style={[{height: 50, width: layout.width - 101.5}, styles.CenterContent, styles.FontSymbol]}
    value={typedText}
    placeholder="Search crypto.."
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

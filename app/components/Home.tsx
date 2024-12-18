import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TouchableOpacity, View, useWindowDimensions, Image, ToastAndroid } from 'react-native';
import WatchList from './WatchList';
import CoinSearch from './CoinSearch';
import { styles } from '../styles'; 
import { Button, CircularProgressBar, Icon, IconElement, Text } from "@ui-kitten/components";
import Insights from './Insights';
import CommonRepo from '../classes/CommonRepo';
import CoinDataManager from '../classes/CoinDataManager';
import SrcCoinLore from '../classes/SrcCoinLore';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const watchList = ()=>{
  return (<WatchList></WatchList>)
}
const insights = ()=>{
  return (<Insights></Insights>)
}

const renderScene = SceneMap({
  first: watchList,
  second: insights,
});


const routes = [
  { key: 'first', title: 'Watch List' },
  { key: 'second', title: 'Insights' },
]; 


export default function Home(){
    
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [ToasterShown, setToasterShown] = React.useState(false);
  const [DownloadProgress, setDownloadProgress] = React.useState(0);

  const navigation = useNavigation();


  function showToast(){
    if(!ToasterShown){
      ToastAndroid.showWithGravity("Tap on an item to add investment details", ToastAndroid.LONG, ToastAndroid.CENTER);
      setToasterShown(true);
    }
  }


  const DownloadIcon = (): IconElement => (
          <Icon 
            fill='#8F9BB3'
            name='download'
          />
        );

  useEffect(()=>{
    const Download = async () => {
      if(DownloadProgress == 1){
        setDownloadProgress(0);
        ToastAndroid.showWithGravity("Successfully updated Symbol Database", ToastAndroid.LONG, ToastAndroid.CENTER);
      }
      else{
        setDownloadProgress(SrcCoinLore.symbolDownloadProgess);
      }
    }

    setInterval(() => {
        Download(); 
    }, 2000);
  }, [])   

  async function onDownloadPress(){
    await CoinDataManager.updateCoinDatabase();
  }

  function renderTabBar(props:any){

    return(
      <>
    <TabBar 
        {...props}
        activeColor={'white'}
        inactiveColor={'black'}
        style={[{backgroundColor:'#101426', height: layout.height * 0.06, justifyContent:'center', alignSelf:'center'}]}
        indicatorStyle={{marginLeft: -30}}
        renderTabBarItem={({route, navigationState})=>  (
          <TouchableOpacity 
          onPress={()=>setIndex(routes.indexOf(route as any))}
          style={[
            {backgroundColor: 'rgba(52, 52, 52, 0)', 
              width: layout.width / navigationState.routes.length, 
              height: layout.height * 0.06,
              borderRightWidth: 1,
              borderColor: '#222B45',
              borderBottomRightRadius: 50
            },
            styles.CenterContent
            ]}>
  
          <Text style={[styles.FontSymbol, styles.FontBasicColor, {textAlign:'center'}]}>
            {route.title}
            </Text>
  
          </TouchableOpacity>
        )} 
    /> 

    </>
  )};

  showToast();

  return ( 
    <>
    <View style={[{borderTopWidth: 1.5,borderTopColor: '#222B45'},styles.FlexRow, styles.BackgroundColorLight]}>

      <TouchableOpacity
        style={[{width: 50, justifyContent: 'center', alignItems:'center'}, styles.BackgroundColorLight]}
        onPress={()=> navigation.navigate({name:'components/Help'} as never)}
      >
        <Image style={{width: 40, height: 40, opacity: 0.7}} source={require('../../assets/images/s.png')}></Image>
      </TouchableOpacity>
      <CoinSearch></CoinSearch>
      <View style={{width: 50, height: 50, justifyContent:'center', alignItems:'center'}}>
        <Button style={{width: 50, height: 50, display: DownloadProgress > 0 ? 'none' : 'flex'}} accessoryLeft={DownloadIcon} appearance='ghost' onPress={() => onDownloadPress()}/> 
      <CircularProgressBar textStyle={styles.circularProgessText} style={[{width: 40, height: 40, display: DownloadProgress == 0 ? 'none' : 'flex'}]} progress={DownloadProgress}></CircularProgressBar>
      </View>
      
    </View>
    <TabView 
    style={{borderTopWidth: 1.5, borderTopColor: '#222B45'}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={()=> {
        CommonRepo.ClearSelectedWatchListItems();
        setIndex
      }}
      initialLayout={{ width: layout.width }} 
      renderTabBar={renderTabBar}
    />
    </>
    
  );

}
import * as React from 'react';
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import WatchList from './WatchList';
import CoinSearch from './CoinSearch';
import { styles } from '../styles';
import { Text } from "@ui-kitten/components";
import Insights from './Insights';

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

  function renderTabBar(props:any){
    
    return(<TabBar 
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
  )};

  return ( 
    <>
    <CoinSearch></CoinSearch>
    <TabView 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }} 
      renderTabBar={renderTabBar}
    />
    </>
    
  );

}
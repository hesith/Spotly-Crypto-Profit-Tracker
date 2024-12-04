import * as React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { View, useWindowDimensions } from 'react-native';
import WatchList from './WatchList';
import { Input } from '@ui-kitten/components';
import CoinSearch from './CoinSearch';

const watchList = ()=>{
  return (<WatchList></WatchList>)
}

const renderScene = SceneMap({
  first: watchList,
  second: watchList,
});

const routes = [
  { key: 'first', title: 'Watch List' },
  { key: 'second', title: 'Second' },
];


export default function Home(){
    
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

//return(<WatchList></WatchList>)

  return ( 
    <>
    <CoinSearch></CoinSearch>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }} 
    />
    </>
    
  );

}
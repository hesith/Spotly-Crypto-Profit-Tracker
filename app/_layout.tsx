//import { Stack } from "expo-router";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import WatchList from "./components/WatchList";
import InvestmentDetails from "./components/InvestmentDetails";
import { styles } from './styles';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>

      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="components/Home" component={Home}/>
        <Stack.Screen name="components/WatchList" component={WatchList}/>
        <Stack.Screen name="components/InvestmentDetails" component={InvestmentDetails} options={{headerShown: true, title:'', headerStyle: styles.BackgroundColorBasic, headerTintColor: 'white'}}/>
      </Stack.Navigator>
    
    </ApplicationProvider>

    </>
);

}

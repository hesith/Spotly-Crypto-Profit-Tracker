import { Stack } from "expo-router";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function RootLayout() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="components/Home" />
      <Stack.Screen name="components/WatchList"/>
    </Stack>
    </ApplicationProvider>
    </>
);

}

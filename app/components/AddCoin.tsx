import { Button, Icon, IconElement } from "@ui-kitten/components";
import { useWindowDimensions, View } from "react-native";
import * as styles from '../styles';

export default function AddCoin(){
  const layout = useWindowDimensions();

    const PlusIcon = (): IconElement => (
        <Icon
          name='plus'
        />
      );

    return (<View>
        <Button style={{height: layout.height * 0.1, width: layout.width * 0.99}} accessoryLeft={PlusIcon}></Button>
    </View>) 

}
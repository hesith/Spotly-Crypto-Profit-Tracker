import { StyleSheet, useWindowDimensions } from 'react-native';

export const styles = StyleSheet.create({
    FlexColumn:{
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    FlexRow:{
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    CenterContent:{
        alignContent: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    bgcolorYellowtest:{
        backgroundColor: "yellow"
    }
})
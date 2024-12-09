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
    },
    priceArrow:{
        height:20,
        width:15,
        verticalAlign:'top'
    },
    input:{
        height: 30,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        textAlign:'right'
    },
    inputLabel:{
        height: 32,
        fontSize: 14,
        verticalAlign: 'middle'
    },
    inputCurrencyLabel:{
        height: 32,
        fontSize: 10,
        verticalAlign: 'middle',
        marginLeft: 5
    },
    FontPrice:{
        fontFamily:'MangabeyRegular',
        textAlign:'right'
    },
    FontSymbol:{
        fontFamily:'MontserratRegular',
    },
    FontSymbolBold:{
        fontFamily:'MontserratBold',
    },
    paddedViewWithoutBottom:{
        backgroundColor: 'lightgreen',
        paddingTop: 20,
        paddingHorizontal: 20 
    },
    paddedViewWithoutTop:{
        backgroundColor: 'lightgreen',
        paddingBottom: 20,
        paddingHorizontal: 20 
    },
    paddedViewHorizontal:{
        backgroundColor: 'lightgreen',
        paddingHorizontal: 20 
    },paddedView:{
        backgroundColor: 'lightgreen',
        paddingVertical: 20,
        paddingHorizontal: 20 
    },
    
})
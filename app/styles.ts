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
    FlexRowFlexEnd:{
        flexDirection: "row",
        justifyContent: "flex-end",

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
    buttonLabel:{
        height: 32,
        fontSize: 14,
        verticalAlign: 'bottom'
    },
    buttonLabelDotted:{
        height: 32,
        fontSize: 14,
        verticalAlign: 'bottom',
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        borderColor:'white'
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
    FontBasicColor:{
        color:'#FFFFFF'
    },
    FontHintColor:{
        color:'#8F9BB3'
    },
    BackgroundColorBasic:{
        backgroundColor: '#101426'
    },
    BackgroundColorLight:{
        backgroundColor: '#222B45'
    },
    paddedViewWithoutBottom:{
        paddingTop: 20,
        paddingHorizontal: 20 
    },
    paddedViewWithoutTop:{
        paddingBottom: 20,
        paddingHorizontal: 20 
    },
    paddedViewHorizontal:{
        paddingHorizontal: 20 
    },paddedView:{
        paddingVertical: 20,
        paddingHorizontal: 20 
    },
    paddedTextHorizontal:{
        paddingHorizontal: 10 
    },
    TextVerticalBottom:{
        verticalAlign: 'bottom'
    },
    TextProfit:{
        color: 'lightgreen',
        textShadowColor: 'lightgreen',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10
    },
    TextLoss:{
        color: 'red',
        textShadowColor: 'red',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10
    },
    TextPNL:{
        color: 'white'
    }
})
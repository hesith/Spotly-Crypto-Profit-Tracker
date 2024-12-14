import { StyleSheet, useWindowDimensions } from 'react-native';

export const styles = StyleSheet.create({
    FlexColumn:{
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    FlexColumnNowrap:{
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "nowrap"
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
    barChartText:{
        color: "white",
        fontFamily:'MontserratRegular',
        fontSize: 7
    },
    barChartValue:{
        color: "#8F9BB3",
        fontFamily:'MangabeyRegular',
        fontSize: 10
    },
    priceArrow:{
        height:20,
        width:15,
        verticalAlign:'top'
    },
    sortArrow:{
        height:12,
        width:15,
        verticalAlign:'bottom',
    },
    bin:{
        height:30,
        width:20
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
    BackgroundColorMedium:{
        backgroundColor: '#151A30'
    },
    BackgroundColorLight:{
        backgroundColor: '#222B45'
    },
    BackgroundColorSelected:{
        backgroundColor: 'rgba(218, 61, 61, 0.74)',
        opacity: 0.5
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
    TextVerticalMiddle:{
        verticalAlign: 'middle'
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
    },
    noDataBorder:{
        borderWidth: 1,
        borderColor: 'rgba(250, 250, 250, 0.1)',
        borderStyle: 'dashed',
        height: 100,
        marginTop: 30,
        padding: 30
    },
    circularProgessText:{
        fontSize: 10,
        fontFamily:'MontserratRegular'
    }
})


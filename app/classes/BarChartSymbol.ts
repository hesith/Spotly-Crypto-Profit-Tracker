export default class BarChartSymbol{
    value: number;
    label:string | undefined;
    frontColor:string | undefined;

    constructor(value:number, label:string | undefined, frontColor:string | undefined){
        this.value = value;
        this.label = label;
        this.frontColor = frontColor;
    }
}
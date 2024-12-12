export default class PieChartSymbol{
    value: number;
    color:string | undefined;
    text:string | undefined;

    constructor(value:number, color:string | undefined, text:string | undefined){
        this.value = value;
        this.color = color;
        this.text = text;
    }
}
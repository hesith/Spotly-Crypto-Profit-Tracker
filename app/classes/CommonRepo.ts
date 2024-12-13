export default class CommonRepo{

    static selectedWatchListItems: string[] = [];

    static GetSelectedWatchListItems(){
        return this.selectedWatchListItems;
    }

    static AddRemoveFromSelectedWatchListItems(id: string){
        if(this.selectedWatchListItems.filter(item => item == id).length > 0){
            this.selectedWatchListItems = this.selectedWatchListItems.filter(item => item != id);
        }else{
            this.selectedWatchListItems.push(id);
        }
    }   

    static ClearSelectedWatchListItems(){
        this.selectedWatchListItems = [];
    }

}
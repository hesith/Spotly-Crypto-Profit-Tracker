import * as FileSystem from 'expo-file-system';
import coinsInitial from '../local/coinsInitial';
import { List, Dictionary } from 'ts-generic-collections-linq'
import SymbolDescription from '../classes/SymbolDescription';

export default class fileService{

    static coinsDataFilePath = FileSystem.cacheDirectory + "coins.txt";

    static async writeToCoinsFile(data:string){

        try 
        {
            var content = data;
      
            console.log("Writing to file.. ("+this.coinsDataFilePath+")");

            return await FileSystem.writeAsStringAsync(this.coinsDataFilePath, content)
            .then(()=>{
                console.log("Write successful. (File : "+this.coinsDataFilePath+")");
            },
            (error)=>{
                console.log("Write unsuccessful, ("+error+")");
            })
            .catch(e=>{
                console.log(e);
            });

        } 
        catch (error) 
        {
            console.error(error);
        }
    }
    
    static async readFromCoinsFile(){
        try
        {
            console.log("Reading from : ", this.coinsDataFilePath);
            var content = await FileSystem.readAsStringAsync(this.coinsDataFilePath);
            
            var contentList = new List<any>(JSON.parse(await content));

            //console.log(contentList.where(i => JSON.parse(i).id == 32802));

            return contentList;

        }
        catch(error)
        {
            console.log(error);
        }
    }

    static async readFromCoinsInitialFile(){
        try
        {     
            console.log("Reading from Coins Initial file...")
            var content = await JSON.stringify(coinsInitial.data);

            return(await content);

        }
        catch(error)
        {
            console.log(error);
        }
    }

}

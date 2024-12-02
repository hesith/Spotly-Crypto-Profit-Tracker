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
      
            return await FileSystem.writeAsStringAsync(this.coinsDataFilePath, content);

        } 
        catch (error) 
        {
            console.error(error);
        }
    }
    
    static async readFromCoinsFile(){
        try
        {
            var content = await FileSystem.readAsStringAsync(this.coinsDataFilePath);
            
            var contentList = new List<any>(JSON.parse(content));

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
            var content = await JSON.stringify(coinsInitial.data);

            return(await content);

        }
        catch(error)
        {
            console.log(error);
        }
    }

}

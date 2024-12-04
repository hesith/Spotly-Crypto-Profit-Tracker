import SrcCoinLore from "./SrcCoinLore";
import SrcCoinCap from "./SrcCoinCap";
import fileService from "../services/fileService";
import { List } from "ts-generic-collections-linq";

export default class CoinDataManager{

    static coinSource:List<any> | undefined;

    static async updateCoinDatabase() {
        let srcObj = new SrcCoinLore();
        var data = await srcObj.getAllSymbolNameData();

        fileService.writeToCoinsFile(JSON.stringify(await data)).then(() =>{
            console.log("Update successful")
            //this.updateCoinSource()
        },
        ()=>{
            console.log("Update unsuccessful")
        })
        .catch(e=>{
            console.log(e);
        });
    }

    static async updateCoinDatabaseFromLocal() {
        var data = await fileService.readFromCoinsInitialFile();

        if(data==undefined){
            data = "";
        }

        fileService.writeToCoinsFile(await data).then(() =>{
            console.log("Update successful")
            //this.updateCoinSource()
        },
        ()=>{
            console.log("Update unsuccessful")
        })
        .catch(e=>{
            console.log(e);
        });
    }

    static async retrieveFromCoinsDatabase(){
        return fileService.readFromCoinsFile();
    }

    // static async updateCoinSource(){
    //     this.coinSource = await this.retrieveFromCoinsDatabase();
    //     console.log("Updated Coin Source. Its a "+this.coinSource?.length+" element List.")
    // }
}
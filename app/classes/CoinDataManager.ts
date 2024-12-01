import SrcCoinLore from "./SrcCoinLore";
import SrcCoinCap from "./SrcCoinCap";
import fileService from "../services/fileService";

export default class CoinDataManager{

    static async updateCoinDatabase() {
        //let srcObj = new SrcCoinLore();
        //var data = await srcObj.getAllSymbolNameData();

        fileService.writeToCoinsFile();
    }

}
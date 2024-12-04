import asyncStorageService from "../services/asyncStorageService";

export default class Configurations{

    static async isFirstTime(value: string|null = null){
        if(value != null)
        {
            console.log("Stored config isFirstTime : ", value);
            return await asyncStorageService.storeData("isFirstTime", value)
        }
        else
        {
            return await asyncStorageService.readData("isFirstTime");
        }
    }
}
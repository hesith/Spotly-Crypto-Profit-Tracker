import AsyncStorage from '@react-native-async-storage/async-storage';

export default class asyncStorageService{

    static async storeData(key:string, value:string){
        return await AsyncStorage.setItem(key,value);
    }

    static async readData(key:string){
        return await AsyncStorage.getItem(key);
    }

}
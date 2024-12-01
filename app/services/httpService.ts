
export default class httpService{

    static async sendGetRequest(url:string){

        console.log("Sending GET Request.. (Endpoint: "+url+")");

        const response = await fetch(url);
        const jsonResponse = await response.json();

        return (await jsonResponse);



    }
}
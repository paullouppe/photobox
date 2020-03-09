
let server_url = "";

export function initialisation(url){
    server_url = url;
}

export function chargement(uri){
    let promesse = axios.request({
        url : server_url+uri,

        method : 'get',

        withCredentials : true,

        responseType: 'json'
    });
    return promesse.then(function (){
        return axios.request({
            url : server_url+uri,

            method : 'get',

            withCredentials : true,

            responseType: 'json'
        });
    });
}

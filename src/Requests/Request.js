// import api_url from '../../api_url/api_url';
class Request{
    /**
     * @static
     * @param {string} url
     * @param {string} method
     * @memberof Requet
     */
    static async fetch_all(url, method){
        let information = [];
        fetch(url, {
            method: method
        })
        .then(res=>res.json())
        .then(succes => {
           return information = succes.data;
        })
        .catch(error=>{
            console.log('ERROR', error);
        })
        
    }
}

export default Request;
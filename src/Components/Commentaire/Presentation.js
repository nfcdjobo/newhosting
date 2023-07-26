import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";

function Presentation(params) {
    const urlPage = window.location.href;
    

    fetch(api_url+'getExpositionById/'+urlPage.slice(urlPage.indexOf('#!')+2).split('-')[0], {
        headers: { Authorization: `token ${cookie.token}`}
    })
    .then(res => res.json())
    .then(succes => {
    });

    return(<></>)
}


export default Presentation;
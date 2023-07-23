import Cookies from "js-cookie";

const deconnexion = event=>{
    Cookies.remove('user_sophia_culturas', {path: '/'});
    window.location.href = '/login#!';
}

export default deconnexion;
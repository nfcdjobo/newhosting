import Cookies from 'js-cookie';
const cookie = Cookies.get('user_sophia_culturas') ? { 
    user: JSON.parse(Cookies.get('user_sophia_culturas')).user,
    domaine: JSON.parse(Cookies.get('user_sophia_culturas')).domaine,
    token: JSON.parse(Cookies.get('user_sophia_culturas')).token,
    cok:JSON.parse(Cookies.get('user_sophia_culturas'))
} : false;

export default cookie;
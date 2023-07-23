import Cookies from 'js-cookie';

const UpdateCookie = (data) => {
    Cookies.set('user_sophia_culturas', JSON.stringify({token:data.token, user: data.user, domaine: data.domaine}), {expires: 1, path: '/'});
}

export default UpdateCookie;
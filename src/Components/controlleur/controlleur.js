import cookie from "../../Cookies/Cookies";
const isCookie_user_authorization = cookie ? ( cookie.user.entite === "GESTIONNAIRE" ? "GESTIONNAIRE" : cookie.user.entite === "AUTEUR" ? "AUTEUR" : cookie.user.entite === "PASSANT" ? "PASSANT": false ) : false;

export default isCookie_user_authorization;



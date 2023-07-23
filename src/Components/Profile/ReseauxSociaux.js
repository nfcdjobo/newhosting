import cookie from "../../Cookies/Cookies";
import UpdateCookie from "../../Cookies/UpdateCookie";
import api_url from "../../api_url/api_url";
import isCookie_user_authorization from "../controlleur/controlleur";

function ReseauxSociaux(props) {
    if(isCookie_user_authorization ==="AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
        return (
                <div className="card mb-4">
                    <div className="card-header">Autres Informations</div>
                    <div className="card-body">
                        <form id="form-reseaux-sociaux" onSubmit={saveLink}>
                            <label htmlFor="facebook" className="form-label">Lien de compte facebook</label>
                            <div className="input-group">
                                <input className="form-control" name="facebook" defaultValue={props.user.facebook} id="facebook" type="url"  aria-describedby="button-search" />
                            </div>

                            <label htmlFor="twitter" className="form-label">Lien de compte twitter</label>
                            <div className="input-group">
                                <input className="form-control" name="twitter" defaultValue={props.user.twitter} id="twitter" type="url"  aria-describedby="button-search" />
                            </div>
                        
                            <label htmlFor="instagram" className="form-label">Lien de compte instagram</label>
                            <div className="input-group">
                                <input className="form-control" name="instagram" defaultValue={props.user.instagram} id="instagram" type="url"  aria-describedby="button-search" />
                            </div>

                            <label htmlFor="linkedIn" className="form-label">Lien de compte LinkedIn</label>
                            <div className="input-group">
                                <input className="form-control" name="linkedIn" defaultValue={props.user.linkedIn} id="linkedIn" type="url"  aria-describedby="button-search" />
                            </div>

                            <label htmlFor="youtube" className="form-label">Lien de compte Youtube</label>
                            <div className="input-group">
                                <input className="form-control" name="youtube" defaultValue={props.user.youtube} id="youtube" type="url"  aria-describedby="button-search" />
                            </div>
                            <hr />
                            <button className="btn btn-primary" type="submit" id="btn-submit-red">Envoyer</button>
                        </form>
                    </div>
                    <div role="alert" id="alert-update"></div>
                </div>
            )
    }else{
        window.location.href = '/login#!';
    }
    
}

function saveLink(event){
    event.preventDefault();
    if(isCookie_user_authorization === "AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
        const alertUpdate = document.getElementById('alert-update');
        fetch(api_url+'updateUser', {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target)),
            headers: { Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            alertUpdate.className = 'alert alert-success text-center';
            alertUpdate.textContent = 'Mise à jour effectuée avec succès.';
            UpdateCookie(succes);
        })
    }else{
        window.location.href = '/login#!';
    }
    
    
}

export default ReseauxSociaux;
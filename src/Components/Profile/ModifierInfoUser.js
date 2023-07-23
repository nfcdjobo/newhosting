import cookie from '../../Cookies/Cookies';
import api_url from '../../api_url/api_url';
import Validateur from '../../Validators/Validateur';
import UpdateCookie from '../../Cookies/UpdateCookie';
import isCookie_user_authorization from '../controlleur/controlleur';

function ModifierInfoUser(params) {
    if(isCookie_user_authorization === "AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
        fetch(api_url+'getAllDomaine')
        .then(res => res.json())
        .then(success => {
            const domaine = cookie.domaine;
            const selectDomaine = document.getElementById('domaine_id');
            document.getElementById('toggleAnnuler').addEventListener('click', ToggleAnnuler);
            document.getElementById('toggleEdite').addEventListener('click', ToggleEdite)
            selectDomaine.textContent = "";
            const data = success.data;
            data.sort((a, b) => a.libelle.localeCompare(b.libelle)).forEach(item => {
                const option = document.createElement('option'); option.value = item._id; option.textContent = item.libelle.toUpperCase(); selectDomaine.append(option)
                if(item._id === domaine._id ) option.selected = true;
            });
            document.getElementById("form-edite-user").addEventListener('submit', updateUser);
        })
        .catch(()=>{
            return [];
        });

        return (
            <>
                <div className="card-header">Modifier</div>
                <div className="card-body">
                    <form id="form-edite-user" encType="multipart/form-data" onSubmit={updateUser}>
                        <label htmlFor="nomPrenom" className="form-label">Nom et Prénom (<code style={{ color: 'orange' }}>Désactivité</code>)</label>
                        <div className="input-group">
                            <span className="form-control" disabled>{params.user.nomPrenom}</span>
                            {/* <input className="form-control" type="text" name="nomPrenom" defaultValue={params.user.nomPrenom} id="nomPrenom"  aria-describedby="button-search"/> */}
                        </div>

                        <label htmlFor="nationalite" className="form-label">Nationalité (<code style={{ color: 'orange' }}>Désactivité</code>)</label>
                        <div className="input-group">
                            <span className="form-control" disabled>{params.user.nationalite}</span>
                            {/* <input className="form-control" type="text" name="nationalite" defaultValue={params.user.nationalite} id="nationalite"  aria-describedby="button-search" /> */}
                        </div>

                        <label htmlFor="photo" className="form-label">Profile </label>
                        <code id="error-file">  </code>
                        <div className="input-group">
                            <input className="form-control" type="file" name="photo" id="photo"  aria-describedby="button-search" accept=".png, .jpg, .jpeg, .webp, .avif, .gif" onChange={verifySize} />
                        </div>
                    
                        <label htmlFor="email" className="form-label">Email (<code style={{ color: 'orange' }}>Désactivité</code>)</label>
                        <div className="input-group">
                            <span className="form-control" disabled>{params.user.email}</span>
                            {/* <input className="form-control" type="email" name="email" defaultValue={params.user.email} id="email" aria-describedby="button-search" /> */}
                        </div>

                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <div className="input-group">
                            <input className="form-control" type="tel" name="telephone" defaultValue={params.user.telephone} id="telephone"  aria-describedby="button-search" required/>
                        </div>
                        
                        <label htmlFor="domaine_id" className="form-label">Domaine</label>
                        <div className="input-group">
                            <select name="domaine_id" defaultValue={''} className="form-control" aria-label="domaine_id" id="domaine_id" aria-describedby="basic-addon1" required></select>
                        </div>
                        <hr />
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-danger" id="toggleAnnuler">Annuler</button> &#160; &#160;
                            <button type="submit" className="btn btn-outline-success" id="btn-submit-user">Modifier</button>
                        </div>
                        
                    </form>
                    <br/>
                    <div className="" id="alert-update" role="alert"></div>
                </div>
            </>
        )
    }else{
        window.location.href = '/login#!';
    }
}

function updateUser(event) {
    event.preventDefault();
    if(isCookie_user_authorization === "AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
        if(Validateur.validateurTelephone(event.target.querySelector('#telephone').value)){
            const formData = new FormData();
            const alertUpdate = document.getElementById('alert-update')
            formData.append('telephone', event.target.querySelector('#telephone').value);
            formData.append('domaine_id', event.target.querySelector('#domaine_id').value);
            if(event.target.querySelector('#photo').files[0]){
                formData.append('photo', event.target.querySelector('#photo').files[0]);
            }
            fetch(api_url+'updateUser', {
                method: 'POST',
                body: formData,
                headers: { Authorization: `token ${cookie.token}`}
            })
            .then(res => res.json())
            .then(succes => {
                if(succes.msg.includes('Mise à jour effectuée avec succès !')){
                    UpdateCookie(succes);
                    alertUpdate.className = 'alert alert-success text-center';
                    alertUpdate.textContent = 'Mise à jour effectuée avec succès.';
                }
                ToggleAnnuler();
            })
            .catch(error => {
                console.log(error)
            })
        }
    }else{
        window.location.href = '/login#!';
    }
}

function ToggleEdite() {
    document.getElementById('gameToggle').hidden = true;
    document.getElementById('gameToggle2').hidden = false;
}

function ToggleAnnuler() {
    document.getElementById('gameToggle').hidden = false;
    document.getElementById('gameToggle2').hidden = true;
}

function verifySize(event){
    const eventElement = event.target;
    const errorFile = document.getElementById('error-file')
    const btnSubmitUser = document.getElementById('btn-submit-user');
    if(eventElement.files[0] && eventElement.files[0].size > 1024*1024*2){
        eventElement.focus();
        errorFile.textContent =" ( Au plus 2Mo ) "
        btnSubmitUser.disabled = true;
    }else{
        btnSubmitUser.disabled = false;
        errorFile.textContent = "";
    }
}

export default ModifierInfoUser;
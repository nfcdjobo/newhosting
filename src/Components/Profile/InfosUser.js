import isCookie_user_authorization from "../controlleur/controlleur";

function InfosUser(props) {
    if(isCookie_user_authorization === "AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <>
                <a href="#!"><img className="card-img-top" id="photo" src={props.user.photo} alt="..." style={{height: "200px"}}/></a>
                <div className="card-body">
                    <div className="small text-muted" id="ceatedAt">Actif dépuis {new Date(props.user.createdAt).toLocaleDateString('fr-FR', options)}</div>
                    <h5 className="card-title"  id="username">{props.user.nomPrenom}</h5>
                    <div className="card-text" id="usernationalite">Nationalité : {props.user.nationalite}</div>
                    <div className="card-text" id="useremail"> E-mail : {props.user.email}</div>
                    <div className="card-text" id="userphoto"> Téléphone : {props.user.telephone}</div>
                    <hr/>
                    <button className="btn btn-primary" href="#!" id="toggleEdite">Modifier →</button>
                </div>
            </>
        )
    }else{
        window.location.href = '/login#!';
    }
}

export default InfosUser;


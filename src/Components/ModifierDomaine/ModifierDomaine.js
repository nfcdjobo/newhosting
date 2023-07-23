import { useEffect, useState } from "react";
import cookie from "../../Cookies/Cookies";
import api_url from "../../api_url/api_url";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import isCookie_user_authorization from "../controlleur/controlleur";

function ModifierDomaine(params) {
    let [state, setState] = useState({});
    useEffect(() => {
        if(isCookie_user_authorization === "GESTIONNAIRE"){
            fetch(api_url+'getDomaineById/'+window.location.href.split('#!')[1], {
                method: 'GET',
                headers: { Authorization: `token ${cookie.token}`}
            })
            .then( res => res.json())
            .then(succes => {
                setState(succes.data);
            })
        }else{
            window.location.href = '/login#!';
        }
    }, []);
    if(isCookie_user_authorization === "GESTIONNAIRE"){
        return(
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3">Bienvenue chez </h3>
                            <h1 className="fw-bolder">Sophia-Culturas (S-!-C)</h1>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card mb-4" id="gameToggle">
                                <div className="card-header text-center">DETAIL DU DOMAINE D'ACTIVITE</div>
                                <div className="card-body">
                                    <picture>
                                        <source srcSet={state.photo} id="srcSet" type="image/svg+xml"/>
                                        <img src={state.photo} className="img-fluid img-thumbnail" id="Photos" alt="..." style={{width: 100+'%', minHeight: 300+'px', maxHeight:350+'px'}}/>
                                    </picture>
                                    <div className="card-header text-center" id="Libelle">{state.libelle}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header text-center">AJOUTER NOUVELS DETAILS</div>
                                <div className="card-body">
                                    <form id="edite-domaine" onSubmit={EditeDomaine}>
                                        <label htmlFor="libelle" className="form-label">Libelle du domaine d'activié</label>
                                        <div className="input-group">
                                            <input className="form-control" name="libelle" id="libelle" type="text" defaultValue={state.libelle} aria-describedby="button-search" required/>
                                        </div>
                                        <label htmlFor="photo" className="form-label">Image d'accompagnement</label>
                                        <div className="input-group">
                                            <input className="form-control" name="photo" id="photo" type="file"  aria-describedby="button-search"/>
                                        </div>
                                        <hr />
                                        <button className="btn btn-primary" type="submit" id="btn-submit-red">Envoyer <i className="bi bi-send-fill"></i></button>
                                    </form>
                                </div>
                                <div className="" id="edite-alert" role="alert"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }else{
        window.location.href = '/login#!';
    }
}

function EditeDomaine(event){
    if(isCookie_user_authorization === "GESTIONNAIRE"){
        event.preventDefault();
        const libelle = document.getElementById('libelle');
        const photo = document.getElementById('photo');
        const editeAlert = document.getElementById('edite-alert');
        const Photo = document.getElementById('Photos');
        const Libelle = document.getElementById('Libelle');
        const srcSet = document.getElementById('srcSet');

        editeAlert.textContent = "";
        editeAlert.className = "";
        const formData = new FormData();
        formData.append('libelle', libelle.value);
        if(photo.files[0]){
            formData.append('photo', photo.files[0]);
            formData.append('id', window.location.href.split('#!')[1])
        }
        fetch(api_url+'uptateDomaine', {
            method: 'POST',
            body: formData,
            headers: {Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            if(succes.msg.includes('succès')){
                editeAlert.textContent = "Mise à jour effectuée avec succès !";
                editeAlert.className = "alert alert-success text-center";
                event.target.querySelectorAll('input').forEach(item => {
                    item.value = '';
                });
                libelle.value = succes.data.libelle;
                Libelle.textContent = succes.data.libelle;
                Photo.src = succes.data.photo;
                srcSet.srcSet = succes.data.photo;
            }else{
                editeAlert.textContent = "Mise à jour non prise ne compte, veuillez réessayer dans quelques instant.";
                editeAlert.className = "alert alert-danger text-center";
            }
        })
        .catch(error => {
            editeAlert.textContent = "Mise à jour non prise ne compte, veuillez réessayer dans quelques instant.";
            editeAlert.className = "alert alert-danger text-center";
        })

    }else{
        window.location.href = '/login#!';
    }
    
}


export default ModifierDomaine;
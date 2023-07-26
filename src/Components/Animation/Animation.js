import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import isCookie_user_authorization from '../controlleur/controlleur';




function Animation(){
    if(isCookie_user_authorization){
        if(isCookie_user_authorization==="GESTIONNAIRE"){
            const saved = (event) =>{
                event.preventDefault();
                const classForm = event.target.className;
                let formData = new FormData();
                const photo = event.target.querySelector('#photo').files[0];
                const fileErreur = document.getElementById('fileErreur');
                fileErreur.textContent = "";
                event.target.querySelector('#alerter').textContent = '';

                if(photo){
                    if(photo.size <= 1024*1024*2){
                        formData.append('photo', photo);
                    }else{
                        event.target.querySelector('#photo').focus();
                        fileErreur.textContent = photo.size/(1024*1024) + " Mo est trop volumineuse comment taille du fichier. Au  plus 2 Mo."
                        return;
                    }
                }
                
                if(classForm === "banniere"){
                    formData.append("accueil", event.target.querySelector('#accueil').value);
                    formData.append("plateforme", event.target.querySelector('#plateforme').value);
                    formData.append("sigle", event.target.querySelector('#sigle').value);
                    formData.append("entite", event.target.className);
                }else if(classForm === "service"){
                    formData.append("titre", event.target.querySelector('#titre').value);
                    formData.append("description", event.target.querySelector('#description').value);
                    formData.append("entite", event.target.className);
                }else if(classForm === "table"){
                    formData.append("titre", event.target.querySelector('#titre').value);
                    formData.append("sousTitre", event.target.querySelector('#sousTitre').value);
                    formData.append("type", event.target.querySelector('#type').value);
                    formData.append("resume", event.target.querySelector('#resume').value);
                    formData.append("entite", event.target.className);
                }
                
                fetch(api_url+'create', {
                    method: "POST",
                    body: formData,
                    headers: {Authorization: `token ${cookie.token}`}
                })
                .then(res => res.json())
                .then(succes => {
                    if(succes.data){
                        event.target.querySelectorAll('input').forEach(item => {
                            if(item.name != 'entite'){item.value = ''}
                            
                        });
                        if(event.target.querySelectorAll('textarea')){
                            event.target.querySelectorAll('textarea').forEach(item => {
                                item.textContent = '';
                                item.value = '';
                            })
                        }
                        event.target.querySelector('#alerter').innerHTML = "Enrégistrement effectué avec succès.";
                        event.target.querySelector('#alerter').className = "alert alert-success text-center";

                    }else{
                        event.target.querySelector('#alerter').innerHTML = "Enrégistrement échoue.";
                        event.target.querySelector('#alerter').className = "alert alert-danger text-center";
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }

            return (
                <>
                    <Navbar />

                    <header className="py-5 bg-light border-bottom mb-4">
                        <div className="container">
                            <div className="text-center my-5">
                            <h3 className="lea mb-3">Espace d'animation des vues</h3>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-header text-center">AJOUTER</div>
                                    <div className="card-body">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#BANNIERE"> BANNIERE</button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-grid gap-2 text-center">
                                            <a href="/show-end#!banniere"><button className="btn btn-outline-secondary" type="button"> VOIR BANNIERE</button></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="BANNIERE" tabIndex="-1" aria-labelledby="BANNIERELabel" style={{display: "none"}} aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title h4" id="BANNIERELabel">Ajouter la bannière d'accueil</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form data-sb-form-api-token="API_TOKEN" className='banniere' onSubmit={saved} encType="multipart/form-data">
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <div className="mb-3" hidden={true}>
                                                                <label htmlFor="photo" className="form-label">Image de la bannière</label>
                                                                <input type="file" name="photo" className="form-control" id="photo"/>
                                                                <code id='fileErreur'></code>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="accueil" className="form-label">Mot d'accueil</label>
                                                                <input type="text" name="accueil" id="accueil" className="form-control" placeholder='Exemple: Bienvenue !' required/>
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-6'>
                                                            <div className="mb-3">
                                                                <label htmlFor="plateforme" className="form-label">Nom de la plateforme</label>
                                                                <input type="text" className="form-control" id="plateforme" name="plateforme" defaultValue={"Soplia-Culturas"} aria-describedby="emailHelp" disabled required/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="sigle" className="form-label">Sigle de la plateforme</label>
                                                                <input type="text" name="sigle" className="form-control" defaultValue={"(S-!-C)"} id="sigle" disabled required/>
                                                            </div>
                                                        </div>
                                                        <input type="text" className="form-control" defaultValue={"banniere"}  name="entite" aria-describedby="entite" hidden required/>
                                                    </div>

                                                    <div className="d-grid gap-2 col-6 mx-auto">
                                                        <button type="submit" className="btn btn-warning">Envoyer</button>
                                                    </div>
                                                    
                                                    <br/>
                                                    <div id='alerter' role='alert'></div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-header text-center">AJOUTER DETAIL</div>
                                    <div className="card-body">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-secondary " type="button" data-bs-toggle="modal" data-bs-target="#info-service">RESUME  SERVICES</button>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="d-grid gap-2 text-center">
                                            <a href="/show-end#!service"><button className="btn btn-outline-secondary" type="button"> VOIR SERVICES</button></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="info-service" tabIndex="-1" aria-labelledby="info-serviceLabel" style={{display: "none"}} aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title h4" id="info-serviceLabel">Notre service est de : </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form data-sb-form-api-token="API_TOKEN" className='service' onSubmit={saved} encType="multipart/form-data">
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <div className="mb-3">
                                                                <label htmlFor="titre" className="form-label">Titre du service</label>
                                                                <input type="text" name='titre' className="form-control" placeholder="Titre du service *" id="titre" aria-describedby="titre" required/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="form-group form-group-textarea ">
                                                                    <label htmlFor="description" className="form-label">Résumé du service</label>
                                                                    <textarea className="form-control" id="description" name="description" placeholder="Résumé du service *" aria-describedby="description" data-sb-validations="required" required></textarea>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-6'>
                                                            <div className="mb-3">
                                                                <label htmlFor="photo" className="form-label">Image descriptive</label>
                                                                <input type="file" className="form-control" id="photo" name="photo" aria-describedby="photo" required/>
                                                                <code id="fileErreur"></code>
                                                            </div>
                                                            
                                                        </div>

                                                        <input type="text" className="form-control" defaultValue={"service"}  name="entite" aria-describedby="entite" hidden required/>
                                                        
                                                    </div>

                                                    <div className="d-grid gap-2 col-6 mx-auto">
                                                        <button type="submit" className="btn btn-warning">Envoyer</button>
                                                    </div>
                                                    <br/>
                                                    <div id='alerter' role='alert'></div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-header text-center">AJOUTER</div>
                                        <div className="card-body">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-info" type="button"  data-bs-toggle="modal" data-bs-target="#table">TABLEAUX</button>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="d-grid gap-2 text-center">
                                                <a href="/show-end#!table"><button className="btn btn-outline-secondary" type="button"> VOIR TABLEAUX</button></a>
                                            </div>
                                        </div>

                                    <div className="modal fade" id="table" tabIndex="-1" aria-labelledby="tableLabel" style={{display: "none"}} aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title h4" id="tableLabel">Animer l'accueil avec quelques tableaux : </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form data-sb-form-api-token="API_TOKEN" className='table' onSubmit={saved} encType="multipart/form-data">
                                                        <div className='row'>
                                                            <div className='col-lg-6'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="titre" className="form-label">Titre du tableau</label>
                                                                    <input type="text" name='titre' className="form-control" placeholder="Titre du tableau *" id="titre" aria-describedby="titre" required/>
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label htmlFor="sousTitre" className="form-label">Sous-titre du tableau</label>
                                                                    <input type="text" name='sousTitre' className="form-control" id="sousTitre" aria-describedby="sousTitre" required/>
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label htmlFor="type" className="form-label">Catégorie</label>
                                                                    <select className="form-select" aria-label="Disabled select example" name='type' id='type' required>
                                                                        <option  value={""} >Choisir une catégorie</option>
                                                                        <option value={"CUBISME"}>CUBISME</option>
                                                                        <option value={"FUTURISME"}>FUTURISME</option>
                                                                        <option value={"IMPROSSIONNISME"}>IMPROSSIONNISME</option>
                                                                        <option value={"NATURALISME"}>NATURALISME</option>
                                                                        <option value={"REALISME"}>REALISME </option>
                                                                        <option value={"SYMBOLISME"}>SYMBOLISME</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className='col-lg-6'>
                                                                <div className="mb-3">
                                                                    <div className="form-group form-group-textarea ">
                                                                        <label htmlFor="resume" className="form-label">Résumé du service</label>
                                                                        <textarea className="form-control" id="resume" name="resume" placeholder="Résumé du service *" aria-describedby="resume" data-sb-validations="required" required></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="photo" className="form-label">Image descriptive</label>
                                                                    <input type="file" className="form-control" id="photo" name="photo" aria-describedby="photo" required/>
                                                                    <code id="fileErreur"></code>
                                                                </div>
                                                                <input type="text" className="form-control" defaultValue={"table"}  name="entite" aria-describedby="entite" hidden required/>
                                                            </div>
                                                        </div>

                                                        <div className="d-grid gap-2 col-6 mx-auto">
                                                            <button type="submit" className="btn btn-warning">Envoyer</button>
                                                        </div>
                                                        <br/>
                                                        <div id='alerter' role='alert'></div>
                                                    </form>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Footer />
                </>
            )

        }else{
            window.location.href =  '/profile#!';
        }
    }else{
        window.location.href =  '/login#!';
    }
    
}

export default Animation;
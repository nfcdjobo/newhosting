import { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import Footer from "../Footer/Footer";
import isCookie_user_authorization from "../controlleur/controlleur";

function ShowEnd(){
    let [state, setState] = useState([]);
    useEffect(()=> {
        if(isCookie_user_authorization){
            if(isCookie_user_authorization==="GESTIONNAIRE"){
                let tableaux = [];
                fetch(api_url+"getAll/"+window.location.href.split('#!')[1])
                .then(res=>res.json())
                .then(succes => {
                    if(Array.isArray(succes.data) && succes.data.length > 0 ){
                        if(window.location.href.split('#!')[1]==="banniere"){
                            succes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item, index) => {
                                tableaux.push(`
                                    <div class="col">
                                        <div class="card">
                                            <img src="${item.photo}" class="card-img-top" alt="" style="width: 100%; height: 150px"/>
                                            <div class="card-body">
                                                <h5 class="card-title text-center">${item.plateforme}</h5>
                                                <h6 class="card-title text-center">${item.accueil}</h6>
                                                <h3 class="card-title text-center">${item.sigle}</h3>
                                                <div class="card-body">
                                                    <div class="d-grid gap-2 text-center">
                                                        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#BANIERE${index+1}"> MODIFIER</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="BANIERE${index+1}" tabindex="-1" aria-labelledby="BANIERE${index+1}Label" style="display: none" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title h4" id="BANIERE${index+1}Label">Bannière d'accueil</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form data-sb-form-api-token="API_TOKEN" class='banniere' id="${item._id}" enctype="multipart/form-data">
                                                            <div class='row'>
                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="photo" class="form-label">Image de la bannière</label>
                                                                        <input type="file" name="photo" class="form-control" id="photo" aria-describedby="photo"/>
                                                                        <code id="fileErreur"></code>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="accueil" class="form-label">Mot d'accueil</label>
                                                                        <input type="text" name="accueil" id="accueil" value="${item.accueil}" class="form-control" placeholder='Exemple: Bienvenue !' required/>
                                                                    </div>
                                                                </div>

                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="plateforme" class="form-label">Nom de la plateforme</label>
                                                                        <input type="text" class="form-control" id="plateforme" value="${item.plateforme}" name="plateforme" defaultValue={"Soplia-Culturas"} aria-describedby="emailHelp" disabled required/>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="sigle" class="form-label">Sigle de la plateforme</label>
                                                                        <input type="text" name="sigle" class="form-control" value="${item.sigle}" defaultValue={"(S-!-C)"} id="sigle" disabled required/>
                                                                    </div>
                                                                </div>
                                                                <input type="text" class="form-control" value="banniere"  name="entite" aria-describedby="entite" hidden required/>
                                                            </div>

                                                            <div class="d-grid gap-2 col-6 mx-auto">
                                                                <button type="submit" class="btn btn-warning">Envoyer</button>
                                                            </div>
                                                            
                                                            <br/>
                                                            <div id='alerter' role='alert'></div>
                                                        </form>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                )
                            });
                        }else if(window.location.href.split('#!')[1]==="service"){
                            succes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item, index) => {
                                tableaux.push(`
                                    <div class="col">
                                        <div class="card">
                                            <img src="${item.photo}" class="card-img-top" alt="" style="width: 100%; height: 150px"/>
                                            <div class="card-body">
                                                <h5 class="card-title text-center">${item.titre}</h5>
                                                <p class="card-title text-break">${item.description}</p>
                                                <div class="card-body">
                                                    <div class="d-grid gap-2 text-center">
                                                        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#SERVICE${index+1}"> MODIFIER</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="SERVICE${index+1}" tabindex="-1" aria-labelledby="SERVICE${index+1}Label" style="display: none" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title h4" id="SERVICE${index+1}Label">Notre service est de : </h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form data-sb-form-api-token="API_TOKEN" class='service' id="${item._id}" encType="multipart/form-data">
                                                            <div class='row'>
                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="titre" class="form-label">Titre du service</label>
                                                                        <input type="text" name='titre' value="${item.titre}" placeholder="Titre du service *" class="form-control" id="titre" aria-describedby="titre" required/>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <div class="form-group form-group-textarea ">
                                                                            <label htmlFor="description" class="form-label">Résumé du service</label>
                                                                            <textarea class="form-control" id="description" name="description" placeholder="Résumé du service *" aria-describedby="description" data-sb-validations="required" required>${item.description}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="photo" class="form-label">Image descriptive</label>
                                                                        <input type="file" class="form-control" id="photo" name="photo" aria-describedby="photo"/>
                                                                        <code id="fileErreur"></code>
                                                                    </div>
                                                                </div>
                                                                <input type="text" class="form-control" value="service"  name="entite" aria-describedby="entite" hidden required/>
                                                            </div>
                                                            <div class="d-grid gap-2 col-6 mx-auto">
                                                                <button type="submit" class="btn btn-warning">Envoyer</button>
                                                            </div>
                                                            <br/>
                                                            <div id='alerter' role='alert'></div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                )
                            });

                        }else if(window.location.href.split('#!')[1]==="table"){
                            succes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item, index) => {
                                tableaux.push(`
                                    <div class="col">
                                        <div class="card">
                                            <img src="${item.photo}" class="card-img-top" alt="" style="width: 100%; height: 150px"/>
                                            <div class="card-body">
                                                <h4 class="card-title text-center">${item.titre}</h4>
                                                <h6 class="card-title text-center">${item.sousTitre}</h6>
                                                <h3 class="card-title text-center">${item.type}</h3>
                                                <p class="card-title text-break">${item.resume}</p>
                                                <div class="card-body">
                                                    <div class="d-grid gap-2 text-center">
                                                        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#TABLE${index+1}"> MODIFIER</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="TABLE${index+1}" tabindex="-1" aria-labelledby="TABLE${index+1}Label" style="display: none" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title h4" id="TABLE${index+1}Label">Animer l'accueil avec quelques tableaux : </h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form data-sb-form-api-token="API_TOKEN" class='table' id="${item._id}" enctype="multipart/form-data">
                                                            <div class='row'>
                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="titre" class="form-label">Titre du tableau</label>
                                                                        <input type="text" name='titre' value="${item.titre}" placeholder="Titre du tableau *" class="form-control" id="titre" aria-describedby="titre" required/>
                                                                    </div>

                                                                    <div class="mb-3">
                                                                        <label htmlFor="sousTitre" class="form-label">Sous-titre du tableau</label>
                                                                        <input type="text" name='sousTitre' value="${item.sousTitre}" placeholder="Sous-titre du tableau *" class="form-control" id="sousTitre" aria-describedby="sousTitre" required/>
                                                                    </div>

                                                                    <div class="mb-3">
                                                                        <label for="type" class="form-label">Catégorie</label>
                                                                        <select class="form-select" aria-label="Disabled select example" name='type' id='type' required>
                                                                            <option ${item.type==="CUBISME" ? "selected" : ""} value="CUBISME">CUBISME</option>
                                                                            <option ${item.type==="FUTURISME" ? "selected" : ""} value="FUTURISME">FUTURISME</option>
                                                                            <option ${item.type==="IMPROSSIONNISME" ? "selected" : ""} value="IMPROSSIONNISME">IMPROSSIONNISME</option>
                                                                            <option ${item.type==="NATURALISME" ? "selected" : ""} value="NATURALISME">NATURALISME</option>
                                                                            <option ${item.type==="REALISME" ? "selected" : ""} value="REALISME">REALISME </option>
                                                                            <option ${item.type==="SYMBOLISME" ? "selected" : ""} value="SYMBOLISME">SYMBOLISME</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div class='col-lg-6'>
                                                                    <div class="mb-3">
                                                                        <div class="form-group form-group-textarea ">
                                                                            <label htmlFor="resume" class="form-label">Résumé du service</label>
                                                                            <textarea class="form-control" id="resume" name="resume" placeholder="Résumé du service *" aria-describedby="resume" data-sb-validations="required" required>${item.resume}</textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="photo" class="form-label">Image descriptive</label>
                                                                        <input type="file" class="form-control" id="photo" name="photo" aria-describedby="photo"/>
                                                                        <code id="fileErreur"></code>
                                                                    </div>
                                                                    <input type="text" class="form-control" value={"table"}  name="entite" aria-describedby="entite" hidden required/>
                                                                </div>
                                                            </div>

                                                            <div class="d-grid gap-2 col-6 mx-auto">
                                                                <button type="submit" class="btn btn-warning">Envoyer</button>
                                                            </div>
                                                            <br/>
                                                            <div id='alerter' role='alert'></div>
                                                        </form>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                )
                            });
                        }
                        setState(tableaux);
                    }
                });
            }else{
                window.location.href = '/profile#!';
            }
        }else{
            window.location.href = '/login#!';
        } 
    }, []);
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
                    <div className="col-lg-12">
                        <div className="card mb-4">
                            <div className="card-header">Search</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="search" aria-describedby="button-search" />
                                    <button className="btn btn-primary" id="button-search" type="button"> Recherche </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="card mb-4">
                            <div className="card-header text-center">{window.location.href.split('#!')[1]==="banniere" ? "BANNIERE" : window.location.href.split('#!')[1]==="service" ? "SERVICES" : "TABLEUX"}</div>
                            <div className="card-body">
                                <div className="row row-cols-1 row-cols-md-3 g-4" id="row-cols-md-3">
                                    {
                                        (()=>{
                                            if(document.getElementById('row-cols-md-3')){
                                                document.getElementById('row-cols-md-3').innerHTML = [...state].join('');
                                                document.getElementById('row-cols-md-3').querySelectorAll('form').forEach(item => item.addEventListener('submit', updated));
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}



const updated = (event) =>{
    event.preventDefault();
    if(isCookie_user_authorization==="GESTIONNAIRE"){
        const classForm = event.target.className;
        let formData = new FormData();
        formData.append("id", event.target.id);
        formData.append("entite", event.target.className);

        const photo = event.target.querySelector('#photo').files[0];
        const fileErreur = event.target.querySelector('#fileErreur');
        fileErreur.textContent = "";
        
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
        }else if(classForm === "service"){
            formData.append("titre", event.target.querySelector('#titre').value);
            formData.append("description", event.target.querySelector('#description').value);
        }else if(classForm === "table"){
            formData.append("titre", event.target.querySelector('#titre').value);
            formData.append("sousTitre", event.target.querySelector('#sousTitre').value);
            formData.append("type", event.target.querySelector('#type').value);
            formData.append("resume", event.target.querySelector('#resume').value);
        }
        
        fetch(api_url+'update', {
            method: "POST",
            body: formData,
            headers: {Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            if(succes.data){
                event.target.querySelectorAll('input').forEach(item => {
                    item.value = '';
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
    }else{
        window.location.href = '/login#!';
    }
}

export default ShowEnd;
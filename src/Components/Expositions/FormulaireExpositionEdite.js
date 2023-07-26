import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";



function FormulaireExpositionEdite(params) {
    let [state, setState] = useState({});
    useEffect(()=>{
        if(cookie && window.location.href.includes('editeExposition')){
        fetch(api_url+'getExpositionById/'+window.location.href.split('#!')[1], {
            method: 'GET',
            headers: { Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            if(succes.data){
                setState(succes.data)
                const titre = document.getElementById('titre');
                const vueTitre = document.getElementById('vueTitre');

                const photo = document.getElementById('photo');
                const vueImage = document.getElementById('vueImage');

                const description = document.getElementById('description');
                const vueDescription = document.getElementById('vueDescription');
            
                titre.textContent = succes.data.titre;
                vueTitre.textContent = succes.data.titre;

                photo.src = succes.data.photo;
                vueImage.src = succes.data.photo;

                description.textContent = succes.data.description;
                vueDescription.textContent = succes.data.description;
            }
        })
}

    }, [])
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="col-lg-12 col-md-12 col-xl-12">
                            <div className="card mb-4">
                                <h6 className="card-header text-center" id="vueTitre">{state.titre}</h6>
                                <div className="card-body">
                                    <img className="card-img-top" src={state.photo} id="vueImage" style={{ height: "400px" }} />
                                    <div className="card-body">
                                        <p className="card-text" id="vueDescription">{state.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mb-4">
                                    <div className="card-header">Modifier l'Exposition</div>
                                    <div className="card-body">
                                        <div className="card-body">
                                            <form id="form-edite-user" encType="multipart/form-data" onSubmit={updateExposition}>
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="titre" name="titre"  placeholder="Titre de l'oeuvre..." defaultValue={state.titre} maxLength={50} required onInput={writeTitre}/>
                                                    <label htmlFor="titre">Titre de l'exposition</label>
                                                </div>

                                                <div className="col-lg-12 input-group mb-3">
                                                    <label htmlFor="photo" className="input-group-text">Image descriptive <code id="error-file"></code></label>
                                                    <input type="file" name="photo" className="form-control" placeholder="Image descriptive du domaine" aria-label="photo" id="photo" aria-describedby="basic-addon1" onChange={changeFile} accept=".png, .jpg, .jpeg, .webp, .avif, .gif" />
                                                </div>
                                                <code id="fileErreur"></code>
                                                
                                                <div className="form-floating">
                                                    <textarea className="form-control" placeholder="Leave a comment here" id="description" defaultValue={state.description} maxLength={1500} style={{ height: "500px" }} required onInput={writeDescription}></textarea>
                                                    <label htmlFor="description">Description de l'oeuvre</label>
                                                </div>
                                                <hr />
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <button className="btn btn-primary me-md-2" id="submitRegister" type="submit">Envoyer</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div id="alert" role="alert"></div>
                                </div>
                            </div>
                        </div>          
                    </div>
                </div>
            </div>
        </>
    )
}




function updateExposition(event){
    event.preventDefault();
    const alerter = document.getElementById('alert');
    alerter.className = ""; alerter.textContent = "";
    const formData = new FormData();
    formData.append("titre", event.target.querySelector('#titre').value);

    const photo = event.target.querySelector('#photo').files[0];
    const fileErreur = document.getElementById('fileErreur');
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

    formData.append("description", event.target.querySelector('#description').value);
    formData.append("id", window.location.href.split('#!')[1]);
    fetch(api_url+'updateExposition', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `token ${cookie.token}`}
    })
    .then(res => res.json())
    .then(succes => {
        if(succes.msg.includes('succès')){
            alerter.className = "alert alert-success text-center";
            alerter.textContent = "Oeuvre ajoutée avec succès !";
            event.target.querySelectorAll('input, textarea').forEach(item => {
                item.value = "";
            });
        }else{
            alerter.className = "alert alert-danger text-center";
            alerter.textContent = "Une érreur est survenue lors de l'enrégistrement, veuillez donc réessayer plus tard !";
        }
    })
}

function writeTitre(event) {document.getElementById('vueTitre').textContent = event.target.value;}

function changeFile(event) {
    const eventElement = event.target;
    const errorFile = document.getElementById('error-file')
    const submitRegister = document.getElementById('submitRegister');

    const vueImage = document.getElementById("vueImage");
    if(eventElement.files[0]){        
        if(eventElement.files[0].size <= 1024*1024*2){
            vueImage.onload = () => {URL.revokeObjectURL(vueImage.src)};
            vueImage.src = URL.createObjectURL(eventElement.files[0]);
            errorFile.textContent = '';
            
        }else{
            errorFile.textContent = 'Au plus 2Mo';
            submitRegister.disabled = false;
        }                                
    }
    
}

function writeDescription(event) {
    const eventElement = event.target;
    document.getElementById('vueDescription').textContent = eventElement.value;
}



export default FormulaireExpositionEdite;
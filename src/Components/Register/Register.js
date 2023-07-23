import api_url from '../../api_url/api_url';
import logo from '../../assets/img/logos/logo.png';
import isCookie_user_authorization from '../controlleur/controlleur';

function Register(params) {
    if(isCookie_user_authorization){
        window.location.href = '/profile#!';
    }else{
        let validateurTelephone = input => input.replaceAll(' ', '').split('').every(item => '0123456789'.includes(item)) && input.replaceAll(' ', '').length>=10 ? true : false;
        let validateurPassword = (input1, input2) => (!input1.includes(' ') && input1.length >= 4 && input1==input2) ? true : false;
        let validateurEmail = input => input.includes('@') && input.split('@').length == 2 &&  input.split('@')[1].split('.').length==2 && input.split('@')[1].split('.')[0]!="" && !input.split('@')[1].split('.')[0].split('').every(item=>'0123456789'.includes(item)) & !input.split('@')[1].split('.')[1].split('').every(item=>'0123456789'.includes(item)) ? true : false;

        fetch(api_url+'getAllDomaine')
        .then(res => res.json())
        .then(succes => {
            if(succes.data && succes.data.length> 0){
                const selectDomaine = document.getElementById('domaine_id');
                selectDomaine.textContent=""
                const option0 = document.createElement('option'); option0.value='';   option0.disabled = true; option0.selected = true; option0.textContent ="Choisissez votre domaine d'active ... ?"; selectDomaine.append(option0);
                const dataFilter = succes.data.filter(item => item.libelle != "GESTIONNAIRE" && item.libelle != "ADMIRATEUR");
                if(dataFilter.length > 0){
                    dataFilter.sort((a, b) => {a.libelle.localeCompare(b.libelle)}).forEach(item => { 
                        const option = document.createElement('option')
                        option.value = item._id;
                        option.textContent = item.libelle.toUpperCase();
                        selectDomaine.append(option);
                    });
                }
            }
        })
        .catch(error => {
            console.log(error)
        })
        
        let soumettre = (event)=>{
            event.preventDefault();
            let entite =event.target.querySelectorAll('input[name=entite]:checked')[0].value;
            
            let nationalite = event.target.querySelector('#nationalite');
            let domaine = event.target.querySelector('#domaine_id');
            let photo = event.target.querySelector('#photo');
            let password = event.target.querySelector('#password');
            let passwordConfirme = event.target.querySelector('#passwordConfirme');
            let adresse = event.target.querySelector('#adresse');
            let nomPrenom = event.target.querySelector('#nomPrenom')
            let telephone = event.target.querySelector('#telephone');
            let code = event.target.querySelector('#code');
            let espaceCode = event.target.querySelector('#espaceCode');
            let email = event.target.querySelector('#email');
            let errorCode = event.target.querySelector('#error-code');
            const alerter = document.getElementById('alert');
            alerter.textContent = "";
            alerter.className = "";
            
            if(validateurEmail(email.value)){
                if(validateurTelephone(telephone.value)){
                    if(validateurPassword(password.value, passwordConfirme.value)){
                        let formCode = new FormData(event.target);
                        fetch(api_url+'sendEmail', {
                            method: 'POST',
                            body: new URLSearchParams(formCode)
                        })
                        .then(res=>res.json())
                        .then(succes1=>{
                            document.getElementById("col-lg-6-1").hidden = true;
                            document.getElementById("col-lg-6-2").hidden = true
                            espaceCode.hidden = false;
                            adresse.textContent=' '+email.value;
                            event.target.querySelector('#lien').href = succes1.data.url;
                            event.target.querySelector('#login-reset').hidden = true;
                            event.target.querySelector('#submiter').hidden = true;
                            event.target.querySelector('#submitRegister').hidden = true;
                            event.target.querySelector('#checkboxe').hidden = true;
                            code.addEventListener('blur', even=>{
                                code = event.target.querySelector('#code');
                                if(code.value === succes1.code){
                                    errorCode.textContent="";
                                    let formData = new FormData();
                                    formData.append('entite', entite);
                                    formData.append('nomPrenom', nomPrenom.value);
                                    formData.append('email', email.value);
                                    formData.append('nationalite', nationalite.value);
                                    formData.append('password', password.value);
                                    formData.append('telephone', telephone.value);
                                    // entite == "PASSANT" ? formData.append('domaine_id', 'ADMIRATEUR') : ;
                                    if(photo.files[0]){formData.append('photo', photo.files[0])};
                                    if(entite==='PASSANT'){
                                        fetch(api_url+'getDomaineByLibelle/'+'ADMIRATEUR')
                                        .then(res => res.json())
                                        .then(succes => {
                                            formData.append('domaine_id', succes.data._id)
                                            fetch(api_url+'createUser', { method: 'POST', body: formData })
                                            .then(res=>res.json())
                                            .then(()=>{
                                                alerter.className = "alert alert-success text-center";
                                                alerter.textContent = "Ajout effectué avec succès !";
                                                event.target.querySelectorAll('input').forEach(item => item.value = "");
                                                const interval = setInterval(() => {
                                                    window.location.href = "/login";
                                                    clearInterval(interval);
                                                }, 1200);
                                            })
                                            .catch(()=>{
                                                alerter.className = "alert alert-danger text-center";
                                                alerter.textContent = "Code de validation invalide, veuillez donc réessayer !";
                                            })
                                        })
                                    }else{
                                        formData.append('domaine_id', domaine.value)
                                        fetch(api_url+'createUser', { method: 'POST', body: formData })
                                        .then(res=>res.json())
                                        .then(()=>{
                                            alerter.className = "alert alert-success text-center";
                                            alerter.textContent = "Ajout effectué avec succès !";
                                            event.target.querySelectorAll('input').forEach(item => item.value = "");
                                            const interval = setInterval(() => {
                                                window.location.href = "/login";
                                                clearInterval(interval);
                                            }, 1200);
                                        })
                                        .catch(()=>{
                                            alerter.className = "alert alert-danger text-center";
                                            alerter.textContent = "Code de validation invalide, veuillez donc réessayer !";
                                        })
                                    }
                                }else{
                                    errorCode.textContent = "Code invalide !"
                                }
                            });
                        })
                        .catch(error=>{
                            console.log('error', error)
                        })
                    }else{
                        event.target.querySelector('#passwordConfirme').focus()
                    }
                }else{
                    event.target.querySelector('#telephone').focus()
                }
            }else{
                event.target.querySelector('#email').focus()
            }
        }

        const defaut = ["AUTEUR", "PASSANT"];
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <a href="/"><img src={logo} className="" alt="logo" title="Logo Sophia-Culturas" style={{ width: 250+'px' }}></img></a>
                        <h2 className="section-heading">Inscription</h2>
                        <h3 className="section-subheading">Inscrivez-vous chez <a href="#">Sophia-Culturas</a></h3>
                    </div>
                    
                    <form id="formulaireRegister" data-sb-form-api-token="API_TOKEN" onSubmit={soumettre} encType="multipart/form-data">
                        <div className="row" id="checkboxe">
                            <div className="col-lg-12">
                                <div className="card mb-4">
                                    <div className="card-header text-center">M'inscrire chez Sophia-Culturas en tant que :  </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <div className="form-check form-check-inline">
                                                <div className=" form-switch">
                                                    <input className="form-check-input" name="entite" value={"AUTEUR"}  type="radio" id="auteur" onChange={cochet}  required/>
                                                    <label className="form-check-label" htmlFor="auteur">Auteur d'Oeuvre artistique</label>
                                                </div>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <div className=" form-switch">
                                                    <input className="form-check-input" name="entite" value={"PASSANT"} type="radio" id="passant" onChange={cochet} required/>
                                                    <label className="form-check-label" htmlFor="passant">Simple utlisateur</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-lg-6" id="col-lg-6-1">
                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="nomPrenom" className="input-group-text">Nom et prénom</label>
                                    <input type="text" name="nomPrenom" className="form-control" placeholder="Nom et prénom" aria-label="nomPrenom" id="nomPrenom" aria-describedby="basic-addon1"  required/>
                                </div>

                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="nationalite" className="input-group-text">Nationalité</label>
                                    <input type="text" name="nationalite" className="form-control" placeholder="Nationalité" aria-label="nationalite" id="nationalite" aria-describedby="basic-addon1" required/>
                                </div>

                                <div className="col-lg-12 input-group mb-3" id="divSelect" hidden={true}>
                                    <label htmlFor="domaine_id" className="input-group-text">Corps du métier</label>
                                    <select name="domaine_id" defaultValue={''} className="form-control" aria-label="domaine_id" id="domaine_id" aria-describedby="basic-addon1">
                                    </select>
                                </div>

                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="photo" className="input-group-text">Phot de profile <code style={{ color:'red' }} id="error-file"></code></label>
                                    <input type="file" name="photo" className="form-control" placeholder="Phot de profile" aria-label="photo" id="photo" aria-describedby="basic-addon1" accept=".png, .jpg, .jpeg, .webp, .avif, .gif" onChange={verifySize} required/>
                                </div>
                            </div>

                            <div className="col-lg-6" id="col-lg-6-2">
                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="email" className="input-group-text">Adresse Email</label>
                                    <input type="email" name="email" className="form-control" placeholder="Adresse Email" aria-label="email" id="email" aria-describedby="basic-addon1" required/>
                                </div>

                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="telephone" className="input-group-text">Adresse téléphonique</label>
                                    <input type="text" name="telephone" className="form-control" placeholder="Adresse téléphonique" aria-label="telephone" id="telephone" aria-describedby="basic-addon1" required/>
                                </div>

                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="password" className="input-group-text">Mot de passe</label>
                                    <input type="password" name="password" className="form-control" placeholder="Mot de passe" aria-label="password" id="password" aria-describedby="basic-addon1" required/>
                                </div>

                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="passwordConfirme" className="input-group-text">Répéter mot de passe</label>
                                    <input type="password" name="passwordConfirme" className="form-control" placeholder="Mot de passe" aria-label="passwordConfirme" id="passwordConfirme" aria-describedby="basic-addon1" required/>
                                </div>
                                
                            </div>
                            <div className="row" id="espaceCode" hidden={true}>
                                <div className="col-lg-12 mb-3">
                                        <label htmlFor="code" className="form-label" style={{ color: "white" }} >Veuillez confirmer le code de validation par l'adresse <a href="#" id="adresse"></a><p><a id="lien" target="_blank">Cliquez sur ce lien pour copier</a></p></label>
                                        <input type="text" name="code" className="form-control" style={{ width: "90px" }} placeholder="Code" aria-label="code" id="code" aria-describedby="basic-addon1"/>
                                        <span id="error-code" style={{ color: 'red' }}></span>
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto" id="submiter">
                                <div className="text-center" id="div-connexion"><button className="btn btn-outline-warning" id="submitRegister" type="submit">Connexion</button></div>
                            </div>
                                
                        </div>
                        <br/>
                        <div role="alert" className='alert alert-success' id="alert">hgd</div>

                        <div className="row" id="login-reset">
                            <div className="form-group col-lg-6">
                                <div className="text-start"style={{ color: "white" }}> Je déjà un compte ? <a href="/login"> Me connecter ici</a></div>
                            </div>
                            <div className="form-group col-lg-6">
                                <div className="text-end"style={{ color: "white" }}> <a href="/reset"> Mot de passe oublié ?</a></div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

function cochet(event) {
    const inptCheck = event.target;
    const domaine_id = document.getElementById('domaine_id');
    const selectDomaine = document.getElementById('divSelect');
    if(inptCheck.value === "PASSANT"){
        selectDomaine.hidden = true;
        domaine_id.required = false;
        domaine_id.value = "";
    }else{
        selectDomaine.hidden = false;
        domaine_id.required = true;
    }
}

function verifySize(event){
    const eventElement = event.target;
    const errorFile = document.getElementById('error-file')
    const submitRegister = document.getElementById('submitRegister');
    if(eventElement.files[0] && eventElement.files[0].size > 1024*1024*2){
        eventElement.focus();
        errorFile.textContent =" ( Au plus 2Mo ) "
        submitRegister.disabled = true;
    }else{
        submitRegister.disabled = false;
        errorFile.textContent = "";
    }
}



export default Register;
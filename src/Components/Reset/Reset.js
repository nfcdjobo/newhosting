import Validateur form '../../Validators/Validateur';
import url_api from '../../url_api/url_api';
import logo from '../../assets/img/logos/logo.png';

function Reset(params) {
    const resetedPassword = event => {
        event.preventDefault();
        const espaceCode = event.target.querySelector('#espaceCode');
        const code = event.target.querySelector('#code');
        const alerter = document.getElementById('alerter');
        alerter.textContent = '';
        alerter.className = '';
        Validateur.validateurEmail(event.target.querySelector('#email').value)
        .then(options1 => {
            if(options1){
                Validateur.validateurPassword(event.target.querySelector('#password').value)
                .then(options2 => {
                    if(options2){
                        if(event.target.querySelector('#password').value === event.target.querySelector('#passwordConfirm').value){
                            fetch(api_url+'sendEmail', {
                                method: 'POST',
                                body: new URLSearchParams(new FormData(event.target))
                            })
                            .then(res => res.json())
                            .then(emailSend => {
                                espaceCode.hidden = false;
                                
                                adresse.textContent=' '+email.value;
                                event.target.querySelector('#lien').href = emailSend.data.url;
                                event.target.querySelector('#login-reset').hidden = true;
                                event.target.querySelector('#submiter').hidden = true;
                                event.target.querySelector('#register-login.').hidden = true;
                                code.addEventListener('blur', even => {
                                    fetch(url_api+'reset', {
                                        method: 'POST',
                                        body: new URLSearchParams(new FormData(event.target))
                                    })
                                    .then(res => res.json())
                                    .then(resed => {
                                        if(resed.msg){
                                            alerter.textContent = resed.msg;
                                            alerter.className = 'alert alert-success text-center';
                                            setTimeout(() => {
                                                window.location.href = '/login#!';
                                            }, 1000);
                                        }else{
                                            alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
                                            alerter.className = 'alert alert-danger text-center';
                                        }
                                    })
                                    .catch(()=>{
                                        alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
                                        alerter.className = 'alert alert-danger text-center';
                                    })
                                })
                                .catch(()=>{
                                    alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
                                    alerter.className = 'alert alert-danger text-center';
                                })
                            })
                            .catch(()=>{
                                alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
                                alerter.className = 'alert alert-danger text-center';
                            })
                        }else{
                            alerter.className = 'alert alert-danger text-center';
                            alerter.textContent = 'Le mot de passe doit être au moins 4 caractère, ne doit pas contenir d\'espace.';
                            event.target.querySelector('#passwordConfirm').focus();
                        }
                    }else{
                        alerter.className = 'alert alert-danger text-center';
                        alerter.textContent = 'Le mot de passe doit être au moins 4 caractère, ne doit pas contenir d\'espace.';
                        event.target.querySelector('#password').focus();
                    }
                })
                .catch(()=>{
                    alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
                    alerter.className = 'alert alert-danger text-center';
                })
            }else{
                alerter.className = 'alert alert-danger text-center';
                alerter.textContent = 'Adresse email incorrect.';
                event.target.querySelector('#email').focus();
            }
        })
        .catch(()=>{
            alerter.textContent = 'Service momentanenent indisponible, veuillez donc réessayer plus tard !.';
            alerter.className = 'alert alert-danger text-center';
        })
    }
    return (
        <div className="App">
            <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <a href="/"><img src={logo} className="" alt="logo" title="Logo Sophia-Culturas"></img></a>
                    <h2 className="section-heading">Réenitialisation</h2>
                    <h3 className="section-subheading text-muted">Réenitialisez votre mot de passe oublié avec <a href="#">Sophia-Culturas</a></h3>
                 </div>
                
                <form id="formulaire" data-sb-form-api-token="API_TOKEN" onSubmit={resetedPassword}>
                     <div className="row ">
                        <div className="col-lg-6">
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="email" className="input-group-text" id="basic-addon1">Adresse email</label>
                                <input type="text" name="email" className="form-control" placeholder="Adresse email" aria-label="email" id="email" aria-describedby="basic-addon1" required/>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="password" className="input-group-text" id="basic-addon1">Nouveau mot de passe</label>
                                <input type="password" name="password" className="form-control" placeholder="Nouveau mot de passe" aria-label="password" id="password" aria-describedby="basic-addon1" required/>
                            </div>
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="passwordConfirm" className="input-group-text" id="basic-addon1">Répéter mot de passe</label>
                                <input type="password" name="passwordConfirm" className="form-control" placeholder="Répéter mot de passe" aria-label="passwordConfirm" id="passwordConfirm" aria-describedby="basic-addon1" required/>
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
                            <div className="text-center" id="div-connexion"><button className="btn btn-outline-warning" id="submitRegister" type="submit">Valider</button></div>
                        </div>
                        
                    </div>

                     <div className="row" id='register-login'>
                        <div className="form-group col-lg-6">
                            <div className="text-start"style={{ color: "white" }}> Je n'ai pas de compte,  <a href="/register"> m'inscrire ici ?</a></div>
                        </div>
                        <div className="form-group col-lg-6">
                            <div className="text-end"style={{ color: "white" }}> Je ne souviens du mot de passe, <a href="/login"> me connecter ici ?</a></div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </div>
    )
}
export default Reset;

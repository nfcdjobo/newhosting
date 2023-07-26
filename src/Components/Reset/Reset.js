import Validateur from '../../Validators/Validateur';
import api_url from "../../api_url/api_url";
import logo from '../../assets/img/logos/logo.png';
import Footer from '../Footer/Footer';


function Reset(params) {
    const resetedPassword = event => {
        event.preventDefault();
        const espaceCode = event.target.querySelector('#espaceCode');
        const code = event.target.querySelector('#code');
        const alerter = document.getElementById('alerter');
        const adresse = document.getElementById('adresse');
        const email = document.getElementById('email');
        alerter.textContent = '';
        alerter.className = '';
        Validateur.validateurEmail(event.target.querySelector('#email').value)
        .then(options1 => {
            if(options1){
                Validateur.validateurPassword(event.target.querySelector('#password').value)
                .then(options2 => {
                    if(options2){
                        if(event.target.querySelector('#password').value === event.target.querySelector('#passwordConfirm').value){
                            fetch(api_url+'testEmail', {
                                method: 'POST',
                                body: new URLSearchParams(new FormData(event.target))
                            })
                            .then(res => res.json())
                            .then(emailSend => {
                                if(!emailSend.data){
                                    alerter.textContent =  "Compte introvable !";
                                    alerter.className = 'alert alert-danger text-center';
                                    return;
                                }
                                
                                espaceCode.hidden = false;
                                adresse.textContent=' '+email.value;
                                event.target.querySelector('#lien').href = emailSend.data.url;
                                event.target.querySelectorAll('.col-lg-6, #col-lg-12, #submiter').forEach(item=>item.hidden = true);
                                
                                code.addEventListener('blur', even => {
                                    fetch(api_url+'reset', {
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
                                            alerter.textContent = resed.msg;
                                            alerter.className = 'alert alert-danger text-center';
                                        }
                                    })
                                    .catch((error)=>{
                                        alerter.textContent = error.message;
                                        alerter.className = 'alert alert-danger text-center';
                                    })
                                })
                            })
                            .catch((error)=>{
                                alert(23)
                                alerter.textContent =  error.message;
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
                .catch((error)=>{
                    alerter.textContent =  error.message;
                    alerter.className = 'alert alert-danger text-center';
                })
            }else{
                alerter.className = 'alert alert-danger text-center';
                alerter.textContent = 'Adresse email incorrect.';
                event.target.querySelector('#email').focus();
            }
        })
        .catch((error)=>{
            alerter.textContent =  error.message;
            alerter.className = 'alert alert-danger text-center';
        })
    }
    return (
        <>
            <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <a href="/"><img src={logo} className="" alt="logo" title="Logo Sophia-Culturas" style={{ width: 250+'px' }}></img></a>
                    <br></br>
                    <h2 className="section-heading">Réenitialisation</h2>
                    <h3 className="section-subheading text-muted">Réenitialisez votre mot de passe oublié avec <a href="#">Sophia-Culturas</a></h3>
                 </div>
                
                <form id="formulaire" data-sb-form-api-token="API_TOKEN" onSubmit={resetedPassword}>
                     <div className="row " id="row-form">
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
                        <hr></hr>
                        <div className="d-grid gap-2 col-6 mx-auto" id="submiter">
                            <div className="text-center" id="div-connexion"><button className="btn btn-outline-warning" id="submitRegister" type="submit">Valider</button></div>
                        </div>
                    </div>
                    <br></br>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <div className="form-group me-md-5 justify-content-md-start" id="col-lg-12">
                            <div className="text-start"style={{ color: "white" }}> <a href="/register"> M'inscrire ici ?</a></div>
                        </div>

                        <div className="form-group justify-content-md-end">
                            <div className="text-end"style={{ color: "white" }}> <a href="/login"> Me connecter ici ?</a></div>
                        </div>
                    </div>

                     
                    <br></br>
                    <div className='' id='alerter' role='alert'></div>
                </form>
            </div>
        </section>
        <Footer />
        </>
    )
}
export default Reset;
